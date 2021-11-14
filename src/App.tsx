import React, { useState } from "react";
import { useQuery } from "react-query";
import { CellProps, Column } from "react-table";

import {
  useCryptoHoldingState,
  useCryptoHoldingUpdater,
} from "./CryptoHoldingProvider";
import Token from "src/components/Token";
import Table from "src/components/Table";
import { TokenHoldingType } from "./utils";
import { CryptoTokens } from "./constants";
import type { CryptoTokenType } from "./constants";
import GithubIcon from "./github.svg";

function App() {
  const [showInput, setShowInput] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const dispatch = useCryptoHoldingUpdater();
  const tokens = useCryptoHoldingState();
  const query = useQuery("tickers", async () => {
    const response = await fetch("/.netlify/functions/bypass-cors", {
      mode: "no-cors",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  const addToken = () => {
    dispatch({ type: "ADD_TOKEN", payload: { ticker: tokenName, amount: 0 } });
  };

  const handleAddClick = () => {
    if (showInput) {
      addToken();
      setTokenName("");
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  const getWazirxWorth = () => {
    if (!query.isSuccess) {
      return null;
    }
    const tickers = query.data;
    const totalValue = tokens.reduce((acc, token) => {
      const ticker = `${token.ticker}inr`;
      const tickerObject = tickers[ticker];
      const tokenWorth = token.amount * tickerObject.last;
      return acc + tokenWorth;
    }, 0);
    return totalValue;
  };

  const columns = React.useMemo<Array<Column<TokenHoldingType>>>(
    () => [
      {
        Header: "Token",
        accessor: "ticker",
        Footer: "Your Total Crypto Worth in WazirX:",
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value, row }: CellProps<TokenHoldingType, number>) => (
          <Token token={{ ticker: row.values.ticker, amount: value }} />
        ),
        Footer: () => {
          const totalValue = getWazirxWorth();
          return totalValue ?? "Error in Fetching Data";
        },
      },
    ],
    []
  );

  const data = React.useMemo(() => tokens, [tokens]);

  return (
    <div className='m-12'>
      <Table<TokenHoldingType> columns={columns} data={data} />
      {showInput && (
        <select
          name='token'
          value={tokenName}
          onChange={(event) => setTokenName(event.target.value)}
          className='my-4'
        >
          {CryptoTokens.map((tokenData: CryptoTokenType) => (
            <option value={tokenData.ticker}>{tokenData.name}</option>
          ))}
        </select>
      )}
      <button className='my-4 block' onClick={handleAddClick}>
        {showInput ? "Submit" : "Add Token"}
      </button>
      {/* <a href='https://github.com/gnsharma/wazirx-crypto-worth'>Test</a> */}
      Source Code: https://github.com/gnsharma/wazirx-crypto-worth
    </div>
  );
}

export default App;
