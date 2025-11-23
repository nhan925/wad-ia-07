# User Registration System - Frontend

A modern, responsive user registration interface built with Next.js 16, React 19, and shadcn/ui.

## ✨ Features

- ✅ **Modern UI**: Beautiful components with shadcn/ui
- ✅ **Styled with Tailwind CSS v4**: Latest styling features
- ✅ **Form Management**: React Hook Form with Zod validation
- ✅ **API State**: React Query for efficient data fetching
- ✅ **Real-time Validation**: Client-side and server-side
- ✅ **Responsive Design**: Works on all devices
- ✅ **Dark Mode**: Automatic theme detection
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Component Architecture**: Modular and reusable components
- ✅ **Toast Notifications**: User feedback for actions

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Production Build
```bash
npm run build
npm start
```

## Pages & Routes

### Home (`/`)
- Welcome page with navigation to Sign Up and Login

### Sign Up (`/signup`)
- User registration form
- Fields: Email, Password, Confirm Password
- Real-time validation
- API integration with backend
- Success/error feedback
- Auto-redirect to login on success

### Login (`/login`)
- Login form (UI only - mock implementation)
- Fields: Email, Password
- Form validation
- Mock authentication feedback

## 📁 Project Structure

```
frontend/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Global styles
│   ├── signup/
│   │   └── page.tsx            # Sign up page
│   └── login/
│       └── page.tsx            # Login page
│
├── components/                 # React components
│   ├── home/                   # Home page components
│   │   ├── hero-section.tsx    # Hero title and description
│   │   ├── action-buttons.tsx  # Sign up/Login buttons
│   │   ├── features-grid.tsx   # Features list
│   │   ├── tech-stack.tsx      # Technology badges
│   │   ├── footer-info.tsx     # Course information
│   │   └── index.ts            # Barrel exports
│   │
│   ├── auth/                   # Authentication components
│   │   ├── auth-layout.tsx     # Auth pages layout
│   │   ├── email-field.tsx     # Email input field
│   │   ├── password-field.tsx  # Password input with toggle
│   │   ├── confirm-password-field.tsx
│   │   ├── password-strength-indicator.tsx
│   │   ├── password-tooltip.tsx
│   │   ├── form-footer.tsx     # Links and submit button
│   │   └── index.ts            # Barrel exports
│   │
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── tooltip.tsx
│   │
│   └── providers.tsx           # React Query provider
│
├── lib/                        # Utilities and API
│   ├── api.ts                  # API client with fetch
│   └── utils.ts                # Utility functions
│
├── public/                     # Static assets
├── Dockerfile                  # Docker image definition
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── components.json             # shadcn/ui configuration
└── package.json                # Dependencies
```

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router and Server Components
- **React 19** - Latest React with improved features
- **TypeScript** - Type safety throughout
- **Tailwind CSS v4** - Modern utility-first CSS
- **shadcn/ui** - High-quality, accessible UI components
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation
- **React Query** - Powerful data synchronization
- **Sonner** - Beautiful toast notifications
- **Lucide React** - Icon library

## 🎨 Component Architecture

### Home Page Components (`components/home/`)

Each section of the home page is extracted into its own component for better maintainability:

- **HeroSection**: Hero title and description
- **ActionButtons**: Sign up and login navigation buttons
- **FeaturesGrid**: Features showcase with icons
- **TechStack**: Technology badges display
- **FooterInfo**: Course information footer

### Auth Components (`components/auth/`)

Reusable authentication form components:

- **AuthLayout**: Consistent layout for auth pages
- **EmailField**: Email input with validation
- **PasswordField**: Password input with show/hide toggle
- **ConfirmPasswordField**: Password confirmation with matching validation
- **PasswordStrengthIndicator**: Visual password strength meter
- **PasswordTooltip**: Password requirements tooltip
- **FormFooter**: Form actions and navigation links

## ✅ Form Validation Rules

### Email
- **Required**: Cannot be empty
- **Format**: Must be valid email format (name@domain.com)
- **Uniqueness**: Validated by backend (must not exist)

### Password
- **Required**: Cannot be empty
- **Minimum Length**: 8 characters
- **Uppercase**: At least 1 uppercase letter (A-Z)
- **Lowercase**: At least 1 lowercase letter (a-z)
- **Number**: At least 1 number (0-9)
- **Special Character**: At least 1 special character (@$!%*?&)

### Confirm Password (Sign Up only)
- **Required**: Cannot be empty
- **Match**: Must exactly match the password field

## API Integration

The frontend communicates with the backend using Next.js's native `fetch` API:

```typescript
// Registration
POST /user/register
Body: { email: string, password: string }
```

React Query handles:
- Loading states
- Error handling
- Automatic retries
- Cache management
- Optimistic updates

## 🐳 Docker Support

This frontend can be run with Docker:

```bash
# Build the image
docker build -t frontend .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3001 \
  frontend
```

Or use the docker-compose setup from the project root:

```bash
# From project root
docker-compose up -d
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy:

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
4. Deploy

### Other Platforms

- **Netlify**: Supports Next.js with automatic configuration
- **Railway**: Deploy with Dockerfile
- **Render**: Static site or Docker deployment
- **Cloudflare Pages**: Fast edge deployment

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial
- [Next.js GitHub](https://github.com/vercel/next.js)

### Component Libraries
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [TanStack Query](https://tanstack.com/query)

## 🤝 Contributing

This is an academic project (IA06 assignment). For improvements or suggestions, please contact the project maintainer.

## 📄 License

This project is for educational purposes as part of HCMUS Web Application Development coursework.
