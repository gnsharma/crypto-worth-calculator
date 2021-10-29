import { createContext, ReactNode, useContext } from "react";
import Ajv, { JTDDataType } from "ajv/dist/jtd";
import { useImmerReducer } from "use-immer";

const cryptoHoldingsSchema = {
  elements: {
    properties: {
      ticker: { type: "string" },
      amount: { type: "float32" },
    },
  },
} as const;

type CryptoHoldingsTypeDerived = JTDDataType<typeof cryptoHoldingsSchema>;
type TokenType = {
  ticker: string;
  amount: number;
};
type CryptoHoldingProviderProps = { children: ReactNode };
type Dispatch = (action: Action) => void;
type Action =
  | { type: "ADD_TOKEN"; payload: TokenType }
  | { type: "UPDATE_TOKEN_AMOUNT"; payload: TokenType };

const ajv = new Ajv();
const parseCryptoHoldings =
  ajv.compileParser<CryptoHoldingsTypeDerived>(cryptoHoldingsSchema);
const serializeCryptoHoldings =
  ajv.compileSerializer<CryptoHoldingsTypeDerived>(cryptoHoldingsSchema);
const crytoHoldings = parseCryptoHoldings(
  window.localStorage.getItem("cryptoAssets") ?? ""
);
if (crytoHoldings === undefined) {
  console.log("invalid data stored in localStorage");
}

const cryptoReducer = (state: CryptoHoldingsTypeDerived, action: Action) => {
  switch (action.type) {
    case "ADD_TOKEN": {
      state.push(action.payload);
      break;
    }

    case "UPDATE_TOKEN_AMOUNT": {
      const tokenIndex = state.findIndex(
        (tokenObject) => tokenObject.ticker === action.payload.ticker
      );
      if (tokenIndex !== -1) state[tokenIndex].amount = action.payload.amount;
      break;
    }

    default: {
      break;
    }
  }
};

const CryptoHoldingStateContext = createContext<
  CryptoHoldingsTypeDerived | undefined
>(undefined);
const CryptoHoldingUpdaterContext = createContext<Dispatch | undefined>(
  undefined
);

function CryptoHoldingProvider({ children }: CryptoHoldingProviderProps) {
  const [state, dispatch] = useImmerReducer(cryptoReducer, crytoHoldings ?? []);

  return (
    <CryptoHoldingStateContext.Provider value={state}>
      <CryptoHoldingUpdaterContext.Provider value={dispatch}>
        {children}
      </CryptoHoldingUpdaterContext.Provider>
    </CryptoHoldingStateContext.Provider>
  );
}

function useCryptoHoldingState() {
  const cryptoHoldings = useContext(CryptoHoldingStateContext);
  if (cryptoHoldings === undefined) {
    throw new Error(
      "useCryptoHoldingState must be used within a CryptoHoldingProvider"
    );
  }
  return cryptoHoldings;
}

function useCryptoHoldingUpdater() {
  const dispatch = useContext(CryptoHoldingUpdaterContext);
  if (dispatch === undefined) {
    throw new Error(
      "useCryptoHoldingUpdater must be used within a CryptoHoldingProvider"
    );
  }
  return dispatch;
}

export {
  CryptoHoldingProvider,
  useCryptoHoldingState,
  useCryptoHoldingUpdater,
  parseCryptoHoldings,
  serializeCryptoHoldings,
};
export type { TokenType };
