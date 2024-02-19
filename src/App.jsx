import { useState, useEffect } from "react";
import "./Reset.css";
import "./App.css";
import Header from "./components/Header";
import Counter from "./components/Counter";
import Cookie from "./components/Cookie";
import Store from "./components/Store";
import Footer from "./components/Footer";
import { storeItems } from "./components/StoreItems";
import clickSoundFile from "./assets/sounds/click.mp3";

// Start/base costs of each item to reset to
let itemsStartCost = [10, 50, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 50];

function App() {
  const [cookieCounter, setCookieCounter] = useState(parseInt(localStorage.getItem("cookies")) || 0);
  const [cookieCPS, setCookieCPS] = useState(0);
  const [clickPower, setClickPower] = useState(parseInt(localStorage.getItem("clickPower")) || 1);
  const [totalCookiesProduced, setTotalCookiesProduced] = useState(parseInt(localStorage.getItem("totalCookiesProduced")) || 0);
  const [totalClicks, setTotalClicks] = useState(parseInt(localStorage.getItem("totalClicks")) || 0);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);

  const clickSound = new Audio(clickSoundFile);

  // Increase cookies when cookie button is clicked
  const cookieClicked = () => {
    setCookieCounter((prevCount) => prevCount + clickPower); // Increase cookies by click power
    setClicksPerSecond((prevCount) => prevCount + 1); // Track number of clicks for CPS
    setTotalClicks((prevCount) => prevCount + 1); // Track number of total cookie clicks
    clickSound.play(); // Play click audio on click
  };

  // Calulate CPS produced
  const updateCookieCPS = () => {
    // Reset CPS to recalculate
    let cps = 0;
    let cpsFromItems = 0;

    // Calculate cps produced by items (not including click power)
    for (let i = 0; i < storeItems.length - 1; i++) {
      cpsFromItems += storeItems[i].owned * storeItems[i].production;
    }

    cps += cpsFromItems; // Add CPS from items
    cps += clicksPerSecond * clickPower; // Add CPS from clicks
    setCookieCPS(cps); // Add CPS from items and clicks

    setCookieCounter((prevCount) => prevCount + cpsFromItems); // Add cookies produced by items
    setTotalCookiesProduced((prevCount) => prevCount + cps); // Update total cookies produced

    setClicksPerSecond(0); // Reset clicksPerSecond
  };

  // Reset game data
  const reset = () => {
    setCookieCounter(0);
    setCookieCPS(0);
    setTotalCookiesProduced(0);
    setTotalClicks(0);
    setClickPower(1);

    //Items
    for (let i = 0; i < storeItems.length; i++) {
      storeItems[i].owned = 0;
      storeItems[i].cost = itemsStartCost[i];
    }
    // Click power
    storeItems[storeItems.length - 1].production = 1;
    storeItems[storeItems.length - 1].owned = 1;
  };

  // Run every second and update cookies
  useEffect(() => {
    const interval = setInterval(() => {
      updateCookieCPS();
    }, 1000);

    // Return the callback function (to clean up function)
    return () => clearInterval(interval);
  }, []);

  // Store data in local storage
  useEffect(() => {
    localStorage.setItem("cookies", cookieCounter.toString());
    localStorage.setItem("clickPower", clickPower.toString());
    localStorage.setItem("storeItems", JSON.stringify(storeItems));
    localStorage.setItem("totalCookiesProduced", totalCookiesProduced.toString());
    localStorage.setItem("totalClicks", totalClicks.toString());
  }, [cookieCounter, clickPower, totalCookiesProduced, totalClicks]);

  return (
    <>
      <Header />
      <Counter cookieCounter={cookieCounter} cookieCPS={cookieCPS} />
      <Cookie clickCookie={cookieClicked} />
      <Store cookies={cookieCounter} setCookies={setCookieCounter} clickPower={clickPower} setClickPower={setClickPower} />
      <Footer totalCookiesProduced={totalCookiesProduced} totalClicks={totalClicks} resetGame={reset} />
    </>
  );
}

export default App;
