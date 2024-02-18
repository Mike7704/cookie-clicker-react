import { useState, useEffect } from "react";
import "./Reset.css";
import "./App.css";
import Header from "./components/Header";
import Counter from "./components/Counter";
import Cookie from "./components/Cookie";
import Store from "./components/Store";
import Footer from "./components/Footer";

let clicksPerSecond = 0;

function App() {
  const [cookieCounter, setCookieCounter] = useState(parseInt(localStorage.getItem("cookies")) || 0);
  const [cookieCPS, setCookieCPS] = useState(0);
  const [clickPower, setClickPower] = useState(parseInt(localStorage.getItem("clickPower")) || 1);
  const [itemsCPS, setItemsCPS] = useState(0);
  const [totalCookiesProduced, setTotalCookiesProduced] = useState(parseInt(localStorage.getItem("totalCookiesProduced")) || 0);
  const [totalClicks, setTotalClicks] = useState(parseInt(localStorage.getItem("totalClicks")) || 0);

  const clickSound = new Audio("./src/assets/sounds/click.mp3");

  // Increase cookies when cookie button is clicked
  const cookieClicked = () => {
    setCookieCounter((prevCount) => prevCount + clickPower); // Increase cookies by click power
    clicksPerSecond++; // Track number of clicks for CPS
    setTotalClicks((prevCount) => prevCount + 1); // Track number of total cookie clicks
    clickSound.play(); // Play click audio on click
  };

  // Update cookie counter
  const updateCookieCounter = () => {
    setCookieCounter((prevCount) => prevCount + itemsCPS); // Add cookies produced by items
    setTotalCookiesProduced(totalCookiesProduced + cookieCPS); // Update total cookies produced
  };

  // Calulate CPS produced
  const updateCookieCPS = () => {
    // Reset CPS to recalculate
    let cps = 0;
    let cpsFromItems = 0;

    // Calculate cps produced by items (not including click power)
    //for (let i = 0; i < items.length - 1; i++) {
    //  itemsCPS += items[i].owned * items[i].production;
    //}

    cpsFromItems = 0;

    cps += cpsFromItems; // Add CPS from items
    cps += clicksPerSecond * clickPower; // Add CPS from clicks
    setCookieCPS(cps); // Add CPS from items and clicks
    setItemsCPS(cpsFromItems); // Set item CPS
    clicksPerSecond = 0; // Reset clicks every second to be recounted
  };

  // Reset game data
  const reset = () => {
    setCookieCounter(0);
    setCookieCPS(0);
    setItemsCPS(0);
    setTotalCookiesProduced(0);
    setTotalClicks(0);
    setClickPower(1);

    /* Items
    for (let i = 0; i < items.length; i++) {
      items[i].owned = 0;
      items[i].cost = itemsStartCost[i];
    }
    // Click power
    clickPower = 1;
    items[items.length - 1].production = 1;
    items[items.length - 1].owned = 1;
    */
  };

  // Run every second and update cookies
  useEffect(() => {
    const interval = setInterval(() => {
      updateCookieCPS();
      updateCookieCounter();
      console.log("test");
    }, 1000);

    // Return the callback function (to clean up function)
    return () => clearInterval(interval);
  }, []);

  // Store data in local storage
  useEffect(() => {
    localStorage.setItem("cookies", cookieCounter.toString());
    localStorage.setItem("clickPower", clickPower.toString());
    localStorage.setItem("totalCookiesProduced", totalCookiesProduced.toString());
    localStorage.setItem("totalClicks", totalClicks.toString());
  }, [cookieCounter, clickPower, totalCookiesProduced, totalClicks]);

  return (
    <>
      <Header />
      <Counter cookieCounter={cookieCounter} cookieCPS={cookieCPS} />
      <Cookie clickCookie={cookieClicked} />
      <Store />
      <Footer totalCookiesProduced={totalCookiesProduced} totalClicks={totalClicks} resetGame={reset} />
    </>
  );
}

export default App;
