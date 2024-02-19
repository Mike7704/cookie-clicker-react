import "./Store.css";
import { storeItems } from "./StoreItems";
import StoreItem from "./StoreItem";

function Store({ cookies, setCookies, clickPower, setClickPower }) {
  const purchaseItem = (item) => {
    console.log(cookies);
    if (cookies >= item.cost) {
      setCookies(cookies - item.cost);
      item.owned++;
      item.cost = Math.floor(item.cost * 1.2);

      // Is click power item?
      if (item.name === "Double Click Power") {
        // Double click power
        item.production *= 2;
        setClickPower(item.production);
        // Increase cost further
        item.cost = Math.floor(item.cost + item.owned * clickPower * 3);
      }
    } else {
      alert("Not enough cookies!");
    }
  };

  return (
    <div className="store">
      <h2>Store</h2>
      <div className="item-heading">
        <div>Owned</div>
        <div>Item</div>
        <div>Production</div>
        <div>Cost</div>
      </div>
      {storeItems.map((item) => (
        <StoreItem
          key={item.id}
          owned={item.owned}
          name={item.name}
          production={item.production}
          cost={item.cost}
          purchaseItem={() => purchaseItem(item)}
        />
      ))}
    </div>
  );
}

export default Store;
