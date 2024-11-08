"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Button,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMoneyBillWave,
  FaExchangeAlt,
  FaPercent,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import { ChargeResult } from "@/types/telcoTypes";
import Newsletter from "./Newsletter";
import { useState } from "react";

interface ResultsProps {
  isOpen: boolean;
  onClose: () => void;
  charges: ChargeResult;
}

const Results = ({ isOpen, onClose, charges }: ResultsProps) => {
  const formatAmount = (amount: number) => `GH₵ ${amount.toFixed(2)}`;
  const isCrossNetwork =
    charges.transactionDetails?.senderNetwork !==
    charges.transactionDetails?.receiverNetwork;

  const rules = [
    {
      icon: <FaMoneyBillWave className="text-green-500" />,
      title: "Transfer Amount",
      description: `Base amount to be transferred`,
      amount: charges.amount,
    },
    {
      icon: <FaExchangeAlt className="text-blue-500" />,
      title: "Service Charge",
      description: `${
        isCrossNetwork ? "Cross-network" : "Same-network"
      } transfer fee`,
      amount: charges.serviceCharge,
    },
    {
      icon: <FaPercent className="text-orange-500" />,
      title: "E-Levy",
      description: "Government electronic transfer levy",
      amount: charges.eLevy,
    },
  ];

  const [showNewsletter, setShowNewsletter] = useState(false);

  const handleNewsletterSuccess = () => {
    setShowNewsletter(false);
    onClose();
  };

  return (
    <>
      <AnimatePresence mode="wait" key="results-modal">
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            classNames={{
              body: "py-6",
              backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
              base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            }}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Transaction Summary
              </ModalHeader>
              <ModalBody>
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Transaction Details */}
                  <div className="bg-default-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaPhoneAlt className="text-primary" />
                      <span className="font-semibold">Transaction Details</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-default-500">From</p>
                        <p>{charges.transactionDetails?.senderPhone}</p>
                        <p className="text-xs text-default-400">
                          {charges.transactionDetails?.senderNetwork}
                        </p>
                      </div>
                      <div>
                        <p className="text-default-500">To</p>
                        <p>{charges.transactionDetails?.receiverPhone}</p>
                        <p className="text-xs text-default-400">
                          {charges.transactionDetails?.receiverNetwork}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Charges Breakdown */}
                  <div className="space-y-4">
                    {rules.map((rule, index) => (
                      <motion.div
                        key={rule.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {rule.icon}
                          <div>
                            <p className="font-medium">{rule.title}</p>
                            <p className="text-xs text-default-400">
                              {rule.description}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">
                          {formatAmount(rule.amount)}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <Divider />

                  {/* Total Amount */}
                  <motion.div
                    className="flex justify-between items-center text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <FaInfoCircle className="text-primary" />
                      <span className="font-semibold">Total Amount</span>
                    </div>
                    <span className="font-bold text-primary">
                      {formatAmount(charges.total)}
                    </span>
                  </motion.div>

                  {/* Newsletter CTA */}
                  <motion.div
                    className="mt-6 text-center text-sm text-default-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Want to stay updated with our latest rates?{" "}
                    <Button
                      className="px-0 min-w-fit h-fit"
                      variant="light"
                      color="primary"
                      onClick={() => setShowNewsletter(true)}
                    >
                      Join our newsletter
                    </Button>{" "}
                    for exclusive updates!
                  </motion.div>
                </motion.div>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" key="newsletter-modal">
        {showNewsletter && (
          <Newsletter
            isOpen={showNewsletter}
            onClose={() => setShowNewsletter(false)}
            onSuccess={handleNewsletterSuccess}
            defaultPhone={charges.transactionDetails?.senderPhone || ""}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Results;
