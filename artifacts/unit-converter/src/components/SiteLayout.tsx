import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun } from "lucide-react";

type SiteLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export function SiteLayout({
  children,
  title = "Unit Converter",
  subtitle = "Fast, accurate conversions across 9 categories",
}: SiteLayoutProps) {
  const [location] = useLocation();
  const dark = document.documentElement.classList.contains("dark");
  const year = new Date().getFullYear();

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark", !dark);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              U
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight truncate">{title}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {subtitle}
              </p>
            </div>
          </Link>
          <button
            onClick={toggleDark}
            className="w-10 h-10 rounded-lg border bg-background hover:bg-accent transition flex items-center justify-center shrink-0"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {children}
      </main>

      <footer className="border-t bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 grid gap-3 text-center md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="text-sm text-muted-foreground md:text-left">
            &copy; {year} Hiqain. All rights reserved.
          </p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-2 text-sm"
          >
            {footerLinks.map((link, index) => {
              const isActive = location === link.href;
              return (
                <span key={link.href} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="text-muted-foreground" aria-hidden="true">
                      |
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className={`transition hover:text-blue-600 hover:underline ${
                      isActive ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </span>
              );
            })}
          </nav>

          <div className="md:text-right">
            <a
              href="https://hiqain.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition hover:text-blue-600 hover:underline"
            >
              Powered by Hiqain Pvt Ltd
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
