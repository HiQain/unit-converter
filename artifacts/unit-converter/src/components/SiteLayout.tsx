import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun } from "lucide-react";
import { LanguageBar } from "./LanguageBar";
import { LanguageSelector } from "./LanguageBar";

type SiteLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

const THEME_STORAGE_KEY = "hiqain-theme";

function getInitialDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark") {
    return true;
  }

  if (storedTheme === "light") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function SiteLayout({
  children,
  title = "Unit Converter",
  subtitle = "Fast, accurate conversions across 9 categories",
}: SiteLayoutProps) {
  const [location] = useLocation();
  const [dark, setDark] = useState(getInitialDarkMode);
  const year = new Date().getFullYear();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = () => {
    setDark((current) => !current);
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
          <div className="flex gap-5">
            <LanguageSelector className="h-10 w-25 bg-background" />
            <button
              onClick={toggleDark}
              className="w-10 h-10 rounded-lg border bg-background hover:bg-accent transition flex items-center justify-center shrink-0"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {children}
      </main>

      <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-base font-semibold text-foreground">Unit Converter</p>
            <p className="max-w-80 leading-6">
              Simple tool for converting units quickly and accurately.
            </p>
          </div>

          <nav aria-label="Footer" className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex w-fit transition-all duration-200 hover:translate-x-1 hover:text-primary hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <LanguageBar />

      <div className="container mx-auto max-w-6xl px-4 pb-4 text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-4 text-center text-xs leading-6 md:flex-row">
          <p>Copyright © 2026 Hiqain Share. All rights reserved.</p>
          <div className="md:text-right">
            <a
              href="https://hiqain.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex font-medium text-foreground transition-colors hover:text-primary hover:underline"
            >
              Powered by Hiqain
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
