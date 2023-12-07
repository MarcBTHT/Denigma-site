import { useState } from 'react'
import RectangleEnigma from '../assets/RectangleEnigma.svg'
import NFT2 from '../assets/NFT2.svg'
import Ellipse from '../assets/Ellipse.svg'
import Facebook from '../assets/Facebook.svg'
import LinkedIn from '../assets/LinkedIn.svg'
import twitter from '../assets/twitter.svg'
import RectangleAnswer from '../assets/RectangleAnswer.svg'
import RectangleEnterAnswer from '../assets/RectangleEnterAnswer.svg'
import RectangleBet from '../assets/RectangleBet.svg'
import RectangleConnect from '../assets/RectangleConnect.svg'
import billetDroit from '../assets/billetDroit.png'

import { ethers } from "ethers";
import { abi, contractAddress } from "../constants.js"

import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './page2.module.css'


function Page2() {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  // States for entering a bet
  const [betId, setBetId] = useState('');
  const [betChoice, setBetChoice] = useState(false); // true or false depending on the user's bet
  const [tokenId, setTokenId] = useState('');
  const [betDetails, setBetDetails] = useState(null);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" })
        setConnectionStatus('Connected'); // Update button text
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
      } catch (error) {
        console.log(error)
      }
    } else {
      setConnectionStatus('Please install MetaMask'); // Update button text
    }
  }
  const handleButtonClickFalse = () => {
    setBetChoice(false); // Set betChoice to false when this button is clicked
    enterBet(false); // Then call enterBet function
  };
  const handleButtonClickTrue = () => {
    setBetChoice(true); // Set betChoice to true when this button is clicked
    enterBet(true); // Then call enterBet function
  };
  async function enterBet(betC) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await contract.placeBet(betId, tokenId, betC);
      await tx.wait();
      console.log(`#########################`);
      console.log(`TokenId ${tokenId} entered bet ${betId} successfully and chose ${betC}`);

    } catch (error) {
      console.error('Error entering bet:', error);
    }
  }
  async function fetchBetDetails(betId) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);

      try {
        // Fetching the details of the bet using getBets function
        const betDetails = await contract.getBets(betId);
        const { expectedPrice, betTime, settleTime, participantTokenIdList, BetState } = betDetails;

        // Converting returned values to appropriate formats if necessary
        const formattedExpectedPrice = ethers.utils.formatUnits(expectedPrice, 'ether');
        const formattedBetTime = new Date(betTime * 1000).toLocaleString();
        const formattedSettleTime = new Date(settleTime * 1000).toLocaleString();
        const formattedBetState = BetState.toString();

        // Setting the state with the fetched bet details
        setBetDetails({
          expectedPrice: formattedExpectedPrice,
          betTime: formattedBetTime,
          settleTime: formattedSettleTime,
          participantTokenIdList,
          BetState: formattedBetState
        });

      } catch (error) {
        console.error('Error fetching bet details:', error);
      }
    } else {
      console.error('Ethereum object not found. Please install MetaMask.');
    }
  }
  return (
    <>

    </>
  )
}

export default Page2
