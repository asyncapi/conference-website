import { motion } from 'framer-motion';

export default function AnimatedArchitecture() {
  return (
    <div className="p-12 lg:p-8 sm:px-4 sm:py-6">
      <div className="relative h-100 overflow-hidden rounded-2xl bg-white/10 lg:h-85 sm:h-64">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <div className="w-full h-125 bg-architecture bg-cover bg-center rounded-2xl" />
        </motion.div>
      </div>
    </div>
  );
}
