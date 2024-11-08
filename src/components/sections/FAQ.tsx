"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "How are mobile money charges calculated?",
      answer:
        "Mobile money charges are calculated based on the transaction amount and whether it's a same-network or cross-network transfer. The total cost includes the service charge and the E-levy (electronic transfer levy).",
    },
    {
      question: "Why do cross-network transfers cost more?",
      answer:
        "Cross-network transfers typically cost more because they involve interoperability fees between different mobile money providers. These additional charges cover the cost of processing transactions across different networks.",
    },
    {
      question: "What is E-levy and how is it applied?",
      answer:
        "E-levy is a government tax applied to electronic transactions in Ghana. It's calculated as a percentage of the transfer amount and is added to the service charge for the total transaction cost.",
    },
    {
      question: "How accurate are the calculated fees?",
      answer:
        "Our calculator uses the latest fee structures from all major mobile money providers in Ghana. The calculations are regularly updated to reflect any changes in service charges or E-levy rates.",
    },
    {
      question: "Can I calculate fees for any amount?",
      answer:
        "Yes, you can calculate fees for any amount within the transfer limits set by mobile money providers. The calculator will show you the exact service charge and E-levy applicable to your transaction.",
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
          Frequently Asked Questions
        </h2>
        <p className="text-default-700">
          Everything you need to know about mobile money transfers
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion variant="bordered">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              aria-label={faq.question}
              title={<p className="text-default-800">{faq.question}</p>}
              className="text-left text-default-800"
            >
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default FAQ;
