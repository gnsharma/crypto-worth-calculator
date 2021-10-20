import {useCryptoState, useCryptoUpdater} from './context';

function Token({token}) {
  const dispatch = useCryptoUpdater();

  const updateAmount = (event) => {
    dispatch({type: 'UPDATE_AMOUNT', payload: {token: token.token, amount: Number.parseFloat(event.target.value)}})
  };
  return (
    <div className='token'>
        <span style={{margin: '20px'}}>{token.token}: {token.amount}</span> 
        <input name='amount' value={token.amount} type='number' onChange={updateAmount}></input>
    </div>
  )
}

export default Token
