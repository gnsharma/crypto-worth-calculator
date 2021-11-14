type CryptoTokenType = {
  readonly ticker: string;
  readonly tickerUppersase: string;
  readonly name: string;
  readonly logo: string;
};

const CryptoTokens = [
  { ticker: "eth", tickerUppersase: "ETH", name: "Ethereum", logo: "" },
  { ticker: "btc", tickerUppersase: "ETH", name: "Bitcoin", logo: "" },
  { ticker: "usdt", tickerUppersase: "USDT", name: "Tether", logo: "" },
  { ticker: "bnb", tickerUppersase: "BNB", name: "Binance Coin", logo: "" },
  { ticker: "sol", tickerUppersase: "SOL", name: "Solana", logo: "" },
  { ticker: "ada", tickerUppersase: "ADA", name: "Cardano", logo: "" },
  { ticker: "xrp", tickerUppersase: "XRP", name: "Ripple", logo: "" },
  { ticker: "doge", tickerUppersase: "DOGE", name: "Dogecoin", logo: "" },
  { ticker: "shib", tickerUppersase: "SHIB", name: "Shiba Inu", logo: "" },
  { ticker: "dot", tickerUppersase: "DOT", name: "Polkadot", logo: "" },
  { ticker: "ltc", tickerUppersase: "LTC", name: "Litecoin", logo: "" },
  { ticker: "busd", tickerUppersase: "BUSD", name: "Binance USD", logo: "" },
  { ticker: "matic", tickerUppersase: "MATIC", name: "Polygon", logo: "" },
  { ticker: "etc", tickerUppersase: "ETC", name: "Ethereum Classic", logo: "" },
  { ticker: "xtz", tickerUppersase: "XTZ", name: "Tezos", logo: "" },
  { ticker: "neo", tickerUppersase: "NEO", name: "Neo", logo: "" },
  { ticker: "btt", tickerUppersase: "BTT", name: "BitTorrent", logo: "" },
  { ticker: "dash", tickerUppersase: "DASH", name: "Dash", logo: "" },
] as const;

type TickersType = typeof CryptoTokens[number]["ticker"];
type UppercaseTickersType = typeof CryptoTokens[number]["tickerUppersase"];

export { CryptoTokens };
export type { CryptoTokenType, TickersType, UppercaseTickersType };
