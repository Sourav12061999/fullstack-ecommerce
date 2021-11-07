import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import Productcard from "../Components/productcard";
import styles from "../styles/plist.module.css";
import { useRouter } from "next/dist/client/router";
function Productlist() {
  const collectionRef = collection(db, "/Products");
  const [data, setdata] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      const d = await getDocs(collectionRef);
      setdata(d.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getData();
  }, []);
  return (
    <div className={styles.list}>
      {data.map((el) => {
        return (
          <div
            key={el.id}
            onClick={() => {
              router.push(el.id);
            }}
          >
            <Productcard data={el} />
          </div>
        );
      })}
    </div>
  );
}

export default Productlist;
