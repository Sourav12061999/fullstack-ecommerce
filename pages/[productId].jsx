import {
  collection,
  query,
  where,
  getDoc,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import { db } from "../firebase";
import { useEffect, useState, useContext } from "react";
import styles from "../styles/productdetails.module.css";
import { Context1 } from "./_app";
function Productdetails() {
  const signed = useContext(Context1);
  const router = useRouter();
  const { productId } = router.query;
  const [data, setdata] = useState({});
  useEffect(() => {
    async function getData() {
      if (productId != undefined) {
        const docRef = doc(db, "Products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setdata(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    }
    getData();
  }, [productId]);
  async function addToCart() {
    if (!signed) {
      router.replace("/signin");
    } else {
      const docRef = doc(db, "users", signed.id);
      const docSnap = await getDoc(docRef);
      let d = docSnap.data().cart;
      d.push({ ...data, quantity: 1 });
      await updateDoc(docRef, { ...signed, cart: d });
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.smImage}>
        <img src={data.image1} alt="" />
        <img src={data.image2} alt="" />
        {data.image3 != "" ? <img src={data.image3} alt="" /> : null}
        {data.image4 != "" ? <img src={data.image4} alt="" /> : null}
      </div>
      <div className={styles.bgImage}>
        <div>
          {" "}
          <img src={data.image1} alt="" />
        </div>
        <div>
          <img src={data.image2} alt="" />
        </div>
        <div>{data.image3 != "" ? <img src={data.image3} alt="" /> : null}</div>
        <div>{data.image4 != "" ? <img src={data.image4} alt="" /> : null}</div>
      </div>
      <div className={styles.text}>
        <h4>{data.brand}</h4>
        <h2>{data.name}</h2>
        <h3>RS. {data.price}</h3>
        <button onClick={addToCart}>ADD TO BAG</button>
        <p>{data.details}</p>
      </div>
    </div>
  );
}

export default Productdetails;
