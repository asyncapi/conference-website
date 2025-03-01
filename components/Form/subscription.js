import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Subscription() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#12002b] p-10 rounded-lg shadow-lg text-white w-full max-w-2xl mx-auto">
      {!subscribed ? (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h3 className="text-2xl font-bold">Subscribe to our newsletter</h3>
          <p className="text-gray-300 mt-2">We respect your inbox. No spam, promise ✌️</p>
          
          <form onSubmit={handleSubscribe} className="mt-5 flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Your name" className="p-3 w-full rounded-md text-black" required />
            <input type="email" placeholder="Your email" className="p-3 w-full rounded-md text-black" required />
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-md"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold">Thank you for subscribing!</h3>
          <p className="text-gray-300 mt-2">We respect your inbox. No spam, promise ✌️</p>
        </motion.div>
      )}
    </div>
  );
}
