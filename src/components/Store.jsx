import "./Store.css";
import { storeItems } from "./StoreItems";
import StoreItem from "./StoreItem";

function Store() {
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
        <StoreItem key={item.id} owned={item.owned} name={item.name} production={item.production} cost={item.cost} />
      ))}
    </div>
  );
}

export default Store;
