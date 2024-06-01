export const pagseguroConfig = {
  accounts: {
    account1: {
      apiUrl: process.env.PAGSEGURO_API_URL,
      token: process.env.PAGSEGURO_TOKEN_ACCOUNT1 || '',
    },
    account2: {
      apiUrl: process.env.PAGSEGURO_API_URL,
      token: process.env.PAGSEGURO_TOKEN_ACCOUNT2 || '',
    },
  },
};
