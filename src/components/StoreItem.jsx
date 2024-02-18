function StoreItem({ owned, name, production, cost }) {
  return (
    <div className="item">
      <div id="owned">{owned}</div>
      <div>{name}</div>
      <div>+{production} cps</div>
      <button>
        <img src="../src/assets/images/cookie-small.png" alt="Cookie Emoji" />
        <p id="cost">{cost}</p>
      </button>
    </div>
  );
}

export default StoreItem;
