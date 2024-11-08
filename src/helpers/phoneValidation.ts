type TelcoPrefix = {
  name: string;
  prefixes: string[];
};

const telcoPrefixes: Record<string, TelcoPrefix> = {
  MTN: {
    name: "MTN",
    prefixes: ["024", "054", "055", "059", "025"],
  },
  AT: {
    name: "AT",
    prefixes: ["027", "057", "026", "056"],
  },
  Telecel: {
    name: "Telecel",
    prefixes: ["020", "050"],
  },
};

export const validatePhoneNumber = (
  phoneNumber: string,
  telcoName: string
): boolean => {
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  if (cleanNumber.length !== 10) {
    return false;
  }

  const prefix = cleanNumber.substring(0, 3);

  const telco = telcoPrefixes[telcoName];
  if (!telco) return false;

  return telco.prefixes.includes(prefix);
};
