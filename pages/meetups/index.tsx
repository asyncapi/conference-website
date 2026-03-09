import { useRef, useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  Variant,
  Variants,
} from 'framer-motion';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import Accordion from '../../components/Accordion/Accordion';
import Button from '../../components/Buttons/button';
import Arrow from '../../components/illustration/arrow';
import Link from 'next/link';
import faqs from '../../config/meetup-faqs.json';
import meetups from '../../config/meetups.json';

const ITEM_WIDTH = 400;
const GAP = 30;

const steps = [
  {
    title: 'Open a Discussion',
    description:
      'Start a discussion thread on the conference-website outlining your meetup proposal. Tag the @asyncapi/conference_coordination_wg members.',
  },
  {
    title: 'Share on Slack',
    description:
      'After opening the discussion with the details of your meetup, share your proposal in the #wg-conference-coordination Slack channel. It will help gather feedback and support from community members.',
  },
  {
    title: 'Coordinate with the Working Group',
    description:
      'Start a discussion thread on the conference-website outlining your meetup proposal. Tag the @asyncapi/conference_coordination_wg members.',
  },
  {
    title: 'Talk about it in Community Meeting',
    description:
      'Make it an agenda in the community meeting that happens bi-weekly to gather interest of community members.',
  },
];

const items = [
  {
    id: 1,
    color: '#ff0088',
    label: 'Creative Sessions',
    description:
      'Engage in hands-on sessions designed to spark creativity, foster collaboration, and inspire new ways of thinking about event-driven systems.',
    image: '/img/meetup/creative-sessions.jpg',
  },
  {
    id: 2,
    color: '#dd00ee',
    label: 'Small Groups',
    description:
      'Work in intimate groups to maximize learning, encourage open discussions, and ensure everyone has a chance to contribute their ideas and experiences.',
    image: '/img/meetup/small-groups.jpg',
  },
  {
    id: 3,
    color: '#9911ff',
    label: 'Real Connections',
    description:
      'Build meaningful relationships with fellow community members, exchange knowledge, and discover potential collaborations that go beyond the meetup.',
    image: '/img/meetup/real-connections.jpg',
  },
  {
    id: 4,
    color: '#0d63f8',
    label: 'Surprises',
    description:
      'Experience unexpected moments, fun activities, and special announcements that make each meetup unique and memorable.',
    image: '/img/meetup/surprises.webp',
  },
  {
    id: 5,
    color: '#0cdcf7',
    label: 'Optional Challenges',
    description:
      'Participate in optional challenges designed to test your skills, encourage creative problem-solving, and push the boundaries of what you can achieve.',
    image: '/img/meetup/optional.jpg',
  },
];

type VenueCity = {
  name: string;
};

type Venue = {
  country: string;
  cities: VenueCity[];
};

const venues: Venue[] = meetups;

