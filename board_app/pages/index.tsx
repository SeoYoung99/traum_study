import type { NextPage } from "next";
import MainPage from "./mainPage";
import { postItem } from "../src/store/types/types";

const Home: NextPage = () => {
  return (
    <div>
      <MainPage />
    </div>
  );
};

export default Home;
