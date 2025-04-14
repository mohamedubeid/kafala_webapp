import React, { useEffect } from "react";
import HomeLayout from "../layouts/HomePageLayout";
import Header from "./Header";
import Fields from "./Fields";
import Kids from "./Kids";
import About from "./About";
import Aos from "aos";
import TransactionSlider from "./TransactionSlider";

const HomePage = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <HomeLayout navbarShadow navbarStatic={false}>
      <Header />
      <TransactionSlider />
      <Kids />
      <Fields />
      <About />
    </HomeLayout>
  );
};

export default HomePage;
