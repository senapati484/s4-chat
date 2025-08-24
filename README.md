# S4 Chat - Multi-AI Chat Interface

A modern, clean web application that allows users to interact with four different AI models simultaneously: **ChatGPT**, **Grok**, **Claude**, and **Gemini**.

## 🚀 Features

### 🔐 Authentication

- **Google Sign-In**: Seamless authentication using Google OAuth By Using Clerk
- **Apple Sign-In**: Secure authentication using Apple ID By Using Clerk
- **Session Management**: Persistent login sessions with localStorage

### 💬 Multi-AI Chat Interface

- **Four AI Models**: ChatGPT, Grok, Claude, and Gemini
- **Simultaneous Responses**: Send one message and receive responses from all active models
- **Individual Toggle Controls**: Turn each AI model on/off independently
- **Real-time Status Indicators**: Visual indicators showing which models are active/inactive

### 🎨 Modern UI/UX

- **Clean Design**: Minimalist, modern interface with smooth animations
- **Responsive Layout**: Adapts to different screen sizes
- **Collapsible Sidebar**: Organize and manage chat conversations
- **Color-coded Models**: Each AI model has its own distinct color theme
- **Dark/Light Mode**: Built-in theme support

### 📱 Conversation Management

- **Multiple Conversations**: Create and manage multiple chat sessions
- **Persistent Storage**: Conversations saved locally
- **Quick Navigation**: Easy switching between conversations
- **Delete Conversations**: Remove unwanted chat sessions

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Authentication**: Mock OAuth (ready for real implementation)

## 🎯 AI Models

| Model       | Icon        | Color  | Status                        |
| ----------- | ----------- | ------ | ----------------------------- |
| **ChatGPT** | ✨ Sparkles | Green  | OpenAI's conversational AI    |
| **Grok**    | ⚡ Zap      | Red    | xAI's conversational AI       |
| **Claude**  | 🧠 Brain    | Orange | Anthropic's conversational AI |
| **Gemini**  | 💎 Gem      | Blue   | Google's conversational AI    |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/senapati484/s4-chat.git
   cd s4-chat
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 1. Authentication

- Click "Continue with Google" or "Continue with Apple"
- The app uses mock authentication for demo purposes
- In production, integrate with real OAuth providers

### 2. Starting a Chat

- Click "New Chat" in the sidebar to create a conversation
- The interface will show all four AI models in a grid layout

### 3. Managing AI Models

- Use the toggle switches to activate/deactivate specific models
- Active models are highlighted with their respective colors
- Status indicators in the top bar show which models are on/off

### 4. Sending Messages

- Type your message in the input box at the bottom
- Press Enter to send (Shift+Enter for new line)
- All active models will respond simultaneously
- Each response is color-coded and labeled

### 5. Managing Conversations

- Use the sidebar to switch between conversations
- Click the trash icon to delete conversations
- Collapse the sidebar for more screen space

## 🎨 Design System

### Color Palette

- **Primary**: Clean grays and blues
- **ChatGPT**: Green (#10b981)
- **Grok**: Red (#ef4444)
- **Claude**: Orange (#f59e0b)
- **Gemini**: Blue (#3b82f6)

### Typography

- **Headings**: Space Grotesk (modern, tech-focused)
- **Body**: DM Sans (clean, readable)

### Components

- **Cards**: Clean borders with subtle shadows
- **Buttons**: Consistent styling with hover effects
- **Inputs**: Focus states with ring indicators
- **Badges**: Status indicators with color coding

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for production settings:

```env
# OAuth Configuration (for production)
GOOGLE_CLIENT_ID=your_google_client_id
APPLE_CLIENT_ID=your_apple_client_id

# API Keys (for real AI integration)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
XAI_API_KEY=your_xai_key
```

### Customization

- Modify `components/clean-chat-interface.tsx` to change AI model configurations
- Update `components/clean-login.tsx` for branding changes
- Customize colors in `app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Build command: `npm run build`
- **Railway**: Supports Next.js out of the box
- **Docker**: Use the provided Dockerfile

## 🔮 Future Enhancements

- [ ] Real AI API integration
- [ ] Message history export
- [ ] Custom model configurations
- [ ] Voice input/output
- [ ] File upload support
- [ ] Collaborative chat rooms
- [ ] Advanced conversation analytics
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the amazing icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework

---

**S4 Chat** - Experience the power of multiple AI models in one unified interface! 🚀
