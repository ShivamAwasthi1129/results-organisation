import { PageShell } from "@/components/page-shell"

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing and using the R3sults Foundation website (r3sults.org), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.",
      "These terms apply to all visitors, donors, volunteers, partners, and any other users of this website.",
    ],
  },
  {
    title: "Use of Website",
    content: [
      "This website is provided for informational purposes and to facilitate donations, volunteer applications, and partnership inquiries related to R3sults Foundation's nonprofit programs.",
      "You may not use this website for any unlawful purpose, to distribute spam or harmful content, to impersonate R3sults or any third party, or to attempt to gain unauthorized access to any systems.",
      "We reserve the right to deny access to this website to any person or entity at our sole discretion.",
    ],
  },
  {
    title: "Donations",
    content: [
      "All donations made through this website are gifts to R3sults Foundation, a registered 501(c)(3) nonprofit organization (EIN: 42-2695859), and are tax-deductible to the fullest extent allowed by law.",
      "Donations are processed by a PCI-DSS certified third-party payment processor. R3sults does not store payment card information.",
      "Unless otherwise designated, donations are directed to R3sults' general operating fund and allocated per our board-approved program budget.",
      "Refund requests for donations may be submitted within 30 days of the transaction date by contacting info@r3sults.org.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on this website — including text, images, logos, graphics, and reports — is the property of R3sults Foundation or its licensors and is protected by copyright law.",
      "You may share or reproduce content from this website for non-commercial, educational, or journalistic purposes provided you attribute R3sults Foundation and link to the original source.",
      "Commercial use of any content from this website requires prior written permission from R3sults Foundation.",
    ],
  },
  {
    title: "Third-Party Links",
    content: [
      "This website may contain links to third-party websites for your convenience. R3sults is not responsible for the content, privacy practices, or policies of any linked website.",
      "Linking to a third-party site does not constitute an endorsement of that site or its content.",
    ],
  },
  {
    title: "Disclaimer of Warranties",
    content: [
      "This website is provided 'as is' without warranties of any kind, express or implied. R3sults does not warrant that the website will be uninterrupted, error-free, or free of harmful components.",
      "Information on this website is provided for general purposes only and is not a substitute for professional emergency management, medical, legal, or financial advice.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by law, R3sults Foundation shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of this website or reliance on any content herein.",
    ],
  },
  {
    title: "Changes to Terms",
    content: [
      "R3sults reserves the right to update these Terms of Use at any time. Material changes will be indicated by updating the date below. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.",
      "These Terms of Use were last updated on March 1, 2026.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms of Use are governed by the laws of the District of Columbia, United States, without regard to its conflict of law provisions.",
      "For questions about these terms, contact legal@r3sults.org.",
    ],
  },
]

export default function TermsPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Terms of Use" }]}
      eyebrow="Legal"
      title="Terms of Use"
      subtitle="Please read these terms carefully before using the R3sults Foundation website."
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
