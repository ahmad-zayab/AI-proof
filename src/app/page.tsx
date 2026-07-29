import { Metadata } from 'next';
import { Hero, HowItWorks, SocialProof, CTA } from '@/components/landing';

export const metadata: Metadata = {
  title: "AI-Proof Engineer | Is AI Coming For Your Job?",
  description: "Take the free 5-minute quiz to discover your personalized AI-Proof Score and learn which of your skills are safe from automation.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI-Proof Engineer",
  "url": "https://ai-proof-engineer.vercel.app",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "description": "An interactive quiz that analyzes developer skills against AI automation risk.",
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
      <HowItWorks />
      <SocialProof />
      <CTA />
    </main>
  );
}
