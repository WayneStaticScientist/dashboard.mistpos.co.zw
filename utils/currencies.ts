export const toLocalCurrency = (amount: number) => {
  if (!amount) return "$0";
  const userStorage = localStorage.getItem("user");
  if (!userStorage) return `$${amount.toFixed(2)}`;
  return `$${amount.toFixed(2)}`;
};
export const toBaseCurrence = (amount: number) => {
  if (!amount) return 0;
  const userStorage = localStorage.getItem("user");
  if (!userStorage) return amount;
  return amount;
};
export const toLocalCurrenceString = (amount: number) => {
  if (!amount) return "0";
  const userStorage = localStorage.getItem("user");
  if (!userStorage) return `${amount.toFixed(2)}`;
  return `${amount.toFixed(2)}`;
};
