import React from 'react';
import './App.css';
import web3 from 'web3';

const App = () => {
  const [ web3Instance , setWeb3Instance] = React.useState<web3>()
  const [ message, setMessage] = React.useState("")
  const [ signature, setSignature ] = React.useState<string>("")

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
    if(web3Instance && web3Instance.utils.sha3(message) != null){
      let [account] = await web3Instance.eth.getAccounts();
      let messageHash = web3Instance.utils.sha3(message) as string
      // web3Instance.utils.sha3(message)で32byteにする
      const signature = await web3Instance.eth.sign(messageHash, account);
      setSignature(signature)
    }
  }

  const hundleVerifySignature = async()=>{
    if(web3Instance && signature && web3Instance.utils.sha3(message) != null){
      let [account] = await web3Instance.eth.getAccounts();
      let messageHash = web3Instance.utils.sha3(message) as string
      const result = web3Instance.eth.accounts.recover(messageHash, signature, true);
      console.log(result === account)
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
        <button onClick={()=> hundleVerifySignature()}>verify (web3.eth.sign)</button>
      </div>
      signed message: {signature}
    </div>
  );
}

export default App;
