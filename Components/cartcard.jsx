import { doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase";
function Cartcard({ data, index, fulldata, setdata }) {
  async function plusquantity(id, quantity) {
    let userdoc = doc(db, "Carts", id);
    const newField = { quantity: quantity + 1 };
    await updateDoc(userdoc, newField);
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
  }
  async function minusquantity(id, quantity) {
    let userdoc = doc(db, "Carts", id);
    if (quantity > 1) {
      const newField = { quantity: quantity - 1 };
      await updateDoc(userdoc, newField);
    } else {
      await deleteDoc(userdoc);
    }
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
            minusquantity(data.id, data.quantity);
          }}
        >
          <h1>-</h1>
        </button>
        <p className="cart-quantity">{data.quantity}</p>
        <button
          onClick={() => {
            plusquantity(data.id, data.quantity);
          }}
        >
          <h1>+</h1>
        </button>
      </div>
    </div>
  );
}

export default Cartcard;
