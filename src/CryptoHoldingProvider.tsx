import { createContext, ReactNode, useContext } from "react";
import produce from "immer";

import useReducerWithMiddlewares from "./useReducerWithMiddlewares";
import { loadPersistedCryptoHoldings, persistCryptoHoldings } from "./utils";
import type { Action, CryptoHoldingsType } from "./utils";

type CryptoHoldingProviderProps = { children: ReactNode };
type Dispatch = (action: Action) => void;

const cryptoReducer = produce((state: CryptoHoldingsType, action: Action) => {
  switch (action.type) {
    case "ADD_TOKEN": {
      state.push(action.payload);
      break;
    }

    case "UPDATE_TOKEN_AMOUNT": {
      const tokenIndex = state.findIndex(
        (token) => token.ticker === action.payload.ticker
      );
      if (tokenIndex !== -1) state[tokenIndex].amount = action.payload.amount;
      break;
    }

    case "DELETE_TOKEN": {
      return state.filter((token) => token.ticker !== action.payload.ticker);
    }

    default: {
      break;
    }
  }
});

const CryptoHoldingStateContext = createContext<CryptoHoldingsType | undefined>(
  undefined
);
const CryptoHoldingUpdaterContext = createContext<Dispatch | undefined>(
  undefined
);

function CryptoHoldingProvider({ children }: CryptoHoldingProviderProps) {
  const [state, dispatch] = useReducerWithMiddlewares(
    cryptoReducer,
    loadPersistedCryptoHoldings(),
    [],
    [(_, state) => persistCryptoHoldings(state)]
  );

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
};
