"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">About MoMoXpress</h2>
        <div>
          <div className="text-left space-y-4">
            <p>
              MoMoXpress is your go-to calculator for mobile money transfer fees
              in Ghana. We provide instant, accurate calculations for all major
              networks including MTN, AirtelTigo, and Telecel.
            </p>
            <p>Our calculator takes into account:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Network-specific transfer fees</li>
              <li>Cross-network charges</li>
              <li>E-levy calculations</li>
              <li>Real-time rate updates</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