const Meetups = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollHeight, setScrollHeight] = useState(0);

  const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP);

  useEffect(() => {
    const updateHeight = () => {
      setScrollHeight(totalDistance + window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [totalDistance]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // animate children one after another
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative">
      <motion.div
        className="container mt-[150px] justify-center sm:py-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="mt-10 w-full max-w-[1300px] lg:mt-6 sm:mt-2">
          <motion.div
            className="flex flex-wrap items-center sm:flex-col sm:items-start"
            variants={itemVariants}
          >
            <Heading
              className="text-white font-extrabold lg:text-6xl sm:text-4xl"
              level="h1"
            >
              Driving
            </Heading>
            <Heading
              className="ml-2 font-extrabold text-gradient lg:text-6xl sm:ml-0 sm:text-4xl"
              level="h1"
            >
              Innovation
            </Heading>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              className="text-7xl text-white font-extrabold lg:text-6xl sm:text-4xl"
              level="h1"
            >
              Through Open Collaboration
            </Heading>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Paragraph
              className="mt-4 w-full max-w-[600px] sm:max-w-full"
              textColor="text-gray-300"
            >
              Connect with the AsyncAPI community through local and virtual
              meetups.
            </Paragraph>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="#find-meetup">
              <Button
                className="mt-8 w-auto px-8 sm:mt-6 sm:px-6"
                type="button"
              >
                <div className="flex items-center justify-center">
                  Find a Meetup Near You
                </div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="p-12 lg:p-8 sm:px-4 sm:py-6">
        <div className="relative h-[400px] overflow-hidden rounded-2xl bg-white/10 lg:h-[340px] sm:h-[260px]">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <div className="w-full h-[500px] bg-[url('/img/architecture.svg')] bg-cover bg-center rounded-2xl"></div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mt-24 w-full lg:mt-28 sm:mt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="mb-16 text-center sm:mb-10">
          <motion.div>
            <Heading
              typeStyle="heading-lg"
              className="px-4 text-white font-extrabold sm:text-3xl"
              level="h1"
            >
              What happens at AsyncAPI Meetup?
            </Heading>
          </motion.div>
        </section>

        <div className="sm:hidden">
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: scrollHeight }}
          >
            <div className="sticky top-[100px] flex w-full items-start overflow-hidden pt-8 lg:top-20">
              <motion.div
                className="flex gap-[30px] pl-[10vw] will-change-transform lg:gap-5 lg:pl-[6vw]"
                style={{ x }}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-[600px] w-[400px] rounded-[20px] border lg:h-[560px] lg:w-[380px]"
                  >
                    <div
                      className="h-[350px] w-full bg-cover bg-center lg:h-[320px]"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, transparent 60%, ${item.color}), url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderTopRightRadius: '19px',
                        borderTopLeftRadius: '19px',
                      }}
                    />
                    <div className="z-10 p-6 lg:p-5">
                      <h3 className="text-[28px] font-semibold text-white lg:text-[24px]">
                        {item.label}
                      </h3>
                      <Paragraph typeStyle="body-md" className="mt-4">
                        {item.description}
                      </Paragraph>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="hidden px-4 sm:block">
          <div className="grid grid-cols-1 gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/20 bg-white/5"
              >
                <div
                  className="h-[220px] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent 60%, ${item.color}), url(${item.image})`,
                  }}
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-white">
                    {item.label}
                  </h3>
                  <Paragraph typeStyle="body-md" className="mt-3">
                    {item.description}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

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
                        onClick={() => setSelectedVenue(venue)}
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
                onClick={() => setSelectedVenue(null)}
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
                href="https://github.com/asyncapi/conference-website/blob/master/docs/meetup/GUIDELINE.md"
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

      <div className="sponsor-bg mt-[100px] h-auto min-h-[100vh] lg:mt-16 sm:mt-12">
        <motion.div
          className="container flex justify-center px-4 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pt-10 sm:pt-0 pb-10">
            <motion.div variants={itemVariants}>
              <Heading
                className="mt-20 font-extrabold text-white text-center"
                level="h1"
              >
                How to Host a Meetup
              </Heading>
            </motion.div>
            <div className="w-full max-w-5xl">
              <div className="mt-10 grid grid-cols-2 gap-0 sm:grid-cols-1">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex h-full flex-col rounded-2xl p-8 transition-shadow hover:shadow-lg lg:p-6 sm:p-4"
                  >
                    <div className="text-2xl bg-white w-10 text-purple-600 flex items-center justify-center rounded-full h-10 font-bold mb-4">
                      {index + 1}
                    </div>
                    <Heading
                      typeStyle="heading-md-semibold"
                      className="text-xl font-bold text-white mb-2"
                      level="h2"
                    >
                      {step.title}
                    </Heading>
                    <Paragraph typeStyle="body-md" className="text-gray-800">
                      {step.description}
                    </Paragraph>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              className="flex justify-center mt-20"
              variants={itemVariants}
            >
              <a
                href="https://github.com/asyncapi/conference-website/discussions/new/choose"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-auto px-8" type="button">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Propose a Meetup
                  </div>
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="my-20 lg:my-16 sm:my-4 sm:mb-20">
        <motion.div
          className="container flex justify-center px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="mt-20" variants={itemVariants}>
            <Heading
              className="text-center text-5xl font-extrabold text-white lg:text-4xl sm:text-3xl"
              level="h1"
            >
              FAQs About Hosting & Attending
            </Heading>
            <div className="mt-12 w-full max-w-5xl sm:mt-8">
              <Accordion faq={faqs} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Meetups;
