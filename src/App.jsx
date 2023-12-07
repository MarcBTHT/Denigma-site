import { useState } from 'react'
import reactLogo from './assets/react.svg'
import NFT from './assets/NF.svg'
import NFTRose from './assets/NFTRose.svg'
import NFTBleu from './assets/NFTBleu.svg'
import Dollar from './assets/Dollar.svg'
import Facebook from './assets/Facebook.svg'
import Image from './assets/Image.svg'
import LinkedIn from './assets/LinkedIn.svg'
import twitter from './assets/twitter.svg'
import RectangleOrange from './assets/RectangleOrange.svg'
import RectangleBleu from './assets/RectangleBleu.svg'
import RectangleComing from './assets/RectangleComing.svg'
import RectangleEnter from './assets/RectangleEnter.svg'
import RectangleMathieu from './assets/RectangleMathieu.svg'
import RectangleEwan from './assets/RectangleEwan.svg'
import Step1 from './assets/Step1.svg'
import Step2 from './assets/Step2.svg'
import Step3 from './assets/Step3.svg'
import Line from './assets/Line 2.svg'
import view from './assets/vew.png'
import test from './assets/teest.jpg'
import billet from './assets/billet.png'
import TicketDroit from './assets/TicketDroit.png'
import TicketGauche from './assets/TicketGauche.png'
import winner1 from './assets/winner.png'
import RectangleConnect from './assets/RectangleConnect.svg'

import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js"



