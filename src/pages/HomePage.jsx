import React from 'react';
import HeroSection from '../sections/HeroSection';
import CategoryFilterSection from '../sections/CategoryFilterSection';
import TrendingServicesSection from '../sections/TrendingServicesSection';
import StatisticsSection from '../sections/StatisticsSection';
import FeaturedSchemesSection from '../sections/FeaturedSchemesSection';
import EligibilitySection from '../sections/EligibilitySection';
import UpdatesSection from '../sections/UpdatesSection';

function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-6 md:px-10 md:pt-10">
      <HeroSection />
      <CategoryFilterSection />
      <TrendingServicesSection />
      <StatisticsSection />
      <UpdatesSection />
      <FeaturedSchemesSection />
      <EligibilitySection />
    </div>
  );
}

export default HomePage;
