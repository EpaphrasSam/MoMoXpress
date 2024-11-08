import { ChargeResult } from "@/types/telcoTypes";

const calculateMTNCharges = (
  amount: number,
  isSameNetwork: boolean
): number => {
  if (isSameNetwork) {
    if (amount <= 100) return 0;
    if (amount <= 999) return amount * 0.0075;
  }

  if (amount <= 1000) return amount * 0.0075;
  return 7.5;
};

const calculateTelecelAndATCharges = (
  amount: number,
  isSameNetwork: boolean
): number => {
  if (isSameNetwork) return 0;

  if (amount <= 100) return 0;
  if (amount <= 1000) return amount * 0.005;
  return 5;
};

const calculateELevy = (amount: number): number => {
  if (amount <= 100) return 0;

  return amount * 0.01;
};

export const calculateCharges = (
  amount: number,
  senderTelco: string,
  receiverTelco: string
): ChargeResult => {
  const isSameNetwork = senderTelco === receiverTelco;
  let serviceCharge = 0;

  switch (senderTelco) {
    case "MTN":
      serviceCharge = calculateMTNCharges(amount, isSameNetwork);
      break;
    case "Telecel":
    case "AT":
      serviceCharge = calculateTelecelAndATCharges(amount, isSameNetwork);
      break;
  }

  const eLevy = calculateELevy(amount);

  const total = amount + serviceCharge + eLevy;

  return {
    amount: Number(amount.toFixed(2)),
    serviceCharge: Number(serviceCharge.toFixed(2)),
    eLevy: Number(eLevy.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};
