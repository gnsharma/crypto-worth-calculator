import React from "react";

type Token = {
  token: string;
  amount: number;
};

type CryptoState = Array<Token>;

const crytoAssets = JSON.parse(window.localStorage.getItem('cryptoAssets'));

const CryptoStateContext = React.createContext();
const CryptoUpdaterContext = React.createContext();

const cryptoReducer = (state: CryptoState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_TOKEN": {
      newState = [...state, action.payload];
      break;
    }

    case "UPDATE_AMOUNT": {
      state.find(
        (tokenObject) => tokenObject.token === action.payload.token
      ).amount = action.payload.amount;
      newState = [...state];
      break;
    }

    default: {
      newState = state;
      break;
    }
  }
  return newState;
};

function CryptoProvider({ children }) {
  const [state, dispatch] = React.useReducer(cryptoReducer, crytoAssets ?? []);

  return (
    <CryptoStateContext.Provider value={state}>
      <CryptoUpdaterContext.Provider value={dispatch}>
        {children}
      </CryptoUpdaterContext.Provider>
    </CryptoStateContext.Provider>
  );
}

function useCryptoState() {
  const cryptoState = React.useContext(CryptoStateContext);
  if (typeof cryptoState === "undefined") {
    throw new Error("useCryptoState must be used within a CryptoProvider");
  }
  return cryptoState;
}

function useCryptoUpdater() {
  const dispatch = React.useContext(CryptoUpdaterContext);
  if (typeof dispatch === "undefined") {
    throw new Error("useCryptoUpdater must be used within a CryptoProvider");
  }
  return dispatch;
}

export { CryptoProvider, useCryptoState, useCryptoUpdater };
