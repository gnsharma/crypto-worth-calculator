import { ChangeEvent, useState } from "react";
import IconDelete from "~icons/mdi/delete";

import { useCryptoHoldingUpdater } from "src/CryptoHoldingProvider";
import type { TokenHoldingType } from "src/utils";

type TokenProps = {
  token: TokenHoldingType;
};

function Token({ token }: TokenProps) {
  const dispatch = useCryptoHoldingUpdater();
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  const updateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_TOKEN_AMOUNT",
      payload: {
        ticker: token.ticker,
        amount: Number.parseFloat(event.target.value),
      },
    });
  };

  const toggleAmountEditing = () => {
    setIsEditingAmount((isEditingAmount) => !isEditingAmount);
  };

  return (
    <div className='flex justify-between'>
      {isEditingAmount ? (
        <input
          name='amount'
          value={token.amount}
          type='number'
          onChange={updateAmount}
          onBlur={toggleAmountEditing}
        ></input>
      ) : (
        <span onClick={toggleAmountEditing} className='flex-grow'>
          {token.amount}
        </span>
      )}
      <button
        onClick={() => dispatch({ type: "DELETE_TOKEN", payload: token })}
      >
        <IconDelete />
      </button>
    </div>
  );
}

export default Token;
