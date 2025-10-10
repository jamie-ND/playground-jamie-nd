# Web Portal

A modern web portal built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components. Optimized for deployment on Vercel.

## Features

- ⚡ **Next.js 14** - Latest version with App Router
- 🎨 **shadcn/ui** - Beautiful, accessible UI components
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Built-in dark/light theme support
- 🚀 **Vercel Ready** - Optimized for deployment

## Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your machine.

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   └── lib/
│       └── utils.ts         # Utility functions
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Adding Components

This project uses shadcn/ui components. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## Deployment

### Deploy to Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

The app is configured with:
- Automatic HTTPS
- Global CDN
- Serverless functions support
- Environment variables support

### Environment Variables

Create a `.env.local` file for local environment variables:

```bash
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Customization

### Themes

The project supports both light and dark themes. Customize colors in:
- `src/app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind theme configuration

### Adding Pages

Create new pages in the `src/app` directory:

```tsx
// src/app/about/page.tsx
export default function About() {
  return <div>About Page</div>
}
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Lucide React](https://lucide.dev/) - Icons

## License

This project is open source and available under the [MIT License](LICENSE).