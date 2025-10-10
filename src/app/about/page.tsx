import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </nav>

        {/* About Content */}
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              About This Portal
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Learn more about the technology stack and features
            </p>
          </header>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Built with Modern Technology</CardTitle>
                <CardDescription>
                  This web portal showcases the latest in web development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Frontend Framework</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Built with Next.js 14, utilizing the new App Router for optimal performance
                    and developer experience. Features server-side rendering, static generation,
                    and client-side navigation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">UI Components</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Powered by shadcn/ui components built on top of Radix UI primitives and
                    styled with Tailwind CSS. Fully accessible and customizable.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Development Experience</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    TypeScript for type safety, ESLint for code quality, and optimized
                    for deployment on Vercel with zero configuration.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  What makes this portal special
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Responsive design that works on all devices</li>
                  <li>• Dark/light theme support</li>
                  <li>• Fast page loads with Next.js optimizations</li>
                  <li>• SEO-friendly with proper meta tags</li>
                  <li>• Accessible components following WCAG guidelines</li>
                  <li>• Easy to extend and customize</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}