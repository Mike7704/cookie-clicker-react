import "./Counter.css";

function Counter({ cookieCounter, cookieCPS }) {
  return (
    <div className="counter">
      <p id="cookie-counter">{cookieCounter} Cookies</p>
      <p id="cookie-cps">{cookieCPS} cps</p>
    </div>
  );
}

export default Counter;
