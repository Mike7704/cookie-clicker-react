import cookieImage from "../assets/images/cookie-small.png";

function StoreItem({ owned, name, production, cost, purchaseItem }) {
  return (
    <div className="item">
      <div id="owned">{owned}</div>
      <div>{name}</div>
      <div>+{production} cps</div>
      <button onClick={purchaseItem}>
        <img src={cookieImage} alt="Cookie Emoji" />
        <p id="cost">{cost}</p>
      </button>
    </div>
  );
}

export default StoreItem;
