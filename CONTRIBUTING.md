# Contributing to MailSmithery

Thank you for your interest in contributing to MailSmithery! This document provides guidelines and information for contributors.

## 🎆 Getting Started

### Development Environment
1. **Prerequisites**
   - Node.js 18+
   - pnpm (recommended)
   - Git
   - VS Code (recommended)

2. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/mailsmithery.git
   cd mailsmithery
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

## 📜 Code Style

### TypeScript
- Use TypeScript for all new code
- Follow existing type patterns
- Add proper JSDoc comments for public APIs

### React
- Use functional components with hooks
- Follow the existing component structure
- Use proper prop types and interfaces

### CSS/Styling
- Use Tailwind CSS utilities
- Follow mobile-first responsive design
- Use the established design system

## 📦 Submitting Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Commit Messages**
   ```
   type(scope): description
   
   Examples:
   feat(mobile): add touch gesture support
   fix(auth): resolve login redirect issue
   docs(readme): update installation instructions
   ```

4. **Submit Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots for UI changes

## 🐛 Reporting Issues

### Bug Reports
Please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

### Feature Requests
Please include:
- Clear description of the feature
- Use case and benefits
- Mockups or examples if helpful

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.