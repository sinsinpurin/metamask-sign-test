import React from 'react';
import './App.css';
import web3 from 'web3';

const App = () => {
  const [ web3Instance , setWeb3Instance] = React.useState<web3>()
  const [ message, setMessage] = React.useState("")
  const [ singedMessage, setSignedMessage ] = React.useState("")

  React.useEffect(()=>{
  const setWeb3 = async() =>{
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWeb3Instance(new web3(window.ethereum));
    }
  }
  setWeb3();
},[])

  const hundleWeb3Check = () => {
    console.log(web3Instance)
  }

  const hundleTextSign = async(message: string) => {
    if(web3Instance && message){
      let accounts = await web3Instance.eth.getAccounts();
      console.log(accounts)
      web3Instance.eth.sign(web3Instance.utils.utf8ToHex(message), accounts[0])
      .then((signedMessage) => setSignedMessage(signedMessage));
      web3Instance.eth.sign(web3Instance.utils.utf8ToHex(message), accounts[0])
      .then(console.log);

      web3Instance.eth.personal.sign(message, accounts[0], "null").then(console.log)
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => hundleWeb3Check()}>Web3 Check</button>
      </div>
      <div>
        <input type="text" name="text" id="text1" value={message} onChange={event => setMessage(event.target.value)}/>
        <button onClick={()=> hundleTextSign(message)}>Sign (web3.eth.sign)</button>
      </div>
      signed message: {singedMessage}
    </div>
  );
}

export default App;
