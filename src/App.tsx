import { useState } from 'react';
import './App.css';
import {useCryptoState, useCryptoUpdater} from './context';
import Token from './Token';
import { useQuery } from 'react-query';

function App() {
  const [showInput, setShowInput] = useState(false);
  const [tokenName, setTokenName] = useState('');
  const dispatch = useCryptoUpdater();
  const tokens = useCryptoState();
  const query = useQuery('todos', async () => {
    const response = await fetch('https://nitinr-cors.herokuapp.com/https://api.wazirx.com/api/v2/tickers')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json();
  });

  const addToken = () => {
    dispatch({type: 'ADD_TOKEN', payload: {token: tokenName, amount: 0}})
  };

  const handleAddClick = () => {
    if (showInput) {
      addToken();
      setTokenName('');
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  const getWazirxWorth = () => {
    window.localStorage.setItem('cryptoAssets',  JSON.stringify(tokens));
    if (!query.isSuccess) {
      alert('api call failed');
      return;
    }
    const tickers = query.data;
    const totalValue = tokens.reduce((acc, token) => {
      const ticker = `${token.token}inr`;
      const tickerObject = tickers[ticker];
      const tokenWorth = token.amount * tickerObject.last;
      return acc + tokenWorth;
    }, 0);
    console.log(totalValue);
    alert('Your crypto worth in WazirX platform is ' + totalValue);
    return totalValue;
  }

  return (
      <div className="App">
        {tokens.map(token => <Token token={token} key={token.token} />)}
        {showInput && <input name='token' value={tokenName} onChange={event => setTokenName(event.target.value)} />}
        <button onClick={handleAddClick}> {showInput ? 'Submit' : 'Add Token'} </button>
        <button onClick={getWazirxWorth}> Calculate WazirX Value </button>

        Source Code: https://github.com/gnsharma/wazirx-crypto-worth
      </div>
  )
}

export default App
