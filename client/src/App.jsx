import { useState,useEffect } from "react";
import Navigation from "./components/Navigation";
import Domain from "./components/Domain";
import Search from "./components/Search";
import abi from "./contract/EthDaddy.json"
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [state, setState] = useState({
    provider:"",
    signer:"",
    address:"",
    contract:""
  })
  const [account, setAccount] = useState(null)
  const [domains, setDomains] = useState([])

  const loadBlockchainData = async()=>{
    window.ethereum.on("chainChanged", ()=>{
      window.location.reload()
    })
    window.ethereum.on("accountsChanged", ()=>{
      window.location.reload()
    })
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask is not installed");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress()
      setAccount(address)
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // console.log(signer)

      setState({ provider, signer, contract,address });
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
    const maxSupply = await state.contract.maxSupply()
    const domains=[]
    for (let i = 9; i <= maxSupply; i++) {
      const domain = await state.contract.getDomain(i)
      domains.push(domain)

    }
    setDomains(domains)
    
  

}
useEffect(()=>{
  loadBlockchainData()
})

    

  
  return (
    <>
      <Navigation state={state} setAccount={setAccount} account ={account}/>
      <Search />
      <div className="cards__section">
        <h2 className="cards__title">Why you need a domain name.</h2>
        <p className="cards__description">
          Own your custom username, use it across services, and be able to store
          an avatar and other profile data.
        </p>

        <hr />
        <div className="cards">
          {domains.map((domain,key)=>(
            <Domain state={state} domain={domain} id={key+1}/>

          ))}
        </div>
      </div>
    </>
  );
}

export default App;
