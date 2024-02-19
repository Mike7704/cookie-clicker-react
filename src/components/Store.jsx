import "./Store.css";
import { storeItems } from "./StoreItems";
import StoreItem from "./StoreItem";

function Store({ cookies, setCookies }) {
  const purchaseItem = (itemCost) => {
    console.log(cookies);
    if (cookies >= itemCost) {
      setCookies(cookies - itemCost);
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
          purchaseItem={() => purchaseItem(item.cost, item.owned)}
        />
      ))}
    </div>
  );
}

export default Store;
