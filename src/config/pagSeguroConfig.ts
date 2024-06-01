interface Account {
  apiUrl: string;
  token: string;
}

interface Accounts {
  [key: string]: Account;
}

export const accounts: Accounts = {
  account1: {
    apiUrl: process.env.PAGSEGURO_API_URL!,
    token: process.env.PAGSEGURO_TOKEN_ACCOUNT1! || '',
  },
  account2: {
    apiUrl: process.env.PAGSEGURO_API_URL!,
    token: process.env.PAGSEGURO_TOKEN_ACCOUNT2! || '',
  },
};

export function getAccountInfo(accountName: string): Account {
  return accounts[accountName];
}
