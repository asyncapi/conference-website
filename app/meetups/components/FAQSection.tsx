import { motion, Variants } from 'framer-motion';
import Heading from '../../../components/Typography/heading';
import Accordion from '../../../components/Accordion/Accordion';

interface FAQSectionProps {
  faqs: Array<{ q: string; a: string }>;
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function FAQSection({
  faqs,
  containerVariants,
  itemVariants,
}: FAQSectionProps) {
  return (
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
  );
}
