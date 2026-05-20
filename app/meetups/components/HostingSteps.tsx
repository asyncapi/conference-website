import { motion, Variants } from 'framer-motion';
import Heading from '../../../components/Typography/heading';
import Paragraph from '../../../components/Typography/paragraph';
import Button from '../../../components/Buttons/button';
import { HOSTING_STEPS, GITHUB_DISCUSSION_URL } from '../constants';
import Github from '../../../components/illustration/Socials/Github';

interface HostingStepsProps {
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function HostingSteps({
  containerVariants,
  itemVariants,
}: HostingStepsProps) {
  return (
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
              {HOSTING_STEPS.map((step, index) => (
                <motion.div
                  key={step.title}
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
              href={GITHUB_DISCUSSION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-auto px-8" type="button">
                <div className="flex items-center justify-center">
                  <Github className="w-5 h-5 mr-2" />
                  Propose a Meetup
                </div>
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
