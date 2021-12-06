import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';
// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
//2VJxgDyy1xEo8HXNNMCoc8K32bqTayNUFgV7wY8ikMw9
const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if(solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Phantom wallet is connected ', response.publicKey.toString());
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        console.log('Make sure you have connected phatom wallet');
      }
    } catch(error) {
      console.log('Error:', error);
    }
  }

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Phantom wallet connected ',
      response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderConnectWallet = () => (
    <button className="cta-button connect-wallet-button"
    onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  });

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼️ AI Art NFT drop</p>
          <p className="sub-text">Limited edition AI generated Art NFTs</p>
          { !walletAddress && renderConnectWallet() }
          {/* Check for walletAddress and then pass in walletAddress */}
         {walletAddress && <CandyMachine walletAddress={window.solana} />}
        </div>
        <div className="footer-container">
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default App;
