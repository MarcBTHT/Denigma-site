import { useState } from 'react'
import RectangleEnigma from '../assets/RectangleEnigma.svg'
import NFT2 from '../assets/NFT2.svg'
import Facebook from '../assets/Facebook.svg'
import LinkedIn from '../assets/LinkedIn.svg'
import twitter from '../assets/twitter.svg'
import RectangleConnect from '../assets/RectangleConnect.svg'
import NFT from '../assets/Cryptocurrency.svg'
import RectangleSetPrice from '../assets/RectangleSetPrice.svg'

import { ethers } from "ethers";
import { abi, contractAddress } from "../constants.js"

import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './page1.module.css'


function Page1() {
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');

    const [tokenId, setTokenId] = useState('');
    // State for the first token
    const [token1Score, setToken1Score] = useState('');
    const [token1Image, setToken1Image] = useState(null);
    const [token1Name, setToken1Name] = useState('');
    // State for the second token
    const [token2Image, setToken2Image] = useState('');
    const [token2Name, setToken2Name] = useState('');
    const [token2Score, setToken2Score] = useState('');
    // State for the third token
    const [token3Image, setToken3Image] = useState('');
    const [token3Name, setToken3Name] = useState('');
    const [token3Score, setToken3Score] = useState('');
    // State for the four token
    const [token4Image, setToken4Image] = useState('');
    const [token4Name, setToken4Name] = useState('');
    const [token4Score, setToken4Score] = useState('');



    const [fetchedPrice, setFetchedPrice] = useState('');

    const [price, setPrice] = useState('');
    const [ethAmount, setEthAmount] = useState('');

    const top = () => {
        // Scroll down 1000 pixels when the button is clicked, you can adjust the value as needed
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // This adds a smooth scrolling effect
        });
    };
    const handleTokenIdChange = (e) => {
        setTokenId(e.target.value);
    };

    // Function to handle changes in the price input
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    // Function to set the NFT price, triggered by a button click
    const handleSetNFTPrice = async (tokenId) => {
        await setNFTPrice(tokenId, price);
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

    //DISPLAY NFT
    async function fetchTokenURI(tokenId, tokenNumber) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const uri = await contract.tokenURI(tokenId);
            fetchTokenDetails(uri, tokenNumber);
        } catch (error) {
            console.error('Error fetching token URI:', error);
        }
    }
    async function fetchTokenDetails(uri, tokenNumber) {
        try {
            const response = await fetch(uri);
            const metadata = await response.json();
            if (tokenNumber === 1) {
                setToken1Image(metadata.image);
                setToken1Name(metadata.name);
                setToken1Score(metadata.score);
            } else if (tokenNumber === 2) {
                setToken2Image(metadata.image);
                setToken2Name(metadata.name);
                setToken2Score(metadata.score);
            } else if (tokenNumber === 3) {
                setToken3Image(metadata.image);
                setToken3Name(metadata.name);
                setToken3Score(metadata.score);
            } else if (tokenNumber === 4) {
                setToken4Image(metadata.image);
                setToken4Name(metadata.name);
                setToken4Score(metadata.score);
            }
        } catch (error) {
            console.error('Error fetching token details:', error);
        }
    }
    async function setNFTPrice(tokenId, price) {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            try {
                const signerAddress = await signer.getAddress();
                const transactionResponse = await contract.setPrice(tokenId, ethers.utils.parseEther(price));
                await provider.waitForTransaction(transactionResponse.hash);
                console.log(`${signerAddress} set the price for Token ID ${tokenId}. Price: ${price} ETH`);
            } catch (error) {
                console.error(error);
            }
        }
    }
    async function removeTokenFromSale(tokenId) {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            try {
                const transactionResponse = await contract.removeTokenSale(tokenId);
                await provider.waitForTransaction(transactionResponse.hash);
                console.log(`Token ID ${tokenId} removed from sale.`);
            } catch (error) {
                console.error(error);
            }
        }
    }
    async function fetchPrice(tokenId) {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);

            try {
                const price = await contract.getPrice(tokenId);
                setFetchedPrice(ethers.utils.formatEther(price));
                console.log(`Price for Token ID ${tokenId}: ${price} Wei`);
            } catch (error) {
                console.error(error);
            }
        }
    }
    async function buyToken(tokenId, ethAmount) {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            try {
                const signerAddress = await signer.getAddress();
                const transactionResponse = await contract.buyToken(tokenId, { value: ethers.utils.parseEther(ethAmount) });
                await provider.waitForTransaction(transactionResponse.hash);
                console.log(`Token ID ${tokenId} purchased by ${signerAddress} for ${ethAmount} ETH. Transaction hash: ${transactionResponse.hash}`);
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <>
            <div className={styles['slide-169-2']}>
                <div className={styles['slide-169-2-child']} />
                <div className={styles['slide-169-2-item']} />
                <div className={styles['slide-169-2-inner']} />
                <b className={styles['dashboard']}>Dashboard</b>
                <div className={styles['top']}>
                    <Link to="/"><div className="denignma">Denignma</div></Link>
                    <b className={styles['my-account']}>My Account</b>
                    <button className={styles['button']} onClick={connect}>
                        <img className={styles['button-child']} alt="" src={RectangleConnect} />
                        <b className={styles['connect']}>Connect</b>
                    </button>
                </div>
                <div className={styles['bottom']}>
                    <Link to="/"><div className={styles['denigma']} onClick={top}>denigma</div></Link>
                    <Link to="/page2"><div className={styles['play-lotterie']} onClick={top}>Sweepstakes</div></Link>
                    <img className={styles['facebook-icon']} alt="" src={Facebook} />
                    <img className={styles['twitter-icon']} alt="" src={twitter} />
                    <img className={styles['group-icon']} alt="" src={LinkedIn} />
                </div>
                <div className={styles['raffle']}>
                    {/*!!!!!!!!!!!!!!!!!!!!!NFT 1!!!!!!!!!!!!!!!!!!!!!!!*/}
                    <div className={styles['lotterie']}>
                        <button className={styles['buttonPerso2']} onClick={() => fetchTokenURI(0, 1)}>Fetch Details</button>
                        {/* Display the token details here */}
                        <img src={token1Image} alt={token1Name} className={styles['tokenImage']} />
                        <div>
                            {/* Overlay Content */}
                            <div className={styles['token-details']}>
                                {token1Name && <p>Name: {token1Name}</p>}
                                {token1Score && <p>Score: {token1Score}</p>}
                            </div>
                        </div>

                        <div className={styles['lotterie-child']} />
                        <div className={styles['answer']}>
                            <div className={styles["email-grou"]}>
                                <div className={styles["email-grou-child"]} />
                                <input
                                    className={styles["select-price"]}
                                    placeholder="Price in AVAX"
                                    type="text"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <button onClick={() => handleSetNFTPrice(0)} className={styles["button1"]}>
                                <img className={styles["button-item"]} alt="" src={RectangleSetPrice} />
                                <div className={styles['sell']}>SELL</div>
                            </button>
                        </div>
                        <div className={styles['answer1']}>
                            <div className={styles['button3']} onClick={() => removeTokenFromSale(0)}>
                                <img className={styles['button-item']} alt="" src={RectangleSetPrice} />
                                <div className={styles['remove-sell']}>Remove Sale</div>
                            </div>
                        </div>
                    </div>
                    {/*!!!!!!!!!!!!!!!!!!!!!NFT 2!!!!!!!!!!!!!!!!!!!!!!!*/}
                    <div className={styles['lotterie1']}>
                        <button className={styles['buttonPerso3']} onClick={() => fetchTokenURI(1, 2)}>Fetch Details</button>
                        {/* Display the token details here */}
                        <img src={token2Image} alt={token2Name} className={styles['tokenImage2']} />
                        <div>
                            {/* Overlay Content */}
                            <div className={styles['token-details2']}>
                                {token2Name && <p>Name: {token2Name}</p>}
                                {token2Score && <p>Score: {token2Score}</p>}
                            </div>
                        </div>
                        <div className={styles['lotterie-item']} />
                        <div className={styles['answer']}>
                            <div className={styles["email-grou"]}>
                                <div className={styles["email-grou-child"]} />
                                <input
                                    className={styles["select-price"]}
                                    placeholder="Price in AVAX"
                                    type="text"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <button onClick={() => handleSetNFTPrice(1)} className={styles["button1"]}> {/*TOKEN URI 1 The best is to do a loop to see all the */}
                                <img className={styles["button-item"]} alt="" src={RectangleSetPrice} />
                                <div className={styles['sell']}>SELL</div>
                            </button>
                        </div>
                        <div className={styles['answer1']}>
                            <div className={styles['button3']} onClick={() => removeTokenFromSale(1)}>
                                <img className={styles['button-item']} alt="" src={RectangleSetPrice} />
                                <div className={styles['remove-sell']}>Remove Sale</div>
                            </div>
                        </div>
                    </div>
                    <button className={styles['button4']}>
                        <img className={styles['button-child1']} alt="" src={RectangleEnigma} />
                        <Link to="/page2"><b className={styles['answer-enigmas']} onClick={top}>Interact</b></Link>
                    </button>
                    <b className={styles['raffle-1']}>Sweepstake 1</b>
                </div>
                <div className={styles['raffle1']}>
                    {/*!!!!!!!!!!!!!!!!!!!!!NFT 3!!!!!!!!!!!!!!!!!!!!!!!*/}
                    <div className={styles['lotterie2']}>
                        <button className={styles['buttonPerso3']} onClick={() => fetchTokenURI(2, 3)}>Fetch Details</button>
                        {/* Display the token details here */}
                        <img src={token3Image} alt={token3Name} className={styles['tokenImage3']} />
                        <div>
                            {/* Overlay Content */}
                            <div className={styles['token-details3']}>
                                {token3Name && <p>Name: {token3Name}</p>}
                                {token3Score && <p>Score: {token3Score}</p>}
                            </div>
                        </div>


                        <div className={styles['lotterie-inner']} />
                        <div className={styles['answer']}>
                            <div className={styles["email-grou"]}>
                                <div className={styles["email-grou-childbis"]} />
                                <input
                                    className={styles["select-price"]}
                                    placeholder="Price in AVAX"
                                    type="text"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <button onClick={() => handleSetNFTPrice(2)} className={styles["button1"]}>
                                <img className={styles["button-itembis"]} alt="" src={RectangleSetPrice} />
                                <div className={styles['sell']}>SELL</div>
                            </button>
                        </div>
                        <div className={styles['answer1bis']}>
                            <div className={styles['button3']} onClick={() => removeTokenFromSale(2)}>
                                <img className={styles['button-item']} alt="" src={RectangleSetPrice} />
                                <div className={styles['remove-sell']}>Remove Sale</div>
                            </div>
                        </div>
                    </div>
                    {/*!!!!!!!!!!!!!!!!!!!!!NFT 4!!!!!!!!!!!!!!!!!!!!!!!*/}
                    <div className={styles['lotterie3']}>
                        <button className={styles['buttonPerso3']} onClick={() => fetchTokenURI(3, 4)}>Fetch Details</button>
                        {/* Display the token details here */}
                        <img src={token4Image} alt={token4Name} className={styles['tokenImage4']} />
                        <div>
                            {/* Overlay Content */}
                            <div className={styles['token-details4']}>
                                {token4Name && <p>Name: {token4Name}</p>}
                                {token4Score && <p>Score: {token4Score}</p>}
                            </div>
                        </div>


                        <div className={styles['rectangle-div']} />
                        <div className={styles['answer']}>
                            <div className={styles["email-grou"]}>
                                <div className={styles["email-grou-child"]} />
                                <input
                                    className={styles["select-price"]}
                                    placeholder="Price in AVAX"
                                    type="text"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <button onClick={() => handleSetNFTPrice(3)} className={styles["button1"]}> {/*TOKEN URI 1 The best is to do a loop to see all the */}
                                <img className={styles["button-item"]} alt="" src={RectangleSetPrice} />
                                <div className={styles['sell']}>SELL</div>
                            </button>
                        </div>
                        <div className={styles['answer1']}>
                            <div className={styles['button3']} onClick={() => removeTokenFromSale(3)}>
                                <img className={styles['button-item']} alt="" src={RectangleSetPrice} />
                                <div className={styles['remove-sell']}>Remove Sale</div>
                            </div>
                        </div>
                    </div>

                    <button className={styles['button5']}>
                        <img className={styles['button-child1']} alt="" src={RectangleEnigma} />
                        <Link to="/page2"><b className={styles['answer-enigmas']} onClick={top}>Interact</b></Link>
                    </button>
                    <b className={styles['raffle-2']}>Sweepstake 2</b>
                </div>

                <b className={styles['buy-tokens']}>Buy tokens</b>
                <div className={styles['answer2']}>
                    <div className={styles['email-grou2']}>
                        <div className={styles['email-grou-inner']} />
                        <input
                            className={styles['tokenid']}
                            placeholder="Token ID"
                            type="text"
                            value={tokenId}
                            onChange={(e) => setTokenId(e.target.value)} />
                    </div>
                    <div className={styles['email-grou3']}>
                        <div className={styles['email-grou-inner']} />
                        <input
                            className={styles['tokenid']}
                            placeholder="Amount AVAX"
                            type="text"
                            value={ethAmount}
                            onChange={(e) => setEthAmount(e.target.value)} />
                    </div>

                    <div className={styles['email-grou4']}> {/*With button 7*/}
                        <div className={styles['email-grou-inner']} />
                        <input type="number" className={styles['tokenid']} placeholder="Token ID"
                            value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
                    </div>
                    {/*BUTTON BUY*/}
                    <button
                        className={styles['button6']}
                        onClick={() => buyToken(tokenId, ethAmount)}>
                        <img className={styles['button-item']} alt="" src={RectangleSetPrice} />
                        <div className={styles['buy']}>Buy</div>
                    </button>

                    {/*BUTTON FETCHPRICE*/}
                    <button className={styles['button7']} onClick={() => fetchPrice(tokenId)} >
                        <img className={styles['button-item']} alt="" src={RectangleSetPrice} />
                        <div className={styles['fetch-price']}>Fetch Price</div>
                    </button>
                    {fetchedPrice && <p className={styles['price-label']}>Price: {fetchedPrice} AVAX</p>}
                </div>
                <img className={styles['cryptocurrency-1-icon']} alt="" src={NFT} />
            </div>
        </>
    )
}

export default Page1
