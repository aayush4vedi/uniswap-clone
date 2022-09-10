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
