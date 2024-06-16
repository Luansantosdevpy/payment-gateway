interface Calendar {
  creation: string;
  expiration: number;
}

interface Location {
  id: number;
  location: string;
  cobType: string;
}

interface Debtor {
  cnpj: string;
  name: string;
}

interface Value {
  original: string;
}

export default interface PixTransaction {
  calendar: Calendar;
  transactionId: string;
  revision: number;
  loc: Location;
  location: string;
  status: string;
  debtor: Debtor;
  value: Value;
  key: string;
  payerRequest: string;
  pixCopyPaste: string;
}
