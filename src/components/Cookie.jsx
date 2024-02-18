import "./Cookie.css";

function Cookie({ clickCookie }) {
  return (
    <div className="cookie">
      <button id="cookie-button" onClick={clickCookie}></button>
      <audio id="click-audio">
        <source src="./sounds/click.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default Cookie;
