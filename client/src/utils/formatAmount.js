export const formatAmount = (amount, decimalPlaces = null) => {
    if (isNaN(amount) || amount === null || amount === undefined) return "0";
  
    const parsedAmount = parseFloat(amount);
  
    if (decimalPlaces !== null) {
      return parsedAmount.toLocaleString("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      });
    }
  
    return parsedAmount.toLocaleString("en-US"); // No rounding if decimalPlaces is not provided
  };
  