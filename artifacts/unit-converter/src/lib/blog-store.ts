export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageDataUrl: string | null;
};

const BLOGS_STORAGE_KEY = "hiqain:blogs";
const ADMIN_AUTH_STORAGE_KEY = "hiqain:admin-authenticated";

const fallbackPosts: BlogPost[] = [
  {
    id: "why-accurate-unit-conversion-still-matters-in-2026",
    title: "Why Accurate Unit Conversion Still Matters in 2026",
    date: "April 18, 2026",
    excerpt:
      "Small conversion mistakes can create big problems in engineering, logistics, education, and day-to-day planning. Here is why dependable tools still matter.",
    content:
      "Small conversion mistakes can create big problems in engineering, logistics, education, and day-to-day planning. Here is why dependable tools still matter.",
    imageDataUrl: null,
  },
  {
    id: "metric-vs-imperial-choosing-the-right-format-for-your-audience",
    title: "Metric vs Imperial: Choosing the Right Format for Your Audience",
    date: "April 12, 2026",
    excerpt:
      "A simple guide to deciding when to show metric values, imperial values, or both when building products for global users.",
    content:
      "A simple guide to deciding when to show metric values, imperial values, or both when building products for global users.",
    imageDataUrl: null,
  },
  {
    id: "designing-faster-conversion-workflows-for-teams",
    title: "Designing Faster Conversion Workflows for Teams",
    date: "April 4, 2026",
    excerpt:
      "From manufacturing floors to classroom dashboards, these patterns help teams reduce friction and convert values with confidence.",
    content:
      "From manufacturing floors to classroom dashboards, these patterns help teams reduce friction and convert values with confidence.",
    imageDataUrl: null,
  },
];

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getStoredBlogs(): BlogPost[] {
  if (!canUseStorage()) {
    return fallbackPosts;
  }

  const rawValue = window.localStorage.getItem(BLOGS_STORAGE_KEY);
  if (!rawValue) {
    return fallbackPosts;
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(parsed)) {
      return fallbackPosts;
    }

    return parsed.filter((item): item is BlogPost => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.excerpt === "string" &&
        typeof item.content === "string" &&
        typeof item.date === "string" &&
        (typeof item.imageDataUrl === "string" || item.imageDataUrl === null)
      );
    });
  } catch {
    return fallbackPosts;
  }
}

export function saveBlogs(posts: BlogPost[]): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(posts));
}

export function isAdminAuthenticated(): boolean {
  if (!canUseStorage()) {
    return false;
  }

  return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "true";
}

export function setAdminAuthenticated(isAuthenticated: boolean): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, String(isAuthenticated));
}
