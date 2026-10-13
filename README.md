# KA-Photographer — Modern Photographer Website

## 📋 Overview

KA-Photographer is a modern, responsive portfolio website built with React and TypeScript, based on a custom Figma design created by the photographer. The website provides an elegant showcase of the photographer's work, with smooth animations, interactive galleries, and a comprehensive admin panel for content management. It connects to a backend API for photo management and booking functionality.

> 💼 **Project Type:** Commercial project developed for a photographer.

## 🌐 Live Demo & Backend

[Live Demo](https://andriyst92.github.io/ka-photographer/)

[UI Design — Figma](https://www.figma.com/design/TMcVVIEcJV6JDCPEdX5hb0/1?node-id=0-1&t=O3Gm6PYaFUCDdSaF-1)

[Backend Repository](https://github.com/AndriySt92/ka-photographer_server)

## ✨ Key Features

### 🖼️ **Visual Experience**

- **Responsive & Modern UI** – Tailwind CSS with a fully responsive layout for all devices.
- **Custom Design System** – Built from Figma, designed by the photographer.
- **Rich Animations** – Extensive Framer Motion usage:
  - Scroll‑triggered reveals, staggered text, parallax backgrounds.
  - Interactive hover effects, custom cursor follower, animated form fields.
  - Smooth modal transitions, sliding navigation line, page transitions.
  - Animated bouncing‑dot loading states.
- **Lightbox Gallery** – Fancybox integration with lazy‑loaded, responsive images.

---

### 👨‍💼 **Admin Functionality**

- **Secure Admin Panel** with JWT-based authentication
- **Photo Upload System** with Cloudinary integration
- **Batch Upload** support (up to 10 photos at once)
- **Category Management** for organizing photos
- **Photo Deletion** with confirmation dialogs
- **Protected Routes** for admin-only access

### 📅 **Booking System**

- **Interactive Contact Form** with React Hook Form validation
- **Service Selection** with detailed service pages
- **Form Validation** for better user experience
- **Success/Failure Feedback** with toast notifications

### 🛠️ **Developer Experience**

- **TypeScript** for type safety and better development
- **Component Library** with reusable UI components
- **Custom Hooks** for common functionality
- **Code Quality** with ESLint, Prettier, and Husky
- **Performance Optimized** with lazy loading and code splitting

## 🏗️ Tech Stack

### Core Technologies

* **Framework**: React 19
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Build Tool**: Vite
* **Routing**: React Router DOM v7

### Key Libraries

* **Data Fetching & Server State**: TanStack Query
* **Animations**: Framer Motion
* **Forms & Validation**: React Hook Form
* **HTTP Client**: Axios
* **Notifications**: React Toastify
* **UI Components**: Custom design system, Class Variance Authority
* **Styling Utilities**: clsx, tailwind-merge
* **File Upload**: React Dropzone
* **Image Gallery & Lightbox**: Swiper, Fancybox

### Testing

* **Test Framework**: Jest
* **React Testing**: Testing Library
* **Fetch API Mocking**: whatwg-fetch

### Development Tools

* **Linting**: ESLint
* **Formatting**: Prettier
* **Type Checking**: TypeScript
* **ESLint Plugins**: React, React Hooks, Jest, Testing Library, Tailwind CSS, Import Sorting
* **Git Hooks**: Husky
* **Pre-commit Checks**: lint-staged
* **Bundle Analysis**: Rollup Plugin Visualizer

## 📁 Project Structure

```
src/
├── api/                           # API communication layer
│   ├── axiosClient.ts              # Axios instance configuration
│   ├── clients.ts                  # HTTP client functions (GET, POST, etc.)
│   └── endpoints.ts                # API endpoint definitions & TanStack Query keys
│
├── assets/                        # Static assets
│
├── components/                    # Reusable components
│   ├── Layout/                     # Layout components (Header, Footer, etc.)
│   ├── Sections/                   # Page sections (ContactsSection, ShowcaseLayout)
│   ├── ui/                         # Basic UI components (Button, FormField, etc.)
│   └── index.ts                    # barrel export
│
├── config/                        # Configuration files
│
├── hooks/                         # Custom React hooks
│   ├── useCloudinaryUpload         # Cloudinary file upload
│   ├── usePhotos                   # Photo data fetching
│   ├── useCreateBooking            # Booking form submission
│   ├── useCurrentUser              # Admin authentication state
│   ├── useInfiniteScroll           # Infinite scroll functionality
│   ├── ... (20+ more hooks)
│   └── index.ts                  # barrel export
│
├── lib/                           # Utility libraries
│   ├── animations.ts               # Animation configurations
│   ├── cn.ts                       # Class name utilities (clsx + tailwind-merge)
│   └── index.ts                    # barrel export
│
├── pages/                         # Route-level page components
│   ├── Home/                       # Homepage
│   ├── Gallery/                    # Photo gallery page
│   ├── Services/                   # Services listing page
│   ├── ServiceDetails/             # Individual service details pages
│   ├── Contacts/                   # Contact & booking page
│   ├── Terms/                      # Terms and conditions page
│   ├── AdminLogin/                 # Admin authentication page
│   ├── AdminPanel/                 # Admin photo management page
│   ├── NotFound/                   # 404 not found page
│   └── index.ts                    # barrel export
│
├── router/                        # Routing configuration
│   ├── AppRoutes                   # Main router setup (uses routesConfig)
│   ├── PrivateRoutes               # Protected route wrapper
│   ├── routesConfig.ts             # Route definitions with lazy loading
│   └── index.ts                    # barrel export
│
├── types/                         # TypeScript type definitions
│
├── utils/                         # Utility functions
│   ├── getErrorMessage.ts          # Error handling utilities
│   ├── getCloudinaryErrorMessage.ts # Cloudinary error handling
│   ├── getCloudinaryUrl.ts         # Cloudinary image URL and responsive srcSet generation
│   └── index.ts                    # barrel export
│
├── tests/                         # Testing utilities
│   ├── mocks/                      # Mock data and API handlers
│   ├── test-utils/                 # Custom render, wrappers, etc.
│   └── index.ts                    # barrel export
│
├── App.tsx                        # Root application component
└── main.tsx                       # Application entry point
```

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy-loaded pages for faster initial load
- **Image Optimization**: Lazy loading and proper sizing
- **Bundle Analysis**: Optimized dependencies
- **Tree Shaking**: Unused code elimination
- **Caching**: React Query for API response caching
- **Memoization**: React.memo and useMemo for expensive computations

### 📊 PageSpeed Insights Results

| Metric                             |           Desktop |                    Mobile |
| ---------------------------------- | ----------------: | ------------------------: |
| **Performance**                    |            **99** |                    **82** |
| **Accessibility**                  |           **100** |                   **100** |
| **Best Practices**                 |           **100** |                   **100** |
| **SEO**                            |           **100** |                   **100** |
| **First Contentful Paint (FCP)**   | 0.5 s — Excellent | 2.6 s — Needs Improvement |
| **Largest Contentful Paint (LCP)** |      0.8 s — Good | 4.1 s — Needs Improvement |
| **Total Blocking Time (TBT)**      | 20 ms — Excellent |              60 ms — Good |
| **Cumulative Layout Shift (CLS)**  |     0 — Excellent |             0 — Excellent |
| **Speed Index (SI)**               |      1.0 s — Good | 3.0 s — Needs Improvement |


## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/AndriySt92/ka-photographer.git
cd ka-photographer

# 2. Set up environment variables
cp .env.example .env
# ⚠️ For local development, change VITE_BASE to "/" in the .env file
# (e.g., VITE_BASE=/)

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open in browser
# Navigate to http://localhost:5173
```