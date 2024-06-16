interface Calendar {
  expiration: number;
}

interface Deptor {
  cpf: string;
  name: string;
}

interface Price {
  original: string;
}

export default interface InstantPayment {
  calendar: Calendar;
  deptor: Deptor;
  price: Price;
  key: string;
  solicitation: string;
}
