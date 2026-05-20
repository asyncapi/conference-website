import { AnimatePresence, motion, Variants } from 'framer-motion';
import Heading from '../../../components/Typography/heading';
import Paragraph from '../../../components/Typography/paragraph';
import Button from '../../../components/Buttons/button';
import Arrow from '../../../components/illustration/arrow';
import { Venue } from '../types';
import { MEETUP_GUIDELINES_URL } from '../constants';

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue | null) => void;
  containerVariants: Variants;
  itemVariants: Variants;
}

function VenueSelector({
  venues,
  selectedVenue,
  onVenueSelect,
  containerVariants,
  itemVariants,
}: VenueSelectorProps) {
  return (
    <motion.div
      className="container pt-20 flex justify-center px-4 text-center lg:-mt-20 sm:mt-20"
      variants={containerVariants}
      initial="hidden"
      id="find-meetup"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full max-w-5xl">
        <motion.div variants={itemVariants}>
          <Heading className="font-extrabold text-white" level="h1">
            Find a Meetup Near You
          </Heading>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Paragraph className="mt-4 text-gray-300">
            Spots are limited and filling quickly. Find your city below and
            RSVP before they&apos;re gone.
          </Paragraph>
        </motion.div>

        <AnimatePresence>
          {!selectedVenue && (
            <motion.div
              className="mt-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="mt-6 grid grid-cols-3 gap-4 lg:grid-cols-2 sm:grid-cols-1">
                {venues.map((venue) => (
                  <motion.div key={venue.country} variants={itemVariants}>
                    <Button
                      type="button"
                      outline
                      className="text-white w-full hover:bg-gradient-bg border border-white/20 px-6 py-3 rounded-full"
                      onClick={() => onVenueSelect(venue)}
                    >
                      {venue.country}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedVenue && (
          <div className="mt-20 text-left sm:mt-12">
            <Button
              type="button"
              className="mb-10 flex items-center sm:mb-6"
              onClick={() => onVenueSelect(null)}
              outline
              icon={<Arrow className="w-4 rotate-180" />}
              iconPosition="left"
            >
              <div className="ml-2 text-white text-md">
                {selectedVenue.country}
              </div>
            </Button>

            {selectedVenue.cities.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 sm:grid-cols-1">
                {selectedVenue.cities.map((city) => (
                  <Button
                    type="button"
                    outline
                    key={city.name}
                    className="text-white border border-white/20 px-6 py-3 rounded-full text-center"
                  >
                    {city.name}
                  </Button>
                ))}
              </div>
            ) : (
              <Paragraph className="text-gray-300 text-center">
                No meetups in this country yet. Stay tuned!
              </Paragraph>
            )}
          </div>
        )}
        <motion.div variants={itemVariants}>
          <Paragraph className="mt-10" typeStyle="body-md">
            Please be sure to read and understand our Terms & Conditions for{' '}
            <a
              href={MEETUP_GUIDELINES_URL}
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hosts.
            </a>
          </Paragraph>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default VenueSelector;
