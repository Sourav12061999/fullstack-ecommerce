import styles from "../styles/payment.module.css";
function Payment() {
  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <input type="text" />
      </div>
      <div className={styles.cart}></div>
    </div>
  );
}

export default Payment;
