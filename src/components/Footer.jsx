function Footer({ totalCookiesProduced, totalClicks, resetGame }) {
  return (
    <footer>
      <p id="total-cookies-produced">Total Cookies Produced: {totalCookiesProduced.toLocaleString()}</p>
      <p id="total-clicks">Total Clicks: {totalClicks.toLocaleString()}</p>
      <button id="reset" onClick={resetGame}>
        Reset
      </button>
      <p>Cookie Clicker - Michael Cowley</p>
    </footer>
  );
}

export default Footer;
