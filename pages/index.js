import styles from "../styles/Home.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import Productcard from "../Components/productcard";
import Slider from "../Components/slider";
import { useRouter } from "next/dist/client/router";
export default function Home() {
  const [PODS, setPODS] = useState([]);
  const [CELEBRITY, setCELEBRITY] = useState([]);
  const [man, setman] = useState([]);
  const collectionRef = collection(db, "/Products");
  const router = useRouter();
  useEffect(() => {
    async function getPodData() {
      const q = query(collectionRef, where("brand", "==", "PODS"));
      const podData = await getDocs(q);
      setPODS(podData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    async function getCelebrityData() {
      const q = query(collectionRef, where("brand", "==", "CELEBRITY"));
      const celeibrityData = await getDocs(q);
      setCELEBRITY(
        celeibrityData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    async function getManData() {
      const q = query(collectionRef, where("brand", "==", "MISHO MAN"));
      const manData = await getDocs(q);
      setman(manData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPodData();
    getCelebrityData();
    getManData();
  }, []);
  return (
    <main className={styles.main}>
      <Slider styles={styles} />
      <div className={styles.review}>
        <p>"Misho's jewellery resemble work of art"</p>
        <img src="5_star.png" alt="" />
      </div>
      <div className={styles.logos}>
        <img
          src="https://cdn.shopify.com/s/files/1/1691/8723/files/Untitled-1_180b4604-39ba-4fed-8a61-c41bb31a1d9b_300x.png?v=1634565572"
          alt=""
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1691/8723/files/forbes_300x.png?v=1634566452"
          alt=""
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1691/8723/files/whowhatwear_ab7b3e8a-86ee-451a-9320-0f97111654fb_300x.png?v=1634573390"
          alt=""
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1691/8723/files/elle_f6d632c6-16d0-42b1-aaad-a09519e842a3_300x.png?v=1634574067"
          alt=""
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1691/8723/files/wallpaper_300x.png?v=1634576819"
          alt=""
        />
      </div>
      <div className={styles.mustHave}>
        <h3>MISHO MAN</h3>
        <div className={styles.mustHaveProducts}>
          {man.map((POD, i) => {
            return (
              <div
                key={POD.id}
                onClick={() => {
                  router.push(POD.id);
                }}
              >
                {i < 3 ? <Productcard data={POD}></Productcard> : null}
              </div>
            );
          })}
        </div>
        <button>SHOP ALL</button>
      </div>
      <div className={styles.mustHave}>
        <h3>PODS</h3>
        <div className={styles.mustHaveProducts}>
          {PODS.map((POD) => {
            return (
              <div
                key={POD.id}
                onClick={() => {
                  router.push(POD.id);
                }}
              >
                <Productcard data={POD} />
              </div>
            );
          })}
        </div>
        <button>SHOP ALL</button>
      </div>
      <div className={styles.mustHave}>
        <h3>CELEBRITY</h3>
        <div className={styles.mustHaveProducts}>
          {CELEBRITY.map((POD) => {
            return (
              <div
                key={POD.id}
                onClick={() => {
                  router.push(POD.id);
                }}
              >
                <Productcard data={POD} />
              </div>
            );
          })}
        </div>
        <button>VIEW MORE</button>
      </div>
      <div className={styles.journal}>
        <h3>JOURNAL</h3>
        <div className={styles.journalDiv}>
          <div className={styles.journalCard}>
            <div>
              {" "}
              <div>
                <img
                  src="https://cdn.shopify.com/s/files/1/1691/8723/articles/misho-anita-chibba-jewellery-earrings-blog-1_63d7bd11-744b-48b2-8979-eb051400c9d1_600x.jpg?v=1635249582"
                  alt=""
                />
              </div>
            </div>
            <div>
              <h3>A Date with Diet</h3>
              <p>
                New Zealand-born London based Anita Chibba wants to put South
                Asian talent on the map. Her platform ‘Diet Paratha' is taking
                the gram by storm,
              </p>
            </div>
          </div>
          <div className={styles.journalCard}>
            <div style={{ height: "58%" }}>
              <div>
                <img
                  src="https://cdn.shopify.com/s/files/1/1691/8723/articles/misho-richa-moorjani-jewellery-earrings-blog-1_600x.jpg?v=1634227245"
                  alt=""
                />
              </div>
            </div>
            <div style={{ height: "40%" }}>
              <h3>RICHA MOORJANI CELEBRATES THE GLORY OF GROWING UP</h3>
              <p>
                The never have I ever actress reflects on the path that led her
                to playing a role that feels closer to herself that ever before.
              </p>
            </div>
          </div>
          <div className={styles.journalCard}>
            <div>
              <div>
                <img
                  src="https://cdn.shopify.com/s/files/1/1691/8723/articles/misho-shriya-pilgaonkar-jewellery-earrings-blog-1_bb5212df-9ee0-4576-b532-26695edd8e72_600x.jpg?v=1634221724"
                  alt=""
                />
              </div>
            </div>
            <div>
              <h3>A TETE-A-TETE WITH SHIRYA PILGAONKAR</h3>
              <p>
                With a voice sweet as honey, a background in professional
                kathak, and an acting career that celebrates her roots and
                heritage in a unique way, Shri...
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
