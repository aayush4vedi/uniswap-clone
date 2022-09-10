## [Project#1] Build Uniswap Clone✅

### Resources:

- Followed from YT **[Build Uniswap Blockchain Web 3.0 App with Solidity | Next.js | Sanity.io ($100 Crypto Giveaway)](https://www.youtube.com/watch?v=xXxjRzdYIss&ab_channel=CleverProgrammer)**
    - This guy is inspired from JavaScript Mastery’s [YT] **[Build and Deploy a Modern Web 3.0 Blockchain App | Solidity, Smart Contracts, Crypto](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&ab_channel=JavaScriptMastery)**
- [Sanity.io](http://Sanity.io) → [docs](https://www.sanity.io/docs/js-client)

### Steps, Notes & Code

1. Initialize nextJs app with TailwindCSS
    
    ```jsx
    ❯ yarn create next-app -e with-tailwindcss client
    ```
    
2. Create other two directories such that the structure looks like this
    
    ```jsx
    /client       |  Next App
    /contracts    |  Solidity
    /studio       |  Sanity
    ```
    
- 3. **Build `/client`**
    - Start dummy next app with: `$ yarn dev`
    - Create components `/components`
        - `Header.js`
            
            ```jsx
            import { useState } from "react";
            import { useContext } from "react";
            
            import Image from "next/image";
            
            import { FiArrowUpRight } from "react-icons/fi";
            import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
            import { AiOutlineDown } from "react-icons/ai";
            
            import { TransactionContext } from "../context/TransactionContext";
            
            import uniswapLogo from "../assets/uniswap.png";
            import ethCurrency from "../assets/eth-currency.png";
            import ethLogo from "../assets/eth-logo.png";
            
            //styles
            const style = {
              wrapper: `p-4 w-screen flex justify-between items-center`,
              headerLogo: `flex w-1/4 items-center justify-start`,
              nav: `flex-1 flex justify-center items-center invisible md:visible`,
              navContainer: `flex bg-[#191B1F] rounded-3xl`,
              navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
              activeNavItem: `bg-[#20242A]`,
              walletSection: `flex w-1/4 justify-end items-center`,
              button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2`,
              buttonIconContainer: `flex items-center justify-center w-8 h-8`,
              buttonTextContainer: `h-8 flex items-center`,
              buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA] min-w-[8rem] min-h-[2.5rem]`,
            };
            
            const Header = () => {
              const [selectedNav, setSelectedNav] = useState("swap"); // swap, pool, vote, charts
              const { connectWallet, currentAccount } = useContext(TransactionContext);
            
              return (
                <div className={style.wrapper}>
                  <div className={style.headerLogo}>
                    <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />
                  </div>
            
                  {/*======================== navbar section ==================================== */}
                  <div className={style.nav}>
                    <div className={style.navContainer}>
                      <div
                        className={`${style.navItem} ${
                          selectedNav === "swap" && style.activeNavItem
                        }`}
                        onClick={() => setSelectedNav("swap")}
                      >
                        Swap
                      </div>
                      <div
                        className={`${style.navItem} ${
                          selectedNav === "pool" && style.activeNavItem
                        }`}
                        onClick={() => setSelectedNav("pool")}
                      >
                        Pool
                      </div>
                      <div
                        className={`${style.navItem} ${
                          selectedNav === "vote" && style.activeNavItem
                        }`}
                        onClick={() => setSelectedNav("vote")}
                      >
                        Swap
                      </div>
                      <a
                        href="https://info.uniswap.org/#/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className={style.navItem}>
                          Charts <FiArrowUpRight />
                        </div>
                      </a>
                    </div>
                  </div>
            
                  {/*======================== wallet section ==================================== */}
                  <div className={style.walletSection}>
                    <div className={style.button}>
                      <div className={style.buttonIconContainer}>
                        <Image src={ethLogo} alt="eth logo" height={20} width={20} />
                      </div>
                      <p>Ethereum</p>
                      <div className={style.buttonIconContainer}>
                        <AiOutlineDown />
                      </div>
                    </div>
            
                    {currentAccount ? (
                      <div className={`${style.button} ${style.buttonPadding}`}>
                        <div className={style.buttonTextContainer}>{"userName"}</div>
                      </div>
                    ) : (
                      <div
                        onClick={() => connectWallet()}
                        className={`${style.button} p-1`}
                      >
                        <div className={style.buttonAccent}>Connect Wallet</div>
                      </div>
                    )}
            
                    <div className={`${style.button}`}>
                      <div className={`${style.buttonIconContainer} stroke-1`}>
                        <HiOutlineDotsHorizontal size={25} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            };
            
            export default Header;
            ```
            
        - `Main.js`
            
            ```jsx
            import Image from "next/image";
            import ethLogo from "../assets/eth-logo.png";
            
            import { RiSettings3Fill } from "react-icons/ri";
            import { AiOutlineDown } from "react-icons/ai";
            
            const style = {
              wrapper: `w-screen flex items-center justify-center`,
              content: `bg-[#191B1F] w-[30rem] rounded-2xl p-4`,
              formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
              transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-2 text-xs  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
              transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-3 w-full text-2xl`,
              currencySelector: `flex w-1/4`,
              currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
              currencySelectorIcon: `flex items-center`,
              currencySelectorTicker: `mx-2`,
              currencySelectorArrow: `text-lg`,
              confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-4 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
            };
            
            const Main = () => {
              return (
                <div className={style.wrapper}>
                  <div className={style.content}>
                    <div className={style.formHeader}>
                      <div>Swap</div>
                      <div>
                        <RiSettings3Fill />
                      </div>
                    </div>
                    <div className={style.transferPropContainer}>
                      <input
                        type="text"
                        className={style.transferPropInput}
                        placeholder="0.0"
                        pattern="^[0-9]*[.,]?[0-9]*$"
                        onChange={(e) => handleChange(e, "amount")}
                      />
                      <div className={style.currencySelector}>
                        <div className={style.currencySelectorContent}>
                          <div className={style.currencySelectorIcon}>
                            <Image src={ethLogo} alt="eth logo" height={20} width={20} />
                          </div>
                          <div className={style.currencySelectorTicker}>ETH</div>
                          <AiOutlineDown className={style.currencySelectorArrow} />
                        </div>
                      </div>
                    </div>
                    <div className={style.transferPropContainer}>
                      <input
                        type="text"
                        className={style.transferPropInput}
                        placeholder="0x..."
                        onChange={(e) => handleChange(e, "addressTo")}
                      />
                      <div className={style.currencySelector}></div>
                    </div>
                    <div onClick={(e) => handleSubmit(e)} className={style.confirmButton}>
                      Confirm
                    </div>
                  </div>
                </div>
              );
            };
            
            export default Main;
            ```
            
        - `pages/index.js`
            
            ```jsx
            import Header from "../components/Header";
            import Main from "../components/Main";
            
            const style = {
              wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#28242B] text-white select-none flex flex-col justify-between`,
            };
            
            const Home = () => {
              return (
                <div className={style.wrapper}>
                  <Header />
                  <Main />
                  <h1>Transactions History</h1>
                </div>
              );
            };
            
            export default Home;
            ```
            
    - Make Connect wallet button work - with contextAPI(****`TransactionContext.js`)**
        - Create ****`/context/TransactionContext.js`****
            
            ```jsx
            import React, { useEffect, useState } from "react";
            
            export const TransactionContext = React.createContext();
            
            let eth;
            
            if (typeof window !== "undefined") {
              eth = window.ethereum;
            }
            
            export const TransactionProvider = ({ children }) => {
              const [currentAccount, setCurrentAccount] = useState();
            
              /**
               * Checks if MetaMask is installed and an account is connected
               * @param {*} metamask Injected MetaMask code from the browser
               * @returns
               */
              const checkIfWalletIsConnected = async (metamask = eth) => {
                try {
                  if (!metamask) return alert("Please install metamask ");
            
                  const accounts = await metamask.request({ method: "eth_accounts" });
            
                  if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                  }
                } catch (error) {
                  console.error(error);
                  throw new Error("No ethereum object.");
                }
              };
            
              /**
               * Prompts user to connect their MetaMask wallet
               * @param {*} metamask Injected MetaMask code from the browser
               */
              const connectWallet = async (metamask = eth) => {
                try {
                  if (!metamask) return alert("Please install metamask ");
                  
                  const accounts = await metamask.request({
                    method: "eth_requestAccounts",
                  });
                  
                  setCurrentAccount(accounts[0]);
                  console.log('here :', currentAccount);
                } catch (error) {
                  console.error(error);
                  throw new Error("No ethereum object.");
                }
              };
            
              //runs every time the app is refreshed
              useEffect(() => {
                checkIfWalletIsConnected();
              }, []);
            
              return (
                <TransactionContext.Provider
                  value={{
                    connectWallet,
                    currentAccount,
                  }}
                >
                  {children}
                </TransactionContext.Provider>
              );
            };
            ```
            
        - Wrap the app around this context - `_app.js`
            
            ```jsx
            import "../styles/globals.css";
            import { TransactionProvider } from "../context/TransactionContext";
            
            function MyApp({ Component, pageProps }) {
              return (
                <TransactionProvider>
                  <Component {...pageProps} />
                </TransactionProvider>
              );
            }
            
            export default MyApp;
            ```
            
        - Use the context in components - `Header.js`
            
            ```jsx
            ...
            const { connectWallet, currentAccount } = useContext(TransactionContext);
            ...
            {currentAccount ? (
              <div className={`${style.button} ${style.buttonPadding}`}>
                <div className={style.buttonTextContainer}>'logged in'</div>
              </div>
            ) : (
              <div
                onClick={() => connectWallet()}
                className={style.connectWalletbtn}
              >
                <div className={style.buttonAccent}>Connect Wallet</div>
              </div>
            )}
            ```
            
    - [Go build `/contracts` (in section#4) ] ==================
    - Import `abi` & contract `address` from contracts to client
        - Copy `contracts/Tranactions.json` → `client/lib/Tranactions.json`
            
            ```json
            {
              "_format": "hh-sol-artifact-1",
              "contractName": "Transactions",
              "sourceName": "contracts/Transactions.sol",
              "abi": [
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "internalType": "address",
                      "name": "sender",
                      "type": "address"
                    },
                    {
                      "indexed": false,
                      "internalType": "address",
                      "name": "receiver",
                      "type": "address"
                    },
                    {
                      "indexed": false,
                      "internalType": "uint256",
                      "name": "amount",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "internalType": "string",
                      "name": "message",
                      "type": "string"
                    },
                    {
                      "indexed": false,
                      "internalType": "uint256",
                      "name": "timestamp",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "internalType": "string",
                      "name": "keyword",
                      "type": "string"
                    }
                  ],
                  "name": "Transfer",
                  "type": "event"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address payable",
                      "name": "receiver",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "amount",
                      "type": "uint256"
                    },
                    {
                      "internalType": "string",
                      "name": "message",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "keyword",
                      "type": "string"
                    }
                  ],
                  "name": "publishTransaction",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                }
              ],
              "bytecode": "0x608060405234801561001057600080fd5b506104dc806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80637d0ee35714610030575b600080fd5b61004a60048036038101906100459190610281565b61004c565b005b7f416cfa4330a4565f45c2fd2dd4826a83a37443aba2ce6f79477c7355afac35fa33858585428660405161008596959493929190610437565b60405180910390a150505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100d2826100a7565b9050919050565b6100e2816100c7565b81146100ed57600080fd5b50565b6000813590506100ff816100d9565b92915050565b6000819050919050565b61011881610105565b811461012357600080fd5b50565b6000813590506101358161010f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61018e82610145565b810181811067ffffffffffffffff821117156101ad576101ac610156565b5b80604052505050565b60006101c0610093565b90506101cc8282610185565b919050565b600067ffffffffffffffff8211156101ec576101eb610156565b5b6101f582610145565b9050602081019050919050565b82818337600083830152505050565b600061022461021f846101d1565b6101b6565b9050828152602081018484840111156102405761023f610140565b5b61024b848285610202565b509392505050565b600082601f8301126102685761026761013b565b5b8135610278848260208601610211565b91505092915050565b6000806000806080858703121561029b5761029a61009d565b5b60006102a9878288016100f0565b94505060206102ba87828801610126565b935050604085013567ffffffffffffffff8111156102db576102da6100a2565b5b6102e787828801610253565b925050606085013567ffffffffffffffff811115610308576103076100a2565b5b61031487828801610253565b91505092959194509250565b600061032b826100a7565b9050919050565b61033b81610320565b82525050565b6000819050919050565b600061036661036161035c846100a7565b610341565b6100a7565b9050919050565b60006103788261034b565b9050919050565b600061038a8261036d565b9050919050565b61039a8161037f565b82525050565b6103a981610105565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156103e95780820151818401526020810190506103ce565b838111156103f8576000848401525b50505050565b6000610409826103af565b61041381856103ba565b93506104238185602086016103cb565b61042c81610145565b840191505092915050565b600060c08201905061044c6000830189610332565b6104596020830188610391565b61046660408301876103a0565b818103606083015261047881866103fe565b905061048760808301856103a0565b81810360a083015261049981846103fe565b905097965050505050505056fea264697066735822122003c0d71543b41caa757e8cb2691a6427aa360efdf294256ba36f79256de41ecb64736f6c63430008090033",
              "deployedBytecode": "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c80637d0ee35714610030575b600080fd5b61004a60048036038101906100459190610281565b61004c565b005b7f416cfa4330a4565f45c2fd2dd4826a83a37443aba2ce6f79477c7355afac35fa33858585428660405161008596959493929190610437565b60405180910390a150505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100d2826100a7565b9050919050565b6100e2816100c7565b81146100ed57600080fd5b50565b6000813590506100ff816100d9565b92915050565b6000819050919050565b61011881610105565b811461012357600080fd5b50565b6000813590506101358161010f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61018e82610145565b810181811067ffffffffffffffff821117156101ad576101ac610156565b5b80604052505050565b60006101c0610093565b90506101cc8282610185565b919050565b600067ffffffffffffffff8211156101ec576101eb610156565b5b6101f582610145565b9050602081019050919050565b82818337600083830152505050565b600061022461021f846101d1565b6101b6565b9050828152602081018484840111156102405761023f610140565b5b61024b848285610202565b509392505050565b600082601f8301126102685761026761013b565b5b8135610278848260208601610211565b91505092915050565b6000806000806080858703121561029b5761029a61009d565b5b60006102a9878288016100f0565b94505060206102ba87828801610126565b935050604085013567ffffffffffffffff8111156102db576102da6100a2565b5b6102e787828801610253565b925050606085013567ffffffffffffffff811115610308576103076100a2565b5b61031487828801610253565b91505092959194509250565b600061032b826100a7565b9050919050565b61033b81610320565b82525050565b6000819050919050565b600061036661036161035c846100a7565b610341565b6100a7565b9050919050565b60006103788261034b565b9050919050565b600061038a8261036d565b9050919050565b61039a8161037f565b82525050565b6103a981610105565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156103e95780820151818401526020810190506103ce565b838111156103f8576000848401525b50505050565b6000610409826103af565b61041381856103ba565b93506104238185602086016103cb565b61042c81610145565b840191505092915050565b600060c08201905061044c6000830189610332565b6104596020830188610391565b61046660408301876103a0565b818103606083015261047881866103fe565b905061048760808301856103a0565b81810360a083015261049981846103fe565b905097965050505050505056fea264697066735822122003c0d71543b41caa757e8cb2691a6427aa360efdf294256ba36f79256de41ecb64736f6c63430008090033",
              "linkReferences": {},
              "deployedLinkReferences": {}
            }
            ```
            
        - Create `client/lib/constants.js`to contain abi & address (paste address from #4’s deployment log)
            
            
    - [Using smart_contracts] update context to send money, interact with smart contracts - ****`TransactionContext.js`****
        
        ```jsx
        import React, { useEffect, useState } from "react";
        import { contractABI, contractAddress } from "../lib/constants";
        import { ethers } from "ethers";
        import { useRouter } from "next/router";
        
        export const TransactionContext = React.createContext();
        
        let eth;
        
        if (typeof window !== "undefined") {
          eth = window.ethereum;
        }
        
        //uses ABI & contract address
        const getEthereumContract = () => {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const transactionContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
        
          return transactionContract;
        };
        
        export const TransactionProvider = ({ children }) => {
          const [currentAccount, setCurrentAccount] = useState();
          const [isLoading, setIsLoading] = useState(false);
          const router = useRouter();
          const [formData, setFormData] = useState({
            addressTo: "",
            amount: "",
          });
        
          /**
           * Trigger loading modal
           */
          useEffect(() => {
            if (isLoading) {
              router.push(`/?loading=${currentAccount}`);
            } else {
              router.push(`/`);
            }
          }, [isLoading]);
        
          /**
           * Create user profile in Sanity
           */
          useEffect(() => {
            if (!currentAccount) return;
            (async () => {
              const userDoc = {
                _type: "users",
                _id: currentAccount,
                userName: "Unnamed",
                address: currentAccount,
              };
        
              await client.createIfNotExists(userDoc);
            })();
          }, [currentAccount]);
        
          const handleChange = (e, name) => {
            setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
          };
        
          /**
           * Checks if MetaMask is installed and an account is connected
           * @param {*} metamask Injected MetaMask code from the browser
           * @returns
           */
          const checkIfWalletIsConnected = async (metamask = eth) => {
            try {
              if (!metamask) return alert("Please install metamask ");
        
              const accounts = await metamask.request({ method: "eth_accounts" });
        
              if (accounts.length) {
                setCurrentAccount(accounts[0]);
              }
            } catch (error) {
              console.error(error);
              throw new Error("No ethereum object.");
            }
          };
        
          /**
           * Prompts user to connect their MetaMask wallet
           * @param {*} metamask Injected MetaMask code from the browser
           */
          const connectWallet = async (metamask = eth) => {
            try {
              if (!metamask) return alert("Please install metamask ");
        
              const accounts = await metamask.request({
                method: "eth_requestAccounts",
              });
        
              setCurrentAccount(accounts[0]);
            } catch (error) {
              console.error(error);
              throw new Error("No ethereum object.");
            }
          };
        
          /**
           * Executes a transaction
           * @param {*} metamask Injected MetaMask code from the browser
           * @param {string} currentAccount Current user's address
           */
          const sendTransaction = async (
            metamask = eth,
            connectedAccount = currentAccount
          ) => {
            try {
              if (!metamask) return alert("Please install metamask ");
              const { addressTo, amount } = formData;
              const transactionContract = getEthereumContract();
        
              const parsedAmount = ethers.utils.parseEther(amount);
        
              await metamask.request({
                method: "eth_sendTransaction",
                params: [
                  {
                    from: connectedAccount,
                    to: addressTo,
                    gas: "0x7EF40", // 520000 Gwei
                    value: parsedAmount._hex,
                  },
                ],
              });
        
              const transactionHash = await transactionContract.publishTransaction(
                addressTo,
                parsedAmount,
                `Transferring ETH ${parsedAmount} to ${addressTo}`,
                "TRANSFER"
              );
        
              setIsLoading(true);
        
              await transactionHash.wait();
        
              // await saveTransaction(
              //   transactionHash.hash,
              //   amount,
              //   connectedAccount,
              //   addressTo
              // );
        
              setIsLoading(false);
            } catch (error) {
              console.log(error);
            }
          };
        
          useEffect(() => {
            checkIfWalletIsConnected();
          }, []);
        
          return (
            <TransactionContext.Provider
              value={{
                connectWallet,
                currentAccount,
                formData,
                setFormData,
                handleChange,
                sendTransaction,
                isLoading,
              }}
            >
              {children}
            </TransactionContext.Provider>
          );
        };
        ```
        
    - Update components to update formData, loading etc
        - `Header.js` → update user address on wallet connect
            
            ```jsx
            import { useEffect, useState } from "react";
            import { useContext } from "react";
            
            import Image from "next/image";
            
            import { FiArrowUpRight } from "react-icons/fi";
            import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
            import { AiOutlineDown } from "react-icons/ai";
            
            import { TransactionContext } from "../context/TransactionContext";
            
            import uniswapLogo from "../assets/uniswap.png";
            import ethCurrency from "../assets/eth-currency.png";
            import ethLogo from "../assets/eth-logo.png";
            
            //styles
            const style = {
              wrapper: `p-4 w-screen flex justify-between items-center`,
              headerLogo: `flex w-1/4 items-center justify-start`,
              nav: `flex-1 flex justify-center items-center invisible md:visible`,
              navContainer: `flex bg-[#191B1F] rounded-3xl`,
              navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
              activeNavItem: `bg-[#20242A]`,
              walletSection: `flex w-1/4 justify-end items-center`,
              button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer p-2`,
              buttonIconContainer: `flex items-center justify-center w-8 h-8`,
              buttonTextContainer: `h-8 flex items-center`,
              buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA] min-w-[8rem] min-h-[2.5rem]`,
            };
            
            const Header = () => {
              const [selectedNav, setSelectedNav] = useState("swap"); // swap, pool, vote, charts
              const [userName, setUserName] = useState();
              const { connectWallet, currentAccount } = useContext(TransactionContext);
            
              useEffect(() => {
                if (currentAccount) {
                  setUserName(
                    `${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`
                  );
                }
              }, [currentAccount]);
            
              return (
                <div className={style.wrapper}>
                  <div className={style.headerLogo}>
                    <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />
                  </div>
            
                  {/*======================== navbar section ==================================== */}
                  <div className={style.nav}>
                    <div className={style.navContainer}>
                      <div
                        className={`${style.navItem} ${
                          selectedNav === "swap" && style.activeNavItem
                        }`}
                        onClick={() => setSelectedNav("swap")}
                      >
                        Swap
                      </div>
                      <div
                        className={`${style.navItem} ${
                          selectedNav === "pool" && style.activeNavItem
                        }`}
                        onClick={() => setSelectedNav("pool")}
                      >
                        Pool
                      </div>
                      <div
                        className={`${style.navItem} ${
                          selectedNav === "vote" && style.activeNavItem
                        }`}
                        onClick={() => setSelectedNav("vote")}
                      >
                        Swap
                      </div>
                      <a
                        href="https://info.uniswap.org/#/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className={style.navItem}>
                          Charts <FiArrowUpRight />
                        </div>
                      </a>
                    </div>
                  </div>
            
                  {/*======================== wallet section ==================================== */}
                  <div className={style.walletSection}>
                    <div className={style.button}>
                      <div className={style.buttonIconContainer}>
                        <Image src={ethLogo} alt="eth logo" height={20} width={20} />
                      </div>
                      <p>Ethereum</p>
                      <div className={style.buttonIconContainer}>
                        <AiOutlineDown />
                      </div>
                    </div>
            
                    {currentAccount ? (
                      <div className={`${style.button} ${style.buttonPadding}`}>
                        <div className={style.buttonTextContainer}>{userName}</div>
                      </div>
                    ) : (
                      <div
                        onClick={() => connectWallet()}
                        className={`${style.button} p-1`}
                      >
                        <div className={style.buttonAccent}>Connect Wallet</div>
                      </div>
                    )}
            
                    <div className={`${style.button}`}>
                      <div className={`${style.buttonIconContainer} stroke-1`}>
                        <HiOutlineDotsHorizontal size={25} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            };
            
            export default Header;
            ```
            
        - `Main.js` → send formdata to context
            
            ```jsx
            import Image from "next/image";
            import { useContext } from "react";
            import { useEffect, useState } from "react";
            
            import { RiSettings3Fill } from "react-icons/ri";
            import { AiOutlineDown } from "react-icons/ai";
            
            import { TransactionContext } from "../context/TransactionContext";
            import ethLogo from "../assets/eth-logo.png";
            
            const style = {
              wrapper: `w-screen flex items-center justify-center`,
              content: `bg-[#191B1F] w-[30rem] rounded-2xl p-4`,
              formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
              transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-2 text-xs  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
              transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-3 w-full text-2xl`,
              currencySelector: `flex w-1/4`,
              currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
              currencySelectorIcon: `flex items-center`,
              currencySelectorTicker: `mx-2`,
              currencySelectorArrow: `text-lg`,
              confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-4 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
            };
            
            const Main = () => {
              const { formData, handleChange, sendTransaction } =
                useContext(TransactionContext);
            
              const handleSubmit = async (e) => {
                const { addressTo, amount } = formData;
                e.preventDefault();
            
                if (!addressTo || !amount) return;
            
                sendTransaction();
              };
            
              return (
                <div className={style.wrapper}>
                  <div className={style.content}>
                    <div className={style.formHeader}>
                      <div>Swap</div>
                      <div>
                        <RiSettings3Fill />
                      </div>
                    </div>
                    <div className={style.transferPropContainer}>
                      <input
                        type="text"
                        className={style.transferPropInput}
                        placeholder="0.0"
                        pattern="^[0-9]*[.,]?[0-9]*$"
                        onChange={(e) => handleChange(e, "amount")}
                      />
                      <div className={style.currencySelector}>
                        <div className={style.currencySelectorContent}>
                          <div className={style.currencySelectorIcon}>
                            <Image src={ethLogo} alt="eth logo" height={20} width={20} />
                          </div>
                          <div className={style.currencySelectorTicker}>ETH</div>
                          <AiOutlineDown className={style.currencySelectorArrow} />
                        </div>
                      </div>
                    </div>
                    <div className={style.transferPropContainer}>
                      <input
                        type="text"
                        className={style.transferPropInput}
                        placeholder="0x..."
                        onChange={(e) => handleChange(e, "addressTo")}
                      />
                      <div className={style.currencySelector}></div>
                    </div>
                    <div onClick={(e) => handleSubmit(e)} className={style.confirmButton}>
                      Confirm
                    </div>
                  </div>
                </div>
              );
            };
            
            export default Main;
            ```
            
    - [GO TO] `/studio` to see how to integrate DB with the app
- 4. **Build `/contracts`**
    - Initialize: `npx hardhat`
    - Update hh configs:
        - `hardhat.config.js`
            
            ```jsx
            require("dotenv").config();
            require("hardhat-deploy");
            // You need to export an object to set up your config
            // Go to https://hardhat.org/config/ to learn more
            /**
             * @type import('hardhat/config').HardhatUserConfig
             */
            
            const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
            const RINKEBY_RPC_URL =
              process.env.RINKEBY_RPC_URL ||
              "https://eth-rinkeby.alchemyapi.io/v2/ILEbKCj4ajys_bsYrJwEgJ8RTqlswWbd";
            const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
            const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
            
            module.exports = {
              defaultNetwork: "hardhat",
              networks: {
                hardhat: {
                  chainId: 31337,
                  // gasPrice: 130000000000,
                },
                rinkeby: {
                  url: RINKEBY_RPC_URL,
                  accounts: [PRIVATE_KEY],
                  chainId: 4,
                  blockConfirmations: 6,
                },
              },
              solidity: {
                compilers: [
                  {
                    version: "0.8.8",
                  },
                  {
                    version: "0.8.9",
                  },
                  {
                    version: "0.6.6",
                  },
                ],
              },
              etherscan: {
                apiKey: ETHERSCAN_API_KEY,
              },
              gasReporter: {
                enabled: true,
                currency: "USD",
                outputFile: "gas-report.txt",
                noColors: true,
                // coinmarketcap: COINMARKETCAP_API_KEY,
              },
              namedAccounts: {
                deployer: {
                  default: 0, // here this will by default take the first account as deployer
                  1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
                },
              },
              mocha: {
                timeout: 200000, // 200 seconds max for running tests
              },
            };
            ```
            
        - `helper-hardhat-config.js`
            
            ```jsx
            const networkConfig = {
              31337: {
                name: "localhost",
                ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
                gasLane:
                  "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
                mintFee: "10000000000000000", // 0.01 ETH
                callbackGasLimit: "500000", // 500,000 gas
              },
              // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
              // Default one is ETH/USD contract on Kovan
              4: {
                name: "rinkeby",
                ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
                vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
                gasLane:
                  "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
                callbackGasLimit: "500000", // 500,000 gas
                mintFee: "10000000000000000", // 0.01 ETH
                subscriptionId: "1002", // add your ID here!
              },
            };
            
            const DECIMALS = "18";
            const INITIAL_PRICE = "200000000000000000000";
            const developmentChains = ["hardhat", "localhost"];
            
            module.exports = {
              networkConfig,
              developmentChains,
              DECIMALS,
              INITIAL_PRICE,
            };
            ```
            
    - Create contract to emit Events - `Transactions.sol`
        
        ```solidity
        // SPDX-License-Identifier: UNLICENSED
        pragma solidity ^0.8.9;
        
        contract Transactions {
            event Transfer (address sender, address receiver, uint amount, string message, uint256 timestamp, string keyword);
        
            function publishTransaction(address payable receiver, uint amount, string memory message, string memory keyword) public {
                emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword); 
            }
        }
        ```
        
    - Create deploy script - `deploy/01-deploy-transactions.js`
        
        ```jsx
        const { network } = require("hardhat");
        const { developmentChains } = require("../helper-hardhat-config");
        const { verify } = require("../utils/verify");
        
        module.exports = async ({ getNamedAccounts, deployments }) => {
          const { deploy, log } = deployments;
          const { deployer } = await getNamedAccounts();
        
          log("----------------------------------------------------");
          arguments = [];
          const tranactions = await deploy("Transactions", {
            from: deployer,
            args: arguments,
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
          });
        
          // Verify the deployment
          if (
            !developmentChains.includes(network.name) &&
            process.env.ETHERSCAN_API_KEY
          ) {
            log("Verifying...");
            await verify(tranactions.address, arguments);
          }
        };
        
        module.exports.tags = ["all", "basicnft", "main"];
        ```
        
    - Deploy:
        
        ```jsx
        ❯ hh deploy --network rinkeby
        Nothing to compile
        ----------------------------------------------------
        deploying "Transactions" (tx: 0x5ef8726629d587f788aaac6d2439767b909ded427a0a7c1911bcbb32aebfb41a)...: 
        deployed at 0x4366D48DAe77025ec49202a0bBD5BC4DC14a27a3 with 321351 gas
        ```
        
    
- 5. **Build `/studio`**
    - Install sanity cli
        
        ```jsx
         yarn global add @sanity/cli
        ```
        
    - Initialize cli - Log in to [sanity.io](http://sanity.io) and login. then run on cli :
        
        ```jsx
        sanity init 
        ```
        
    - Create schemas (inside `/studio/schema`
        - `transactionSchema.js`
            
            ```jsx
            export const transactionSchema = {
              name: "transactions",
              title: "Transactions",
              type: "document",
              fields: [
                {
                  name: "txHash",
                  title: "Transaction Hash",
                  type: "string",
                },
                {
                  name: "fromAddress",
                  title: "From (Wallet Address)",
                  type: "string",
                },
                {
                  name: "toAddress",
                  title: "To (Wallet Address)",
                  type: "string",
                },
                {
                  name: "amount",
                  title: "Amount",
                  type: "number",
                },
                {
                  name: "timestamp",
                  title: "Timestamp",
                  type: "datetime",
                },
              ],
            };
            ```
            
        - `userSchema.js`
            
            ```jsx
            export const userSchema = {
              name: "users",
              title: "Users",
              type: "document",
              fields: [
                {
                  name: "address",
                  title: "Wallet Address",
                  type: "string",
                },
                {
                  name: "userName",
                  title: "User Name",
                  type: "string",
                },
                {
                  name: "transactions",
                  title: "Transactions",
                  type: "array",
                  of: [
                    {
                      type: "reference",
                      to: [{ type: "transactions" }],
                    },
                  ],
                },
              ],
            };
            ```
            
        - Concat these two schemas inside `schema.js`
            
            ```jsx
            ...
            types: schemaTypes.concat([userSchema, transactionSchema]),
            ........
            ```
            
    - Start a client on localhost
        
        ```jsx
        ❯ sanity start
        ✔ Checking configuration files...
        ⠧ Compiling...webpack built 45d218b9ddafccf91f5d in 9065ms
        ✔ Compiling...
        Content Studio successfully compiled! Go to http://localhost:3333
        ```
        
    - Setup project
        - Head over to your sanity project → `API` → `+Add CORS Origin` → add `[http://localhost:3000](https://localhost)`  → allow credentials
        - Create token : `Tokens` → `Add API Token` → copy the token
        - Copy the `PROJECT ID`
    - Create `client/lib/sanityClient.js` to paste the above project setup
        
        ```jsx
        import sanityClient from "@sanity/client";
        
        export const client = sanityClient({
          projectId: "coo2kv74",
          dataset: "production",
          apiVersion: "v1",
          token:
            "sk1pkdXwhQc43bKliYkNEeNQSm469J3Mrg7JI7slx7OZgedcvZydS13dnat6bPCQLy4vkaigsHDEx28ZISnDHfc5s930PMgObsNUobzKfRlbVKeL1P8Fa3uHGeoHmYhgpjiAd8JpBZ6Y1ouScPFUQLjnqvl7A87S5PXeQ2t3a7yUPfv4YWwO",
          useCdn: false,
        });
        ```
        
    - Create `saveTransactions` method in `TransactionContext.js`
        
        ```jsx
        /**
           * Saves transaction to Sanity DB
           * @param {string} txHash Transaction hash
           * @param {number} amount Amount of ETH that was sent
           * @param {string} fromAddress Sender address
           * @param {string} toAddress Recipient address
           * @returns null
           */
          const saveTransaction = async (
            txHash,
            amount,
            fromAddress = currentAccount,
            toAddress,
          ) => {
            const txDoc = {
              _type: 'transactions',
              _id: txHash,
              fromAddress: fromAddress,
              toAddress: toAddress,
              timestamp: new Date(Date.now()).toISOString(),
              txHash: txHash,
              amount: parseFloat(amount),
            }
        
            await client.createIfNotExists(txDoc)
        
            await client
              .patch(currentAccount)
              .setIfMissing({ transactions: [] })
              .insert('after', 'transactions[-1]', [
                {
                  _key: txHash,
                  _ref: txHash,
                  _type: 'reference',
                },
              ])
              .commit()
        
            return
          }
        
        ...................................
        [use it like this] ................
        ...................................
        
        await saveTransaction(
                transactionHash.hash,
                amount,
                connectedAccount,
                addressTo
              );
        ```
        
    - Start updating db(locally) from client
        
        ```jsx
        > cd studio
        > sanity start
        ```
        
    - Store `users` to db on login🟡