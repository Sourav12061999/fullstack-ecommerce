import styles from "../styles/productcard.module.css";
import { useState } from "react";
function Productcard({ data }) {
  const [imageLink, setimageLink] = useState(data.image1);
  return (
    <div className={styles.productcard}>
      <div>
        <div
          onMouseEnter={() => {
            setimageLink(data.image2);
          }}
          onMouseLeave={() => {
            setimageLink(data.image1);
          }}
        >
          <img src={imageLink} alt="" />
        </div>
      </div>
      <div>
        <p>{data.name}</p>
        <p>{data.price}</p>
      </div>
    </div>
  );
}

export default Productcard;
