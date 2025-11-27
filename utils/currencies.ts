export const toLocalCurrency = (amount: number) => {
  const userStorage = localStorage.getItem("user");
  if (!userStorage) return `$${amount.toFixed(2)}`;
  return `$${amount.toFixed(2)}`;
};
