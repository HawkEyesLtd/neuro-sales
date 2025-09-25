# M-Lens Portal

<!--## 📚 Documentation

For detailed information about the project, please refer to our comprehensive documentation:

- **[📚 Documentation Index](./docs/README.md)** - Complete documentation overview and navigation
- **[🔒 Security Guide](./docs/SECURITY.md)** - Security headers, CSP configuration, and best practices
- **[⚡ Performance Optimization](./docs/PERFORMANCE_OPTIMIZATION.md)** - Detailed performance improvements and metrics
- **[📊 Optimization Report](./docs/OPTIMIZATION_REPORT.md)** - Comprehensive analysis of all optimizations
- **[📈 GitHub Metrics](./docs/GITHUB_METRICS.md)** - Repository insights, contribution stats, and activity metricsMetrics Badges -->
<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/munnasorder/m-lenz-portal?style=for-the-badge&logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/munnasorder/m-lenz-portal?style=for-the-badge&logo=git)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/munnasorder/m-lenz-portal?style=for-the-badge&logo=github)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/munnasorder/m-lenz-portal?style=for-the-badge&logo=javascript)

![GitHub contributors](https://img.shields.io/github/contributors/munnasorder/m-lenz-portal?style=for-the-badge&logo=github)
![GitHub issues](https://img.shields.io/github/issues/munnasorder/m-lenz-portal?style=for-the-badge&logo=github)
![GitHub pull requests](https://img.shields.io/github/issues-pr/munnasorder/m-lenz-portal?style=for-the-badge&logo=github)
![GitHub stars](https://img.shields.io/github/stars/munnasorder/m-lenz-portal?style=for-the-badge&logo=github)

![Top Language](https://img.shields.io/github/languages/top/munnasorder/m-lenz-portal?style=for-the-badge&logo=javascript)
![Language Count](https://img.shields.io/github/languages/count/munnasorder/m-lenz-portal?style=for-the-badge)
![License](https://img.shields.io/github/license/munnasorder/m-lenz-portal?style=for-the-badge)

</div>

A modern, high-performance React application for business management, built with Vite, React 19, Redux Toolkit, Ant Design, and Tailwind CSS v4.

## � Documentation

For detailed information about the project, please refer to our comprehensive documentation:

- **[🔒 Security Guide](./docs/SECURITY.md)** - Security headers, CSP configuration, and best practices
- **[⚡ Performance Optimization](./docs/PERFORMANCE_OPTIMIZATION.md)** - Detailed performance improvements and metrics
- **[📊 Optimization Report](./docs/OPTIMIZATION_REPORT.md)** - Comprehensive analysis of all optimizations
- **[🚀 GitHub Metrics](./docs/GITHUB_METRICS.md)** - Repository insights, contribution stats, and activity metrics

## �🚀 Features

- **⚡ Optimized Performance**: Advanced code splitting, lazy loading, and bundle optimization
- **🔒 Enterprise Security**: Comprehensive security headers, XSS protection, and secure authentication
- **📊 Real-time Monitoring**: Performance tracking, error boundaries, and analytics integration
- **🛡️ Error Resilience**: Comprehensive error boundaries and graceful fallbacks
- **📱 Modern UI/UX**: Ant Design 5, Tailwind CSS 4, and responsive design
- **🔧 Development Experience**: Hot reload, TypeScript support, and comprehensive linting

## 📊 Performance Metrics

| Metric                  | Before Optimization | After Optimization | Improvement  |
| ----------------------- | ------------------- | ------------------ | ------------ |
| **Initial Bundle Size** | 1,166KB (358KB gz)  | 37KB (10KB gz)     | **97% ✅**   |
| **First Load Time**     | ~3-4s               | ~0.5-1s            | **75% ✅**   |
| **Build Time**          | ~35s                | ~33s               | **6% ✅**    |
| **Bundle Chunks**       | 3 large chunks      | 100+ small chunks  | **Dynamic**  |
| **Security Score**      | Basic               | A+ Grade           | **Major ✅** |

> 📋 **Detailed Reports**: See [Performance Optimization Guide](./docs/PERFORMANCE_OPTIMIZATION.md) and [Optimization Report](./docs/OPTIMIZATION_REPORT.md) for complete analysis.

## 🏗️ Architecture

### Project Structure

```
src/
├── components/         # Reusable UI components + Error Boundaries
├── features/           # Feature-based modules (Dashboard, Auth, etc.)
├── hooks/              # Custom React hooks
├── redux/              # Redux slices, store, and API logic
├── assets/             # Images, icons, and static files
├── pages/              # Top-level route components
├── util/               # Utility functions
├── styles/             # Global and Tailwind styles
├── constants/          # Constants and configuration
└── data/               # Static/mock data
```

### Key Optimizations

- **Bundle Splitting**: Route-based lazy loading with 100+ optimized chunks
- **Security Hardening**: CSP headers, XSS protection, HTTPS enforcement
- **Performance**: Advanced code splitting and tree shaking
- **Monitoring**: Core Web Vitals tracking and error boundaries

> 📋 **Technical Details**: See our [Architecture Documentation](./docs/) for in-depth implementation details.

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (preferred) or npm >= 9.0.0

### Quick Start

```bash
# Clone and install
git clone <repository-url>
cd m-lens
pnpm install  # or npm install

# Development server
pnpm dev      # or npm run dev
# ➜ http://localhost:5173
```

### Build Commands

```bash
# Production build
pnpm build

# Build with bundle analysis
pnpm build:analyze

# Development server
pnpm dev

# Linting and formatting
pnpm lint           # Check for errors
pnpm lint:fix       # Auto-fix issues
pnpm format         # Format code
```

## 🧪 Testing & Quality

### Quick Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm build:analyze    # Build with bundle analysis

# Code Quality
pnpm lint             # Check for errors
pnpm lint:fix         # Auto-fix issues
pnpm format           # Format code

# Security & Performance
npm audit --audit-level high    # Security audit
```

### Performance Budget

- **Main bundle**: < 500KB (currently 37KB ✅)
- **Total JS**: < 2MB (currently ~1.5MB ✅)
- **Initial load**: < 100KB gzipped (currently 10KB ✅)

> � **Detailed Testing**: See [Quality Assurance Documentation](./docs/) for comprehensive testing strategies.

## 🚀 Deployment

### Quick Deploy

```bash
# Vercel (Recommended)
vercel --prod

# Manual Build
pnpm build     # Deploy dist/ folder to your hosting provider
```

### Environment Variables

```bash
# Required variables
VITE_APP_NAME=M-Lens Portal
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
# See .env.example for complete list
```

> 📋 **Deployment Guide**: See [Deployment Documentation](./docs/) for detailed deployment instructions and environment setup.

## 🧑‍💻 Contributing

### Quick Start

1. **Branch**: `git checkout -b feature/your-feature`
2. **Code**: Follow project standards
3. **Lint**: `pnpm lint:fix` before committing
4. **PR**: Create pull request to `development`

### Code Standards

- **ESLint**: Airbnb + Prettier configuration
- **Naming**: camelCase for variables, PascalCase for components
- **Performance**: Monitor bundle sizes with `pnpm build:analyze`

> � **Contribution Guide**: See [Contributing Documentation](./docs/) for detailed guidelines and best practices.

## 🆘 Troubleshooting

### Common Solutions

```bash
# Build issues
rm -rf node_modules dist && pnpm install && pnpm build

# Performance check
pnpm build:analyze

# Security audit
npm audit --audit-level high
```

> 📋 **Support**: For detailed troubleshooting, see our [Documentation](./docs/) or create an issue.

## 📝 License & Links

- **License**: MIT License - see [LICENSE](LICENSE) file
- **Repository**: [GitHub](https://github.com/munnasorder/m-lenz-portal)
- **Documentation**: [./docs/](./docs/)
- **Metrics**: [GitHub Insights](https://github.com/munnasorder/m-lenz-portal/pulse)

---

<div align="center">

**Performance Optimized** 🚀 | **Security Hardened** 🔒 | **Production Ready** ✅

</div>
