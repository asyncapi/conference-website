'use client';

import { useState, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import AnimatedArchitecture from './components/AnimatedArchitecture';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import VenueSelector from './components/VenueSelector';
import HostingSteps from './components/HostingSteps';
import FAQSection from './components/FAQSection';
import { useAnimationVariants } from './hooks/useAnimationVariants';
import { Venue } from './types';
import meetups from '../../config/meetups.json';
import faqs from '../../config/meetup-faqs.json';

const venues: Venue[] = meetups;

export default function MeetupsPage() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const { containerVariants, itemVariants } = useAnimationVariants();

  const handleVenueSelect = useCallback((venue: Venue | null) => {
    setSelectedVenue(venue);
  }, []);

  return (
    <div className="relative">
      <HeroSection
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <AnimatedArchitecture />

      <HorizontalScrollSection containerVariants={containerVariants} />

      <VenueSelector
        venues={venues}
        selectedVenue={selectedVenue}
        onVenueSelect={handleVenueSelect}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <HostingSteps
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <FAQSection
        faqs={faqs}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />
    </div>
  );
}
