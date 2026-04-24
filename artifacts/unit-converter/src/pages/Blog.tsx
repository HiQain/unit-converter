import { SiteLayout } from "@/components/SiteLayout";

const posts = [
  {
    title: "Why Accurate Unit Conversion Still Matters in 2026",
    date: "April 18, 2026",
    excerpt:
      "Small conversion mistakes can create big problems in engineering, logistics, education, and day-to-day planning. Here is why dependable tools still matter.",
  },
  {
    title: "Metric vs Imperial: Choosing the Right Format for Your Audience",
    date: "April 12, 2026",
    excerpt:
      "A simple guide to deciding when to show metric values, imperial values, or both when building products for global users.",
  },
  {
    title: "Designing Faster Conversion Workflows for Teams",
    date: "April 4, 2026",
    excerpt:
      "From manufacturing floors to classroom dashboards, these patterns help teams reduce friction and convert values with confidence.",
  },
];

export default function Blog() {
  return (
    <SiteLayout
      title="Hiqain Blog"
      subtitle="Mock articles and product stories for the unit converter experience"
    >
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Blog
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Insights, updates, and conversion tips
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            This is mock blog content for navigation and layout testing. Each post
            preview is sample data that can later be replaced with CMS-driven content.
          </p>
        </section>

        <section className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
              <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </section>
      </div>
    </SiteLayout>
  );
}
