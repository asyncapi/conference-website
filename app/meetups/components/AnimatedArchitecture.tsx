import { motion } from 'framer-motion';

export default function AnimatedArchitecture() {
  return (
    <div className="p-12 lg:p-8 sm:px-4 sm:py-6">
      <div className="relative h-[400px] overflow-hidden rounded-2xl bg-white/10 lg:h-[340px] sm:h-[260px]">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <div className="w-full h-[500px] bg-[url('/img/architecture.svg')] bg-cover bg-center rounded-2xl" />
        </motion.div>
      </div>
    </div>
  );
}
