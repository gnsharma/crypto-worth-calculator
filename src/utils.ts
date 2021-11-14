import Ajv, { JTDDataType } from "ajv/dist/jtd";
import produce from "immer";

const cryptoHoldingsSchema = {
  elements: {
    properties: {
      ticker: { type: "string" },
      amount: { type: "float32" },
    },
  },
} as const;

type CryptoHoldingsType = JTDDataType<typeof cryptoHoldingsSchema>;
type TokenHoldingType = {
  ticker: string;
  amount: number;
};
type Action =
  | { type: "ADD_TOKEN"; payload: TokenHoldingType }
  | { type: "UPDATE_TOKEN_AMOUNT"; payload: TokenHoldingType }
  | { type: "DELETE_TOKEN"; payload: TokenHoldingType };

const ajv = new Ajv();
const parseCryptoHoldings =
  ajv.compileParser<CryptoHoldingsType>(cryptoHoldingsSchema);
const serializeCryptoHoldings =
  ajv.compileSerializer<CryptoHoldingsType>(cryptoHoldingsSchema);

const loadPersistedCryptoHoldings = () => {
  const cryptoHoldings = parseCryptoHoldings(
    window.localStorage.getItem("cryptoHoldings") ?? ""
  );
  if (cryptoHoldings === undefined) {
    console.log("invalid data stored in localStorage");
    console.log(parseCryptoHoldings.message); // error message from the last parse call
    console.log(parseCryptoHoldings.position);
    return [];
  }
  return cryptoHoldings;
};

const persistCryptoHoldings = (cryptoHoldings: CryptoHoldingsType) => {
  try {
    window.localStorage.setItem(
      "cryptoHoldings",
      serializeCryptoHoldings(cryptoHoldings)
    );
  } catch (e) {
    console.log("invalid data provided");
  }
};

export { persistCryptoHoldings, loadPersistedCryptoHoldings };
export type { Action, CryptoHoldingsType, TokenHoldingType };
