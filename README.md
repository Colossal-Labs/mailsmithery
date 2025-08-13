# MailSmithery

<div align="center">
  <img src="https://via.placeholder.com/150x150/2B5D3A/FFFFFF?text=MS" alt="MailSmithery Logo" width="150" height="150" />
  <h1>AI-Powered Email Template Generator</h1>
  <p><strong>Create beautiful, responsive email templates with the power of AI</strong></p>
</div>

---

## 🎆 Features

### 🤖 **AI-Powered Generation**
- Generate professional email templates from simple text descriptions
- Support for multiple email types: newsletters, announcements, promotions, transactional
- Intelligent brand token integration for consistent styling

### 📱 **Mobile-First Responsive Design**
- **Desktop**: Three-panel layout for optimal productivity
- **Tablet**: Collapsible panels with touch-friendly controls
- **Mobile**: Tab-based interface with gesture support
- Touch-optimized interactions with zoom and pan capabilities

### 🎨 **Brand Consistency**
- Project-based brand token management
- Automatic color, font, and style application
- Brand preview in template generation

### 🚀 **Advanced Email Features**
- MJML-based template generation for maximum compatibility
- Real-time preview with desktop/mobile modes
- Export to HTML and MJML formats
- Version history and template management

### 🔒 **Secure & Scalable**
- Supabase backend with Row Level Security (RLS)
- User authentication and authorization
- Real-time collaboration capabilities

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Colossal-Labs/mailsmithery.git
   cd mailsmithery
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   ```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom mobile utilities
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database with Row Level Security
  - Edge Functions for serverless computing
  - Real-time subscriptions
  - Authentication and authorization

### Mobile Optimizations
- **Touch Events** - Native gesture support
- **Hardware Acceleration** - Smooth animations
- **Viewport Optimization** - iOS Safari specific fixes
- **Progressive Enhancement** - Works on all devices

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on development setup and coding standards.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>Built with ❤️ by the MiniMax Agent</strong></p>
</div>