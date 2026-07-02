import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Heading from '../../../components/Typography/heading';
import MeetupCard from '../../../components/Cards/MeetupCard';
import { MEETUP_ITEMS, ITEM_WIDTH, GAP } from '../constants';

interface HorizontalScrollSectionProps {
  containerVariants: Variants;
}

export default function HorizontalScrollSection({
  containerVariants,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollHeight, setScrollHeight] = useState(0);

  const totalDistance = (MEETUP_ITEMS.length - 1) * (ITEM_WIDTH + GAP);

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

  return (
    <motion.div
      className="mt-24 w-full lg:mt-28 sm:mt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <section className="mb-16 text-center sm:mb-10">
        <Heading
          typeStyle="heading-lg"
          className="px-4 text-white font-extrabold sm:text-3xl"
          level="h1"
        >
          What happens at AsyncAPI Meetup?
        </Heading>
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
              {MEETUP_ITEMS.map((item) => (
                <MeetupCard key={item.id} {...item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="hidden px-4 sm:block">
        <div className="grid grid-cols-1 gap-5">
          {MEETUP_ITEMS.map((item) => (
            <MeetupCard key={item.id} {...item} isDesktop={false} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
