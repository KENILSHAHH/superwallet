const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const STORAGE_KEY = "crypto_price_data";

export const getCryptoPrice = async (symbol) => {
  console.log("hi")
  const cachedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  const now = new Date();
  const todayDate = now.toISOString().split("T")[0]; // YYYY-MM-DD

  // If data exists in local storage and is recent, use it
  if (
    cachedData[symbol] &&
    Date.now() - cachedData[symbol].timestamp < CACHE_DURATION
  ) {
    return {
      todayPrice: cachedData[symbol].todayPrice,
      prevPrice: cachedData[symbol].prevPrice,
    };
  }

  try {
    // Fetch the latest price from API
    const response = await fetch(`/api/crypto?symbol=${symbol}USD`);
    const data = await response.json();
    const todayPrice = parseFloat(data.price).toFixed(2);

    // Update previous day's price if it's a new day
    if (!cachedData[symbol] || cachedData[symbol].date !== todayDate) {
      cachedData[symbol] = {
        prevPrice: cachedData[symbol]?.todayPrice || todayPrice, // Carry over or use current price
        todayPrice,
        date: todayDate,
        timestamp: Date.now(),
      };
    } else {
      // Only update today's price if the day hasn't changed
      cachedData[symbol].todayPrice = todayPrice;
      cachedData[symbol].timestamp = Date.now();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedData));

    return {
      todayPrice,
      prevPrice: cachedData[symbol].prevPrice,
    };
  } catch (error) {
    console.error("Error fetching crypto price:", error);
    return {
      todayPrice: "N/A",
      prevPrice: cachedData[symbol]?.prevPrice || "N/A",
    };
  }
};
