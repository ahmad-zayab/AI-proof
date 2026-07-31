import { Metadata } from 'next';
import { Hero, Evidence, CTA } from '@/components/landing';

export const metadata: Metadata = {
  title: "AI Proof | Is AI Coming For Your Job?",
  description: "A 7-question assessment that measures your engineering skills against AI automation capabilities.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Proof",
  "url": "https://ai-proof.vercel.app",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "description": "An engineering skills assessment tool evaluating architecture, debugging, and systems thinking against AI capabilities.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Evidence />
      <CTA />
    </main>
  );
}
