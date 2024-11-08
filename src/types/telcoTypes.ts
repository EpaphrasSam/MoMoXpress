export type Telco = {
  name: string;
  logo: string;
};

export interface TransactionDetails {
  senderPhone: string;
  receiverPhone: string;
  senderNetwork: string;
  receiverNetwork: string | undefined;
}

export interface ChargeResult {
  amount: number;
  serviceCharge: number;
  eLevy: number;
  total: number;
  transactionDetails?: TransactionDetails;
}