import './App.css'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './pages/page1.jsx';
import Page2 from './pages/page2.jsx';
import Page3 from './pages/page3.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected'); 
  const [raffleNumber, setRaffleNumber] = useState('');
  const [ethAmount, setEthAmount] = useState('');

  const lotterie = () => {
    // Scroll down 1000 pixels when the button is clicked, you can adjust the value as needed
    window.scrollTo({
      top: 950,
      behavior: 'smooth', // This adds a smooth scrolling effect
    });
  };
  const works = () => {
    // Scroll down 1000 pixels when the button is clicked, you can adjust the value as needed
    window.scrollTo({
      top: 2300,
      behavior: 'smooth', // This adds a smooth scrolling effect
    });
  };
  const winner = () => {
    // Scroll down 1000 pixels when the button is clicked, you can adjust the value as needed
    window.scrollTo({
      top: 3500,
      behavior: 'smooth', // This adds a smooth scrolling effect
    });
  };
  const top = () => {
    // Scroll down 1000 pixels when the button is clicked, you can adjust the value as needed
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This adds a smooth scrolling effect
    });
  };

  ///////////////// CONNECTION /////////////////////
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
  ///////////////// ENTER RAFFLE /////////////////////
  async function enterRaffle(raffleNumber, ethAmount) {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const transactionResponse = await contract.enterRaffle(raffleNumber, { value: ethers.utils.parseEther(ethAmount) });
            await provider.waitForTransaction(transactionResponse.hash);
                const playerAddress = await signer.getAddress();
                console.log('#########################');
                console.log(`Player with address ${playerAddress} entered raffle number: ${raffleNumber} with ${ethAmount} ETH`);
            } catch (error) {
                console.error(error);
        }
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<>
            <div className="slide-169-1">
              <div className="slide-169-1-child" />

              <div className="slide-169-1-item" />
              <div className="slide-169-1-inner" />
              <div className="slide-169-1-inner1" />
              <div className="slide-169-1-item1" />
 
              <b className="play-and-win">Begin your journey now</b> 
              <div className="top">
                <button className="denignma">Denigma</button>
                {/* <div className="lotterie">Lotterie</div> */}
                <div className="lotterie" onClick={lotterie}>Sweepstakes</div>
                <div className="how-i-works" onClick={works}>How it works</div>
                <div className="previous-winner" onClick={winner}>Previous winner</div>
                <Link to="/page1"><div className="my-account">my Account</div></Link>

              </div>
              <div className="bottom">
                <Link to="/"><div className="denigma" onClick={top}>denigma</div></Link>
                <Link to="/page1"><div className="my-account1" onClick={top}>my Account</div></Link>
                <Link to="/page2"><div className="play-lotterie" onClick={top}>Sweepstakes</div></Link>
                <img className="facebook-icon" alt="" src={Facebook} />
                <img className="twitter-icon" alt="" src={twitter} />
              </div>
              <div className="lotterie-wrapper">
                <b className="lotterie1">Sweepstakes</b>
              </div>
              <img
                className="cryptocurrency-1-icon"
                alt=""
                src={view}
              />
              <div className="lotterie2">
                {/* <div className="lotterie-child" /> LOTTERIE2 = raffleNumber 0 */}
                <button className="button" onClick={() => enterRaffle(0, "0.01")} >
                  <img className="button-child" alt="" src={RectangleBleu} />
                  <b className="enter">Enter</b>
                </button>
                <div className="eth">0.01 AVAX</div>
                <img
                  className="unsplashpvoepplw818-icon"
                  alt=""
                  src={TicketDroit}
                />
              </div>
              <div className="lotterie-wrapper">
              <button className="buttonPerso1" onClick={connect}>{connectionStatus} </button>
              </div>
              {/*
              <button className="button2">
                <img className="button-item" alt="" src={RectangleConnect} />
                <b className="connect">Connect</b>
              </button>*/}
              <div className="lotterie3">
                {/* <div className="lotterie-item" /> 
                <button className="button1">
                  <img className="button-item" alt="" src={RectangleComing} />
                  <b className="coming-soon">Coming soon</b>
                </button>*/}
                <div className="eth1">10 AVAX</div>
                <img
                  className="unsplashpvoepplw818-icon1"
                  alt=""
                  src={billet}
                />
              </div>
              <div className="lotterie4">
                {/* <div className="lotterie-child" /> LOTTERIE4 = raffleNumber 1 */}
                <button className="button" onClick={() => enterRaffle(1, "0.01")} >
                  <img className="button-child" alt="" src={RectangleBleu} />
                  <b className="enter">Enter</b>
                </button>
                <div className="eth">0.01 AVAX</div>
                <img
                  className="unsplashpvoepplw818-icon"
                  alt=""
                  src={TicketGauche}
                />
              </div>
              <button className="button3">
                <img className="rectangle-icon" alt="" src={RectangleOrange} />
                <b className="discover" onClick={lotterie}>Discover</b>
              </button>
              <div className="denigma-is-the">
                Get involved in vibrant communities, have fun and make an impact.
                                Embark, Evolve, Conquer!
              </div>
              <div className="previous-winner1">
                <div className="lotterie5">
                  {/* <div className="rectangle-div" /> */}
                  <button className="button4">
                    <img className="button-child1" alt="" src={RectangleEwan} />
                    <img className="winner-icon1" alt="" src={winner1} />
                    <b className="ewan">0xdf9...093</b>
                  </button>
                  <div className="lotterie-002">Sweepstakes #002</div>
                </div>
                <div className="lotterie6">
                  {/* <div className="lotterie-child1" /> */}
                  <button className="button4">
                    <img className="button-child1" alt="" src={RectangleMathieu} />
                    <img className="winner-icon2" alt="" src={winner1} />
                    <b className="ewan">0xc29...aAf</b>
                  </button>
                  <div className="lotterie-002">Sweepstakes #001</div>
                </div>
                <div className="lotterie7">
                  {/* <div className="lotterie-child1" /> */}
                  <button className="button4">
                    <img className="button-child1" alt="" src={RectangleMathieu} />
                    <img className="winner-icon3" alt="" src={winner1} />
                    <b className="ewan">0xf39...266</b>
                  </button>
                  <div className="lotterie-002">Sweepstakes #003</div>
                </div>
                <b className="previous-winners">Previous winners</b>
              </div>
              <div className="how-it-works">
                <button className="button7">
                  <img className="button-child4" alt="" src={RectangleBleu} />
                  <Link to="/page1"><div className="discover1" onClick={top}>Discover</div></Link>
                </button>
                <b className="start-your-journey">Start your journey with Denigma</b>
                <img className="nft-4-icon" alt="" src={Step1} />
                <img className="mint-hammer-icon" alt="" src={Step2} />
                <img className="money-bag-icon" alt="" src={Step3} />
                <img className="how-it-works-child" alt="" src={Line} />
                <img className="how-it-works-item" alt="" src={Line} />
                <div className="how-it-works-inner" />
                <div className="ellipse-div" />
                <div className="how-it-works-child1" />
                <div className="how-it-works-child2" />
                <div className="step-1">Step 1</div>
                <div className="step-2">Step 2</div>
                <div className="step-3">Step 3</div>
                <div className="enter-a-lotterie">Enter a Sweepstakes or buy an NFT</div>
                <div className="answer-some-enigmas">
                  Take part in quests to improve your NFT.
                </div>
                <div className="discover-if-you">Find out if you've triumphed</div>
              </div>
            </div>
          </>} />
          <Route exact path="/page1" element={<Page1 />} />
          <Route exact path="/page2" element={<Page2 />} />
          <Route exact path="/page3" element={<Page3 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
