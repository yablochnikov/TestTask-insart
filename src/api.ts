// src/api.ts
export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export const mockFetcher = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { ccy: "CHF", base_ccy: "UAH", buy: "40.00670", sale: "40.00670" },
    { ccy: "CZK", base_ccy: "UAH", buy: "1.56860", sale: "1.56860" },
    { ccy: "GBP", base_ccy: "UAH", buy: "44.18370", sale: "44.18370" },
    { ccy: "ILS", base_ccy: "UAH", buy: "9.37100", sale: "9.37100" },
    { ccy: "JPY", base_ccy: "UAH", buy: "0.23848", sale: "0.23848" },
    { ccy: "NOK", base_ccy: "UAH", buy: "3.22790", sale: "3.22790" },
    { ccy: "PLZ", base_ccy: "UAH", buy: "8.65850", sale: "8.65850" },
    { ccy: "SEK", base_ccy: "UAH", buy: "3.31180", sale: "3.31180" },
  ];
};
