import { PageShell } from "@/components/page-shell"

const sections = [
  {
    title: "Information We Collect",
    content: [
      "When you donate to R3sults Foundation, we collect your name, email address, mailing address, and payment information. Payment card data is processed by a PCI-DSS Level 1 certified payment processor and is never stored on our servers.",
      "When you apply to volunteer or submit a partnership inquiry, we collect the contact and professional information you provide in the application form.",
      "When you visit our website, we may collect technical data such as your IP address, browser type, referring URL, and pages visited. This data is used solely for website security and performance monitoring.",
      "We do not collect, use, or store any sensitive personal information beyond what is necessary to process your request or donation.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "Donation information is used to process your contribution, provide tax receipts, and communicate about the impact of your giving if you have opted in.",
      "Volunteer and partnership information is used to evaluate and process your application, and to communicate about program status.",
      "We may send you impact updates, operational reports, and organizational news if you have provided explicit consent. You may withdraw this consent at any time.",
      "We use aggregate, anonymized website data to improve our online presence. No individual-level tracking data is used for advertising or sold to any third party.",
    ],
  },
  {
    title: "How We Protect Your Information",
    content: [
      "All data transmission on our website is protected by TLS/SSL encryption (HTTPS).",
      "Donor payment data is processed by Stripe, a PCI-DSS Level 1 certified processor. R3sults never stores complete payment card numbers.",
      "Internal access to donor records is restricted to authorized staff on a need-to-know basis.",
      "We conduct annual security reviews and comply with applicable data protection regulations.",
    ],
  },
  {
    title: "Sharing of Information",
    content: [
      "R3sults Foundation does not sell, rent, trade, or share donor or applicant information with any third party for commercial purposes.",
      "We may share data with service providers (payment processors, email delivery systems, analytics platforms) solely as required to operate our programs. All such providers are contractually bound to confidentiality.",
      "We may disclose information when required by law, court order, or regulatory authority.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You may request a copy of any personal information we hold about you by contacting info@r3sults.org.",
      "You may request correction or deletion of your personal information at any time, subject to legal and operational requirements.",
      "You may opt out of all marketing communications at any time by clicking 'Unsubscribe' in any email or contacting us directly.",
      "EU/EEA residents have additional rights under GDPR including the right to data portability and the right to restrict processing.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Our website uses only functional and analytics cookies. We do not use advertising or tracking cookies.",
      "Functional cookies are required for the website to operate (session management, form security).",
      "Analytics cookies (Google Analytics, anonymized) help us understand how visitors use our site. You may decline analytics cookies without affecting site functionality.",
    ],
  },
  {
    title: "Contact",
    content: [
      "For any privacy-related questions, requests, or concerns, contact our Privacy Officer at: info@r3sults.org or by mail at R3sults Foundation, 200 W Prospect Rd, Oakland Park, FL 33309.",
      "This Privacy Policy was last updated on March 1, 2026.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Privacy Policy" }]}
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="R3sults Foundation is committed to protecting the privacy of our donors, volunteers, and website visitors. This policy describes how we collect, use, and safeguard your information."
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-border pb-12 last:border-b-0">
              <h2 className="text-xl font-black text-foreground mb-5">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((paragraph, i) => (
                  <p key={i} className="text-brand-muted-text leading-relaxed text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
