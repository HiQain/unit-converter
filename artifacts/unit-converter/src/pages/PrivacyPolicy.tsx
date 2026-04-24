import { SiteLayout } from "@/components/SiteLayout";

const sections = [
  {
    heading: "Information We Collect",
    body:
      "This mock privacy policy states that we may collect basic usage details such as browser type, device information, approximate region, and feature interactions to improve the product experience.",
  },
  {
    heading: "How We Use Information",
    body:
      "Sample usage includes measuring product performance, improving conversion workflows, monitoring stability, and understanding which features are most helpful to visitors.",
  },
  {
    heading: "Cookies and Analytics",
    body:
      "Example analytics and cookie usage may include remembering preferences, tracking aggregate usage patterns, and maintaining session continuity across pages.",
  },
  {
    heading: "Your Choices",
    body:
      "As placeholder copy, this section explains that users may request data access, correction, deletion, or opt out of certain non-essential tracking where applicable.",
  },
];

export default function PrivacyPolicy() {
  return (
    <SiteLayout
      title="Privacy Policy"
      subtitle="Mock policy content for layout, navigation, and content structure testing"
    >
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Privacy Policy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Sample privacy content
          </h2>
          <p className="text-muted-foreground">
            This page contains mock privacy policy text for demonstration purposes
            only. It is not legal advice and should be replaced with an approved
            policy before production use.
          </p>
        </section>

        <section className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm space-y-6">
          {sections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h3 className="text-xl font-semibold">{section.heading}</h3>
              <p className="text-muted-foreground leading-7">{section.body}</p>
            </div>
          ))}
        </section>
      </div>
    </SiteLayout>
  );
}
