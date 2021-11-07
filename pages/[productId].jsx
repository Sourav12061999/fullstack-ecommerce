import {
  collection,
  query,
  where,
  getDoc,
  doc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import styles from "../styles/productdetails.module.css";
function Productdetails() {
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
          console.log(data);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    }
    getData();
  }, [productId]);
  async function addToCart() {
    if (db && doc) {
      const cartRef = collection(db, "Carts");
      const q = query(cartRef, where("productId", "==", productId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // console.log({ ...data,productId});
        await addDoc(cartRef, { ...data, productId, quantity: 1 });
      }
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
