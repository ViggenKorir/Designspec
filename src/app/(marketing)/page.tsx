import { Metadata } from 'next';
import { HeroSection } from '@/components/marketing/HeroSection';
import { ServicesSection } from '@/components/marketing/ServicesSection';
import { PortfolioPreview } from '@/components/marketing/PortfolioPreview';
import { StatsSection } from '@/components/marketing/StatsSection';
import { CTASection } from '@/components/marketing/CTASection';

export const metadata: Metadata = {
  title: 'Home',
  description: 'DesignSpec Ltd - Expert architectural design, interior design, urban planning, and project management services since 2010.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioPreview />
      <CTASection />
    </div>
  );
}
