import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SECTIONS = [
  {
    title: "General Information",
    body:
      "The information and tools provided on Hiqain (hiqain.com) are for general informational and utility purposes only. We make no warranty of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the services provided.",
  },
  {
    title: "Tool Accuracy",
    body:
      "While we strive to ensure our image compression tools produce accurate results, output file sizes may vary slightly based on image content, format, and compression settings. We recommend verifying the final file size before submission to government portals or official forms.",
  },
  {
    title: "File Privacy",
    body:
      "Files uploaded to Hiqain are processed on our servers and immediately deleted after the compression is complete. We do not store, share, or sell your uploaded images. However, you are responsible for the content of files you upload.",
  },
  {
    title: "Third-Party Links",
    body:
      "Our website may contain links to third-party websites, including government portals and external resources. These links are provided for convenience only. We have no control over the content or privacy practices of those websites and accept no responsibility for them.",
  },
  {
    title: "Limitation of Liability",
    body:
      "Hiqain shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services. Use of our tools is entirely at your own risk.",
  },
  {
    title: "Changes to This Disclaimer",
    body:
      "We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated date. Continued use of our website constitutes acceptance of any revised disclaimer.",
  },
];

export default function DisclaimerPage() {
  return (
    <SiteLayout
      title="Disclaimer"
      subtitle="Important usage, privacy, and responsibility notes for this tool"
    >
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Disclaimer
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Important information before using this tool
          </h2>
          <p className="text-muted-foreground">
            Review the notes below to understand how this tool should be used and
            what responsibilities remain with the user.
          </p>
        </section>

        <Card>
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <CardTitle>Disclaimer</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Last updated: February 2026</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {SECTIONS.map((section) => (
              <section key={section.title} className="space-y-2">
                <h2 className="text-base font-semibold">{section.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{section.body}</p>
              </section>
            ))}

            <section className="space-y-2">
              <h2 className="text-base font-semibold">Contact Us</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                If you have any questions about this disclaimer, please visit our{" "}
                <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                  Contact Us
                </Link>{" "}
                page.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
