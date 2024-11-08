"use client";

import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const ServiceUnavailable = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="inline-block"
        >
          <FaExclamationTriangle className="h-24 w-24 text-yellow-400 mx-auto" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-3xl font-bold"
        >
          Service Temporarily Unavailable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-lg "
        >
          We&apos;re sorry, but we&apos;re unable to fetch the telco data at the
          moment. Please try again later.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ServiceUnavailable;
