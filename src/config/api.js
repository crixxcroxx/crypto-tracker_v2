const BASE_URL = "https://api.coingecko.com/api/v3/coins";

export const CryptoList = (currency) =>
  `${BASE_URL}/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) => `${BASE_URL}/${id}`;

export const HistoricalChart = (id, currency) =>
  `${BASE_URL}/${id}/market_chart?vs_currency=${currency}&days=365`;

export const TrendingCoins = (currency) =>
  `${BASE_URL}/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
