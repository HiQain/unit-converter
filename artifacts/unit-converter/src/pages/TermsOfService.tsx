import { SiteLayout } from "@/components/SiteLayout";

const sections = [
  {
    heading: "Acceptance of Terms",
    body:
      "This mock terms page explains that by using the site, visitors agree to sample conditions covering access, acceptable use, and future updates to the service.",
  },
  {
    heading: "Permitted Use",
    body:
      "Example terms allow normal personal or business use of the converter while restricting abuse, automated disruption, reverse engineering of protected systems, or unlawful activity.",
  },
  {
    heading: "No Warranty",
    body:
      "Placeholder legal copy notes that the service is provided on an as-is basis, and that users should independently verify critical calculations before relying on them in sensitive contexts.",
  },
  {
    heading: "Limitation of Liability",
    body:
      "This sample clause states that the provider will not be responsible for indirect, incidental, or consequential losses arising from use of the demo service.",
  },
];

export default function TermsOfService() {
  return (
    <SiteLayout
      title="Terms of Service"
      subtitle="Mock legal copy for testing content structure and page navigation"
    >
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Terms of Service
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Sample terms for demo purposes
          </h2>
          <p className="text-muted-foreground">
            This mock content is intended only to populate the page and demonstrate
            the user flow. It should be reviewed and replaced with real legal text
            before deployment.
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
