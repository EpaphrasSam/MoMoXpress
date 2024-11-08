"use client";

import {
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { useState, useEffect } from "react";
import { Telco } from "@/types/telcoTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCalculatorValidation,
  type CalculatorFormData,
} from "@/schemas/calculatorSchema";
import Results from "../modal/Results";
import { calculateCharges } from "@/services/calculationService";
import { ChargeResult, TransactionDetails } from "@/types/telcoTypes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

interface CalculatorProps {
  telcos?: Telco[];
}

export default function Calculator({ telcos = [] }: CalculatorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [receiverTelco, setReceiverTelco] = useState<Telco | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [charges, setCharges] = useState<ChargeResult | null>(null);

  useEffect(() => {
    setReceiverTelco(telcos[selectedIndex]);
  }, [selectedIndex, telcos]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(
      createCalculatorValidation(telcos[selectedIndex], receiverTelco)
    ),
  });

  const handleTelcoSelect = (index: number) => {
    setSelectedIndex(index);
    setReceiverTelco(telcos[index]);
    clearErrors();
  };

  const simulateApiCall = (data: CalculatorFormData): Promise<ChargeResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = calculateCharges(
          Number(data.amount),
          telcos[selectedIndex].name,
          receiverTelco?.name || ""
        );
        resolve(result);
      }, 1500);
    });
  };

  const onSubmit = async (data: CalculatorFormData) => {
    setIsLoading(true);
    try {
      const result = await simulateApiCall(data);
      const transactionDetails: TransactionDetails = {
        senderPhone: data.senderPhone,
        receiverPhone: data.receiverPhone,
        senderNetwork: telcos[selectedIndex].name,
        receiverNetwork: receiverTelco?.name,
      };

      setCharges({
        ...result,
        transactionDetails,
      });
      setShowResults(true);
    } catch (error) {
      console.error("Error calculating charges:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionConfig
      transition={{
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <div className="container mx-auto px-4" id="calculator">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl font-bold mb-4">Calculate Your Charges</h2>
          <p>Get instant fee calculations for any mobile money transfer</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto pt-16"
        >
          <div className="relative h-48 sm:h-64 mb-8">
            <div className="absolute w-full flex justify-center items-center">
              {telcos.map((telco, index) => {
                let position = index - selectedIndex;

                if (position > telcos.length / 2) {
                  position -= telcos.length;
                } else if (position < -telcos.length / 2) {
                  position += telcos.length;
                }

                const zIndex = -Math.abs(position) + 10;

                return (
                  <motion.div
                    key={telco.name}
                    animate={{
                      scale: position === 0 ? 1 : 0.85,
                      x: `${position * 60}%`,
                      zIndex,
                      opacity: Math.abs(position) <= 1 ? 1 : 0.5,
                      y: Math.abs(position) === 1 ? "10%" : 0,
                    }}
                    initial={false}
                    className="absolute cursor-pointer"
                    onClick={() => handleTelcoSelect(index)}
                    style={{
                      filter: position !== 0 ? "brightness(0.7)" : "none",
                    }}
                  >
                    <div
                      className={`
                      relative w-44 h-44 sm:w-72 sm:h-72 rounded-xl overflow-hidden
                      transition-all duration-300
                    `}
                    >
                      <Image
                        src={telco.logo}
                        alt={telco.name}
                        fill
                        className="object-contain p-4"
                        priority
                      />
                    </div>
                    <motion.p
                      animate={{
                        opacity: position === 0 ? 1 : 0,
                        scale: position === 0 ? 1 : 0.8,
                      }}
                      className="text-center mt-2 text-lg sm:text-2xl font-semibold"
                    >
                      {telco.name}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {telcos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTelcoSelect(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Select ${telcos[index].name}`}
              />
            ))}
          </div>

          <Card className="max-w-md mx-auto">
            <CardBody className="gap-4">
              <Input
                type="number"
                label="Sender's Phone Number"
                placeholder="Enter phone number"
                {...register("senderPhone")}
                errorMessage={errors.senderPhone?.message}
                isInvalid={!!errors.senderPhone}
              />

              <Input
                type="number"
                label="Receiver's Phone Number"
                placeholder="Enter phone number"
                {...register("receiverPhone")}
                errorMessage={errors.receiverPhone?.message}
                isInvalid={!!errors.receiverPhone}
                endContent={
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="light" isIconOnly className="p-0">
                        {receiverTelco ? (
                          <Image
                            src={receiverTelco.logo}
                            alt={receiverTelco.name}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-default-400">Select</span>
                        )}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Select receiver's telco"
                      onAction={(key) => {
                        const telco = telcos.find((t) => t.name === key);
                        if (telco) {
                          setReceiverTelco(telco);
                          clearErrors();
                        }
                      }}
                    >
                      {telcos.map((telco) => (
                        <DropdownItem
                          key={telco.name}
                          startContent={
                            <Image
                              src={telco.logo}
                              alt={telco.name}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          }
                          className="text-default-800"
                        >
                          {telco.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                }
              />

              <Input
                type="number"
                label="Amount"
                placeholder="Enter amount"
                {...register("amount")}
                errorMessage={errors.amount?.message}
                isInvalid={!!errors.amount}
                startContent={
                  <div className="pointer-events-none text-default-800">
                    GH₵
                  </div>
                }
              />

              <Button
                color="primary"
                className="w-full bg-[#19172c] dark:bg-[#19172c] text-white"
                size="lg"
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
              >
                {isLoading ? "Calculating..." : "Calculate Charges"}
              </Button>

              {charges && (
                <Results
                  isOpen={showResults}
                  onClose={() => setShowResults(false)}
                  charges={charges}
                />
              )}
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
