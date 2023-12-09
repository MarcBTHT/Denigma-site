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
import { abi_Chainlink, contractAddress_chainlink } from "../constants_ChainFunctions.js";


import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './page2.module.css'

import { keccak256 } from 'js-sha3';


function Page2() {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  // States for entering a bet
  const [betId, setBetId] = useState('');
  const [betChoice, setBetChoice] = useState(false); // true or false depending on the user's bet
  const [tokenId, setTokenId] = useState('');
  const [betDetails, setBetDetails] = useState(null);
  const [enigmaAnswer, setEnigmaAnswer] = useState(''); // For the answer to the enigma

  const top = () => {
    // Scroll down 1000 pixels when the button is clicked, you can adjust the value as needed
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This adds a smooth scrolling effect
    });
  };

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
  /// ENGIMA ///
  function handleSubmitAnswer() {
    const hashedAnswer = keccak256(enigmaAnswer);
    verifyAnswerHash(hashedAnswer);
  }
  async function verifyAnswerHash(hashedAnswer) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress_chainlink, abi_Chainlink, provider);

      try {
        // Convert the hashed answer to a bytes32 format
        const bytes32Hash = ethers.utils.arrayify('0x' + hashedAnswer);
            
        const isCorrect = await contract.verifyHash(bytes32Hash);
        console.log(isCorrect); // true or false

        if (isCorrect) {
          // If the answer is correct, update the score in the dNFT contract
          await updateEnigmaScore(tokenId, isCorrect);
        }
        else {
          console.log(`Score not updated wrong answer for tokenId ${tokenId}`);
        }

      } catch (error) {
        console.error('Error verifying answer:', error);
      }
    } else {
      console.error('Ethereum object not found. Please install MetaMask.');
    }
  }
  async function updateEnigmaScore(tokenId, isCorrect) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const dNFTContract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await dNFTContract.updateEnigmaScore(tokenId, isCorrect);
      await tx.wait();
      console.log(`Score updated for tokenId ${tokenId}`);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  }

  return (
    <>
      <div className={styles['slide-169-3']}>
        <div className={styles['slide-169-3-child']} />
        <div className={styles['slide-169-3-item']} />
        <div className={styles['slide-169-3-inner']} />
        <b className={styles['lotterie-001']}>Sweepstake #001</b>
        <div className={styles['bottom']}>
          <Link to="/"><div className={styles['denigma']} onClick={top}>denigma</div></Link>
          <Link to="/page1"><div className={styles['my-account']} onClick={top}>My account</div></Link>
          <Link to="/page3"><div className={styles['admin']} onClick={top}>admin</div></Link>

          <div className={styles['play-lotterie']}>Sweepstakes</div>
          <img className={styles['facebook-icon']} alt="" src={Facebook} />
          <img className={styles['twitter-icon']} alt="" src={twitter} />
          <img className={styles['group-icon']} alt="" src={LinkedIn} />
        </div>
        <div className={styles['enigma']}>
          <b className={styles['enigma1']}>Enigma</b>
          <div className={styles['i-am-a-container']}>
            <span className={styles['i-am-a-container1']}>
              {/* ... (Votre contenu JSX pour i-am-a-container1) */}
              <p className={styles["i-am-a"]}>I am a five-letter word that can be both</p>
              <p className={styles["i-am-a"]}>a verb and a noun,</p>
              <p className={styles["i-am-a"]}>and I'm often seen around the house</p>
              <p className={styles["i-am-a"]}>Who I am ?</p>
            </span>
          </div>
          <div className={styles['i-am-a-container2']}>
            <span className={styles['i-am-a-container1']}>
              {/* ... (Votre contenu JSX pour i-am-a-container1) */}
              <p className={styles["i-am-a"]}>I am a digital ledger, secure and true,</p>
              <p className={styles["i-am-a"]}>Blocks of data, in a chain I accrue.</p>
              <p className={styles["i-am-a"]}>Decentralized and encrypted, what am I?</p>
              <p className={styles["i-am-a"]}>A technology that makes transactions fly.</p>
            </span>
          </div>
          <input
            className={styles['tokenid_Answer']}
            placeholder="Token ID"
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <div className={styles['answer']}>
            <div className={styles['email-grou']}>
              <div className={styles['email-grou-child']} />
              <input
                className={styles['enter-answer']}
                placeholder="Enter answer"
                type="text"
                value={enigmaAnswer} 
                onChange={(e) => setEnigmaAnswer(e.target.value)}
              />
            </div>
            <button className={styles['vector-parent']} onClick={handleSubmitAnswer} 
            >
              <img className={styles['frame-child']} alt="" src={RectangleAnswer} />
              <div className={styles['answer1']}>Answer</div>
            </button>
          </div>
          <input
            className={styles['tokenid_Answer2']}
            placeholder="Token ID"
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <div className={styles['answer2']}>
            <div className={styles['email-grou']}>
              <div className={styles['email-grou-child']} />
              <input
                className={styles['enter-answer']}
                placeholder="Enter answer"
                type="text"
              />
            </div>
            <button className={styles['vector-parent']}>
              <img className={styles['frame-child']} alt="" src={RectangleAnswer} />
              <div className={styles['answer1']}>Answer</div>
            </button>
          </div>
          {/* ... (Votre contenu JSX pour numro et numro1) */}
          <div className={styles["numro"]}>
            <div className={styles["numro-child"]} />
            <div className={styles["div"]}>1</div>
          </div>
          <div className={styles["numro1"]}>
            <div className={styles["numro-child"]} />
            <div className={styles["div1"]}>2</div>
          </div>
        </div>
        {/* UI for entering a bet */}
        <div className={styles['email-grou2']}>
          <div className={styles['email-grou-inner']} />
          <input className={styles['tokenid']} placeholder="BetID" type="number"
            value={betId}
            onChange={(e) => setBetId(e.target.value)} />
        </div>
        <div className={styles['email-grou3']}>
          <div className={styles['email-grou-inner']} />
          <input className={styles['tokenid']} placeholder="BetID" type="number"
            value={betId}
            onChange={(e) => setBetId(e.target.value)} />
        </div>
        <div className={styles['email-grou4']}>
          <div className={styles['email-grou-inner']} />
          <input className={styles['tokenid']} placeholder="TokenId" type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)} />
        </div>
        <div className={styles['email-grou5']}>
          <div className={styles['email-grou-inner']} />
          <input className={styles['tokenid']} placeholder="TkenId" type="number"
            value={tokenId}
            onChange={(e) => setBetId(e.target.value)} />
        </div>

        <b className={styles['bets']}>Bets</b>
        <div className={styles['numro2']}>
          <div className={styles['numro-child']} />
          <div className={styles['div']}>1</div>
        </div>

        <div className={styles['btc']}>BTC</div>
        <div className={styles['line-div']} />
        <div className={styles['in-1-week']}>45.000$ in 1 week</div>
        <div className={styles['in-1-week1']}>35.000$ in 1 week</div>

        <button className={styles['button']} onClick={handleButtonClickTrue}>
          <img className={styles['button-child']} alt="" src={RectangleBet} />
          <b className={styles['bet']}>BET</b>
        </button>
        <button className={styles['button2']} onClick={handleButtonClickFalse} >
          <img className={styles['button-child']} alt="" src={RectangleBet} />
          <b className={styles['bet']}>BET</b>
        </button>



        {/* UI for fetching bet details */}
        <div className={styles['container']}>
          <input className={styles['inputbet']}
            type="number"
            placeholder="Bet ID"
            value={betId}
            onChange={(e) => setBetId(e.target.value)}
          />
          <button className={styles['button1']} onClick={() => fetchBetDetails(betId)}>
            <img className={styles['button-child']} alt="" src={RectangleBet} />
            <b className={styles['bet']}>Details</b>
          </button>
          {betDetails && (
            <div className={styles['bet-details']}>
              <p>Expected Price: ${betDetails.expectedPrice} BTC</p>
              <p>Bet Time: {betDetails.betTime}</p>
              <p>Settle Time: {betDetails.settleTime}</p>
              <p>Participant Token IDs: {betDetails.participantTokenIdList.join(', ')}</p>
              <p>Bet State: {betDetails.BetState}</p>
            </div>
          )}
        </div>

        <b className={styles['stack-tokens']}>Stack tokens</b>
        <div className={styles['numro3']}>
          <div className={styles['numro-child']} />
          <div className={styles['div']}>1</div>
        </div>
        <div className={styles['total-stacked']}>total stacked</div>
        <div className={styles['div4']}>0</div>

        <img
          className={styles['unsplashpvoepplw818-icon']}
          alt=""
          src={billetDroit}
        />
        <div className={styles['top']}>
          <Link to="/"><div className={styles['denignma']}>Denignma</div></Link>
          <Link to="/page1"><div className={styles['my-account1']}>my Account</div></Link>

          <button className={styles['button3']} onClick={connect}>
            <img className={styles['rectangle-icon']} alt="" src={RectangleConnect} />
            <b className={styles['connect']}>Connect</b>
          </button>
        </div>
      </div>
    </>
  )
}

export default Page2
