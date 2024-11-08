"use client";

import { Button } from "@nextui-org/react";

const Hero = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
  return (
    <div className="max-w-4xl mx-auto text-center py-20 px-4">
      <h1 className="font-bold text-4xl md:text-6xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Calculate Your MoMo Charges Instantly
      </h1>
      <p className="text-lg mb-8 text-default-600">
        Fast, accurate mobile money transfer fee calculations across all
        networks
      </p>
      <Button
        size="lg"
        color="primary"
        href="#calculator"
        className="font-semibold"
        onClick={() => scrollToSection("calculator")}
      >
        Calculate Now
      </Button>
    </div>
  );
};

export default Hero;
