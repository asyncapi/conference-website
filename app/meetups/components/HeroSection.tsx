import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Heading from '../../../components/Typography/heading';
import Paragraph from '../../../components/Typography/paragraph';
import Button from '../../../components/Buttons/button';

interface HeroSectionProps {
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function HeroSection({
  containerVariants,
  itemVariants,
}: HeroSectionProps) {
  return (
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
  );
}
