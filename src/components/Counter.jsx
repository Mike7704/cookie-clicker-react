import "./Counter.css";

function Counter({ cookieCounter, cookieCPS }) {
  return (
    <div className="counter">
      <p id="cookie-counter">{cookieCounter.toLocaleString()} Cookies</p>
      <p id="cookie-cps">{cookieCPS.toLocaleString()} cps</p>
    </div>
  );
}

export default Counter;
