function Slider({ styles }) {
  let imageArr = [
    "https://cdn.shopify.com/s/files/1/1691/8723/files/MISHO-designs-pearl-zodiacs_1440x640_fa2720e3-f3be-4d7f-a073-cdb860b39569_1600x.jpg?v=1618589300",
    "https://cdn.shopify.com/s/files/1/1691/8723/files/misho-earrings-tidal-hoops-enamel-cuffs-jewellery-1_1600x.jpg?v=1634307991",
    "https://cdn.shopify.com/s/files/1/1691/8723/files/misho-airpods-earrings-pebble-pods-jewellery-gold_1600x.jpg?v=1634307415",
  ];
  return (
    <div className={styles.slider}>
      <div>
        <img src={imageArr[0]} alt="" />
      </div>
    </div>
  );
}

export default Slider;
