import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, RefreshToken } from '../../common/entities';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { id: string; name: string; email: string; createdAt: Date };
  }> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  generateAccessToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '15m', // Short-lived access token
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const token = randomBytes(64).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const refreshToken = this.refreshTokenRepository.create({
      token,
      userId: user.id,
      expiresAt,
    });

    await this.refreshTokenRepository.save(refreshToken);

    return token;
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    user: { id: string; name: string; email: string; createdAt: Date };
  }> {
    // Check if refresh token is provided
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    // Find refresh token in database
    const storedToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if token is revoked
    if (storedToken.revoked) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    // Check if token is expired
    if (new Date() > storedToken.expiresAt) {
      // Delete expired token
      await this.refreshTokenRepository.remove(storedToken);
      throw new UnauthorizedException('Refresh token expired');
    }

    // Generate new access token
    const accessToken = this.generateAccessToken(storedToken.user);

    return {
      accessToken,
      user: {
        id: storedToken.user.id,
        name: storedToken.user.name,
        email: storedToken.user.email,
        createdAt: storedToken.user.createdAt,
      },
    };
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      return; // No token to invalidate
    }

    // Revoke the refresh token instead of deleting it (for audit trail)
    await this.refreshTokenRepository.update(
      { token: refreshToken },
      { revoked: true },
    );
  }

  async cleanupExpiredTokens(): Promise<void> {
    // Clean up expired tokens periodically
    await this.refreshTokenRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    // Revoke all refresh tokens for a specific user
    await this.refreshTokenRepository.update(
      { userId, revoked: false },
      { revoked: true },
    );
  }

  async revokeToken(token: string): Promise<void> {
    // Revoke a specific refresh token
    await this.refreshTokenRepository.update({ token }, { revoked: true });
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async register(registerDto: RegisterDto): Promise<{
    message: string;
    user: { id: string; name: string; email: string; createdAt: Date };
  }> {
    const { name, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      // Save user to database
      const savedUser = await this.userRepository.save(user);

      // Return response without password
      return {
        message: 'User registered successfully',
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          createdAt: savedUser.createdAt,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }
}
