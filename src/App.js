import './App.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  let [firstName, setwalletaddress] = useState("");
  let [lastName, setnftaddress] = useState("");
  let [username, setescrowAddress] = useState("");
  let [walletAddress, settype] = useState("");
  let [description, setnftDescription] = useState("");
  let [twitter, setnftName] = useState("");
  let [discord, setnftPrice] = useState("");
  let [youtube, setsocialLink] = useState("");
  let [website, setimagePath] = useState("");
  let [coverImage, setnfttype] = useState("");
  let [profileImage, setprofileimage] = useState("");

  const rpcProvider = new ethers.providers.JsonRpcProvider("https://sepolia.base.org/");
  const daiAddress = "0xb7A96EB11bde5cD61f68EAFD7BDc98661F0EA38C";
  const daiAbi = [
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "a",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "b",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "c",
                    "type": "uint256"
                }
            ],
            "name": "add",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "j",
                    "type": "uint256"
                }
            ],
            "name": "divide",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "a",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "b",
                    "type": "uint256"
                }
            ],
            "name": "multiply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "spr1",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "m",
                    "type": "uint256"
                }
            ],
            "name": "subtract",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        }
    ]
  ];
  const daiContract = new ethers.Contract(daiAddress, daiAbi, rpcProvider);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner("0x2a710aa131B569aB44b28348a56AB3b423FcA023");
      console.log("Account address:", await signer.getAddress());
    } else {
      console.error("MetaMask not found. Please install MetaMask.");
    }
  };

  const add = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = rpcProvider.getSigner("0x2a710aa131B569aB44b28348a56AB3b423FcA023");
    const signer = provider.getSigner();
    const daiContract = new ethers.Contract(daiAddress, daiAbi, signer);
    let addResult = await daiContract.add(1, 2);
    let addReceipt = await addResult.wait();
    // let sum = ethers.utils.formatUnits(await daiContract.sum(), 0);
    console.log("Transaction receipt:", addResult);
  };

  // const fun = async () => {
  //   // await createNFTDetailsFirebase(address, nftaddress, tokenid, type, descr, name, socialLink, imagePath, nfttype, profileimage)
  //   // await createprofileNewFirebase(address);
  //   await putbgImagebywalletNewFirebase(firstName, lastName, username, walletAddress, description, twitter, discord, youtube, website);
  // };

  const bal = async() => {
    let balance = ethers.utils.formatEther(await rpcProvider.getBalance("0x2a710aa131B569aB44b28348a56AB3b423FcA023"), 0);
    console.log("balance:", balance);

  }

  useEffect(() => {
    bal();
  }, []);

  return (
    <div className="App">
      {/* <h5>firstName</h5> : <input type='text' value={firstName} 
        onChange={(e) => setwalletaddress(e.target.value)}/>  <br/>

        <h5>lastName</h5> : <input type='text' value={lastName} 
        onChange={(e) => setnftaddress(e.target.value)}/> <br/>

        <h5>username</h5> : <input type='text' value={username} 
        onChange={(e) => setescrowAddress(e.target.value)}/> <br/>  

        <h5>walletAddress</h5> : <input type='text' value={walletAddress} 
        onChange={(e) => settype(e.target.value)}/> <br/>

        <h5>description</h5> : <input type='text' value={description} 
        onChange={(e) => setnftDescription(e.target.value)}/> <br/>

        <h5>twitter</h5> : <input type='text' value={twitter} 
        onChange={(e) => setnftName(e.target.value)}/>  <br/>

        <h5>discord</h5> : <input type='text' value={discord} 
        onChange={(e) => setnftPrice(e.target.value)}/>  <br/>

        <h5>youtube</h5> : <input type='text' value={youtube} 
        onChange={(e) => setsocialLink(e.target.value)}/> <br/>

        <h5>website</h5> : <input type='text' value={website} 
        onChange={(e) => setimagePath(e.target.value)}/> <br/>   */}

      {/* <h5>coverImage</h5> : <input type='text' value={coverImage} 
        onChange={(e) => setnfttype(e.target.value)}/> <br/>

        <h5>profileImage</h5> : <input type='text' value={profileImage} 
        onChange={(e) => setprofileimage(e.target.value)}/> <br/> */}

      {/* <button onClick={fun}>save data</button><br/> */}

      <button onClick={add}>add</button>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default App;
