import { ChangeEvent } from "react";
import { useCryptoHoldingUpdater } from "../context";
import type { TokenType } from "../context";

type TokenProps = {
  token: TokenType;
};

function Token({ token }: TokenProps) {
  const dispatch = useCryptoHoldingUpdater();

  const updateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_TOKEN_AMOUNT",
      payload: {
        ticker: token.ticker,
        amount: Number.parseFloat(event.target.value),
      },
    });
  };
  return (
    <div className='token'>
      <span style={{ margin: "20px" }}>
        {token.ticker}: {token.amount}
      </span>
      <input
        name='amount'
        value={token.amount}
        type='number'
        onChange={updateAmount}
      ></input>
    </div>
  );
}

export default Token;
