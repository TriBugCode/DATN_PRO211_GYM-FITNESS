# Gymshark Fitness - Premium Gym Website

A modern, visually stunning gym fitness web application built with Vue 3, inspired by the premium design aesthetics of Gymshark and Nike Training Club.

## 🚀 Features

### Public Pages
- **Home Page**: Hero section with stunning visuals, program previews, trainer spotlights, and testimonials
- **Programs Page**: Comprehensive fitness programs (Strength, Cardio, Weight Loss, Personal Training, etc.)
- **Trainers Page**: Meet our elite coaching team with ratings and specializations
- **Membership Page**: Three-tier pricing plans (Basic, Pro, Elite) with detailed features
- **Authentication**: Modern login/register forms with validation

### Dashboard (Protected)
- **Dashboard Home**: Welcome message, membership status, workout progress, and activity overview
- **Profile Settings**: Update personal information and change password
- **Membership Management**: View current plan, upgrade options, and billing information

### Design Features
- **Gymshark-Inspired Design**: Dark modern theme with neon red accents
- **Responsive Layout**: Fully responsive across desktop, tablet, and mobile
- **Smooth Animations**: AOS scroll animations and hover effects
- **Premium Typography**: Custom fonts (Bebas Neue, Oswald, Montserrat, Inter)
- **Interactive Elements**: Hover effects, glow animations, and smooth transitions

## 🛠️ Technology Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: Vue Router
- **State Management**: Pinia
- **Animations**: AOS (Animate On Scroll)
- **Icons**: Font Awesome

## 🎨 Color Palette

- **Primary Background**: `#0f0f0f` (Deep Black)
- **Secondary Background**: `#1a1a1a`
- **Primary Accent**: `#ff3c3c` (Neon Red)
- **Secondary Accent**: `#ff6a00` (Orange)
- **Text**: `#ffffff`, `#cccccc`
- **Highlight**: `#39ff14` (Neon Green)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.vue
│   ├── Footer.vue
│   ├── DashboardSidebar.vue
├── layouts/
│   ├── MainLayout.vue
│   ├── DashboardLayout.vue
├── pages/
│   ├── Home.vue
│   ├── Programs.vue
│   ├── Trainers.vue
│   ├── Membership.vue
│   ├── Login.vue
│   ├── Register.vue
│   ├── Dashboard.vue
│   ├── Profile.vue
├── stores/
│   ├── authStore.js
│   ├── membershipStore.js
├── router.js
├── main.js
└── App.vue
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gymshark-fitness
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Demo Credentials

For testing the authentication system:
- **Email**: `demo@gymshark.com`
- **Password**: `demo123`

## 🎯 Usage Guide

### Navigation
- **Public Pages**: Browse programs, trainers, and membership options
- **Authentication**: Register a new account or login with demo credentials
- **Dashboard**: Access personalized fitness dashboard and settings

### Membership Plans
- **Basic**: $29/month - Essential gym access
- **Pro**: $59/month - Personal training + all Basic features (Recommended)
- **Elite**: $99/month - Premium experience with all features

### Features Overview
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Scroll-triggered animations throughout
- **Modern UI**: Clean, premium interface with hover effects
- **State Management**: Persistent authentication and membership data
- **Form Validation**: Client-side validation for all forms

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Customization

#### Colors
Update colors in `tailwind.config.js`:
```javascript
colors: {
  'gym-red': '#ff3c3c',
  'gym-dark': '#0f0f0f',
  // ... other colors
}
```

#### Fonts
Google Fonts are loaded in `index.html`. Add or modify fonts there.

#### Animations
AOS is initialized in `main.js`. Configure options:
```javascript
AOS.init({
  duration: 800,
  once: true,
  // ... other options
})
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Authentication System

- **Simple Auth**: Email/password based authentication
- **Session Persistence**: Uses localStorage for demo purposes
- **Protected Routes**: Dashboard requires authentication
- **Auto Redirect**: Redirects to dashboard after login

## 💳 Membership System

- **Three Tiers**: Basic, Pro, Elite plans
- **Feature Comparison**: Detailed feature lists for each plan
- **Plan Selection**: Integrated with authentication
- **Status Tracking**: Active membership display in dashboard

## 🎨 Design Philosophy

Inspired by premium fitness brands, the design focuses on:
- **Motivational Aesthetics**: Powerful, athletic branding
- **Clean Typography**: Bold, impactful headlines
- **Modern Interactions**: Smooth animations and hover effects
- **Premium Feel**: High contrast, professional appearance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- Design inspiration from Gymshark and Nike Training Club
- Vue.js ecosystem for excellent developer experience
- TailwindCSS for utility-first styling
- AOS for smooth scroll animations

---

**Ready to start your fitness journey?** Visit the live application and experience premium gym management like never before! 🏋️‍♂️💪
