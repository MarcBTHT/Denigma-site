import { useState } from 'react'
import Facebook from '../assets/Facebook.svg'
import twitter from '../assets/twitter.svg'
import LinkedIn from '../assets/LinkedIn.svg'
import Image from '../assets/vew.png'
import RectangleBet from '../assets/RectangleBet.svg'
import RectangleConnect from '../assets/RectangleConnect.svg'

import { ethers } from "ethers";
import { abi, contractAddress } from "../constants.js"

import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './page3.module.css'


function Page3() {
  const [count, setCount] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [entranceFee, setEntranceFee] = useState('');
  const [interval, setInterval] = useState('');
  const [raffleNumber, setRaffleNumber] = useState('');
  const [ethAmount, setEthAmount] = useState('');

  // States for bet creation
  const [expectedPrice, setExpectedPrice] = useState('');
  const [settleTime, setSettleTime] = useState('');

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

  async function createRaffle() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        await contract.createRaffle(ethers.utils.parseEther(entranceFee), interval);
        console.log(`Sweepstake created with entrance fee: ${entranceFee} ETH and interval: ${interval}`);
      } catch (error) {
        console.error(error);
      }
    }
  }
  async function createBet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await contract.createBet(ethers.utils.parseEther(expectedPrice), settleTime);
      await tx.wait();
      const playerAddress = await signer.getAddress();
      console.log('#########################');
      console.log(`Bet created successfully by ${playerAddress} with an expectedPrice of ${expectedPrice} $ in ${settleTime} seconds`);
    } catch (error) {
      console.error('Error creating bet:', error);
    }
  }
  return (
    <>
      <div className={styles['slide-169-4']}>
                <div className={styles['slide-169-4-child']} />
                <div className={styles['slide-169-4-item']} />
                <div className={styles['slide-169-4-inner']} />
                <b className={styles['admin']}>Admin</b>
                <div className={styles['bottom']}>
                    <Link to="/"><div className={styles['denigma']} onClick={top}>denigma</div></Link>
                    <Link to="/page2"><div className={styles['play-lotterie']} onClick={top}>Sweepstakes</div></Link>
                    <Link to="/page1"><div className={styles['my-account']} onClick={top}>My account</div></Link>
                    <img className={styles['facebook-icon']} alt="" src={Facebook} />
                    <img className={styles['twitter-icon']} alt="" src={twitter} />
                    <img className={styles['group-icon']} alt="" src={LinkedIn} />
                </div>
                <div className={styles['enigma']}>
                    <b className={styles['create-raffle']}>Create Sweepstake</b>
                </div>
                {/* INPUT ENTRANCE FEE CREATE RAFFLE*/}
                <div className={styles['email-grou']}>
                    <div className={styles['email-grou-child']} />
                    <input
                        className={styles['entrance-fee']}
                        type="text"
                        placeholder="Entrance Fee in ETH"
                        value={entranceFee}
                        onChange={(e) => setEntranceFee(e.target.value)}
                    />
                </div>
                {/* INPUT ENTRANCE FEE CREATE BET */}
                <div className={styles['email-grou1']}>
                    <div className={styles['email-grou-child']} />
                    <input
                        className={styles['entrance-fee']}
                        type="text"
                        placeholder="Expected Price"
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value)}
                    />
                </div>
                {/* INPUT INTERVAL CREATE RAFFLE*/}
                <div className={styles['email-grou2']}>
                    <div className={styles['email-grou-child']} />
                    <input
                        className={styles['entrance-fee']}
                        type="text"
                        placeholder="Interval in seconds"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                    />
                </div>
                {/* INPUT INTERVAL CREATE BET*/}
                <div className={styles['email-grou3']}>
                    <div className={styles['email-grou-child']} />
                    <input
                        className={styles['entrance-fee']}
                        type="text"
                        placeholder="Settle Time in seconds"
                        value={settleTime}
                        onChange={(e) => setSettleTime(e.target.value)}
                    />
                </div>
                <b className={styles['create-bet']}>Create Bet</b>
                {/* Button CREATE Raffle*/}
                <button className={styles['button']} onClick={createRaffle}>
                    <img className={styles['button-child']} alt="" src={RectangleBet} />
                    <b className={styles['bet']}>Create Sweep</b>
                </button>
                {/* Button CREATE BET*/}
                <button className={styles['button1']} onClick={createBet}>
                    <img className={styles['button-child']} alt="" src={RectangleBet} />
                    <div className={styles['bet1']}>Create BET</div>
                </button>
                <img
                    className={styles['unsplashpvoepplw818-icon']}
                    alt=""
                    src={Image}
                />
                <div className={styles['top']}>
                    <Link to="/"><div className="denignma">Denignma</div></Link>
                    <button className={styles['button2']} onClick={connect}>
                        <img className={styles['button-inner']} alt="" src={RectangleConnect} />
                        <b className={styles['connect']}>Connect</b>
                    </button>
                </div>
            </div>
    </>
  )
}

export default Page3
