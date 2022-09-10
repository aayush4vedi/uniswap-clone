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
