import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useState, useContext } from "react";
import Cartcard from "./cartcard";
import { useRouter } from "next/dist/client/router";
import { Context1, Context2 } from "../pages/_app";

function Navbar() {
  const signed = useContext(Context1);
  const router = useRouter();
  let total = 0;
  const [data, setdata] = useState([]);
  const [width, setwidth] = useState("0px");
  const [dis, setdis] = useState("none");
  const collectionRef = collection(db, "Carts");
  async function getCart() {
    const cartData = await getDocs(collectionRef);
    setdata(cartData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  return (
    <nav>
      <div className="top">
        FREE SHIPPING IN INDIA. FREE SHIPPING WORLDWIDE ON ORDERS OVER $250 USD.
      </div>
      <div className="mid">
        <img
          className="logo"
          src="https://cdn.shopify.com/s/files/1/1691/8723/files/Asset_1_140x@2x.png?v=1629734744"
          alt=""
          onClick={() => {
            router.replace("/");
          }}
        />
        <div className="icons">
          {!signed ? (
            <img
              onClick={() => {
                router.replace("/signin");
              }}
              src="account.png"
              alt=""
            />
          ) : (
            <h2>{signed.username.toUpperCase()[0]}</h2>
          )}
          <img src="search.png" alt="" />
          <img
            onClick={() => {
              setwidth("300px");
              getCart();
              setdis("block");
            }}
            src="cart.png"
            alt=""
          />
        </div>
        <div
          className="cart-proxy"
          style={{ display: dis }}
          onClick={() => {
            setwidth("0px");
            setdis("none");
          }}
        ></div>
        <div className="cartWindow" style={{ width }}>
          <h1
            onClick={() => {
              setwidth("0px");
              setdis("none");
            }}
          >
            X
          </h1>
          <main>
            {data.map((el, i) => {
              total = total + el.price * el.quantity;
              return (
                <div key={el.id}>
                  <Cartcard
                    index={i}
                    fulldata={data}
                    setdata={setdata}
                    data={el}
                  />
                </div>
              );
            })}
            {data.length == 0 ? (
              <img
                src="https://www.nykaafashion.com/v2/checkout/static/media/empty-cart.78c27941.png"
                alt=""
              />
            ) : null}
          </main>
          <footer>
            <h3>Total-{total}</h3>
            <button>Proceed To Buy</button>
          </footer>
        </div>
      </div>
      <div className="bottom">
        <h3
          onClick={() => {
            router.replace("/productlist");
          }}
        >
          JEWELLERY
        </h3>
        <h3
          onClick={() => {
            router.replace("/productlist");
          }}
        >
          MOODS
        </h3>
        <h3
          onClick={() => {
            router.replace("/productlist");
          }}
        >
          MISHO MAN
        </h3>
        <h3
          onClick={() => {
            router.replace("/productlist");
          }}
        >
          CELEBRITY
        </h3>
        <h3
          onClick={() => {
            router.replace("/productlist");
          }}
        >
          PRESS
        </h3>
        <h3
          onClick={() => {
            router.replace("/productlist");
          }}
        >
          JOURNAL
        </h3>
        <h3
          onClick={() => {
            router.replace("/productlist");
          }}
        >
          ABOUT
        </h3>
      </div>
    </nav>
  );
}

export default Navbar;
