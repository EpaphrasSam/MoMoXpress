"use client";

import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  FaCalculator,
  FaExchangeAlt,
  FaBolt,
  FaNewspaper,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaCalculator className="text-4xl text-primary" />,
      title: "Instant Calculations",
      description:
        "Get real-time calculations for all mobile money transfer fees across different networks",
    },
    {
      icon: <FaExchangeAlt className="text-4xl text-primary" />,
      title: "Cross-Network Support",
      description:
        "Calculate fees for transfers between different mobile money providers",
    },
    {
      icon: <FaBolt className="text-4xl text-primary" />,
      title: "E-Levy Included",
      description:
        "Automatically includes the latest E-levy rates in your calculations",
    },
    {
      icon: <FaNewspaper className="text-4xl text-primary" />,
      title: "Newsletter Updates",
      description:
        "Stay informed about the latest changes in mobile money fees and E-levy rates",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 text-default-800">
          Why Choose MoMoXpress?
        </h2>
        <p className="text-default-700">
          Simple, fast, and accurate mobile money calculations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-card">
              <CardBody className="flex flex-col items-center text-center p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/90">{feature.description}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
