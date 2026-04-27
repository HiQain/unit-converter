import { SiteLayout } from "@/components/SiteLayout";
import { getStoredBlogs } from "@/lib/blog-store";

export default function Blog() {
  const posts = getStoredBlogs();

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
              key={post.id}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              {post.imageDataUrl && (
                <img
                  src={post.imageDataUrl}
                  alt={post.title}
                  className="mb-4 h-48 w-full rounded-xl object-cover"
                />
              )}
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
