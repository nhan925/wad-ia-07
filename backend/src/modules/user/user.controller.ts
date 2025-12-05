import { Controller, Get, Patch, UseGuards, Req, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() request: any) {
    return this.userService.getProfile(request.user.userId);
  }

  @Patch('name')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user name' })
  @ApiBody({ schema: { properties: { name: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Name updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateName(@Req() request: any, @Body('name') name: string) {
    return this.userService.updateName(request.user.userId, name);
  }
}
