import { doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase";
function Cartcard({ data, index, fulldata, setdata, signed }) {
  async function plusquantity(id, quantity) {
    let userdoc = doc(db, "users", id);
    let sender = [];
    fulldata.forEach((element, i) => {
      if (i == index) {
        let obj = { ...element, quantity: element.quantity + 1 };
        sender.push(obj);
      } else {
        sender.push(element);
      }
    });
    setdata(sender);
    await updateDoc(userdoc, { ...signed, cart: sender });
  }
  async function minusquantity(id, quantity) {
    let userdoc = doc(db, "users", id);
    let sender = [];
    fulldata.forEach((element, i) => {
      if (i == index) {
        let obj = { ...element, quantity: element.quantity - 1 };
        if (quantity > 1) {
          sender.push(obj);
        }
      } else {
        sender.push(element);
      }
    });
    setdata(sender);
    await updateDoc(userdoc, { ...signed, cart: sender });
  }
  return (
    <div className="cart-card">
      <div className="cart-image">
        <img src={data.image1} alt="" />
      </div>
      <div className="cart-text">
        <p className="cart-name">{data.brand}</p>
        <p className="cart-price">RS.-{data.price * data.quantity}</p>
        <button
          onClick={() => {
            minusquantity(signed.id, data.quantity);
          }}
        >
          <h1>-</h1>
        </button>
        <p className="cart-quantity">{data.quantity}</p>
        <button
          onClick={() => {
            plusquantity(signed.id, data.quantity);
          }}
        >
          <h1>+</h1>
        </button>
      </div>
    </div>
  );
}

export default Cartcard;
