export enum Billing {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
  BOLETO = 'boleto',
}

export type Split = {
  walletId: string;
  fixedValue: number;
  percentualValue: number;
  totalFixedValue: number;
};

export type Discount = {
  value: number;
  dueDateLimitDays: number;
  type: string;
};

export type Fine = {
  value: number;
  type: string;
};

export type Callback = {
  successUrl: string;
  autoRedirect: true;
};

export default interface PaymentData {
  customer: string;
  billingType: Billing;
  value: number;
  dueDate: string;
  description?: string;
  daysAfterDueDateToRegistrationCancellation?: number;
  externalReference?: string;
  installmentCount: number;
  totalValue: number;
  installmentValue: number;
  discount?: Discount;
  interest?: {
    value: number;
  };
  fine?: Fine;
  postalService?: true;
  split?: [Split];
  callback?: Callback;
}
