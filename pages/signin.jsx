import styles from "../styles/signin.module.css";
import { useState, useContext } from "react";
import { db } from "../firebase";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { Context2, Context1 } from "./_app";

function Signupin() {
  const [flip, setflip] = useState("");
  const [upUsername, setupUsername] = useState("");
  const [upEmail, setupEmail] = useState("");
  const [upPassword, setupPassword] = useState("");
  const [inEmail, setinEmail] = useState("");
  const [inPassword, setinPassword] = useState("");
  const collectionRef = collection(db, "/users");
  const setsigned = useContext(Context2);
  const signed = useContext(Context1);
  async function Signup() {
    if (upUsername.length > 1 && upEmail.length > 1 && upPassword.length > 1) {
      const q = query(collectionRef, where("email", "==", upEmail));
      const validateData = await getDocs(q);
      if (validateData.docs.length > 0) {
        alert("Email already exists please sign in");
      } else {
        await addDoc(collectionRef, {
          username: upUsername,
          email: upEmail,
          password: upPassword,
          cart: [],
        });
        setflip("rotateY(180deg)");
      }
    } else {
      alert("Please Enter a valid username,email & password");
    }
  }
  async function Signin() {
    if (inEmail.length > 1 && inPassword.length > 1) {
      const q = query(collectionRef, where("email", "==", inEmail));
      const validateData = await getDocs(q);
      let newdata = validateData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (newdata[0]?.password == inPassword) {
        alert("Thank you for signing up");
        setsigned(newdata[0]);
      } else {
        alert("Wrong email id or password");
      }
    }
  }
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.flipcard}>
          <div style={{ transform: flip }} className={styles.flipcardinner}>
            {!signed ? (
              <>
                <div className={styles.flipcardfront}>
                  <h2>Sign up</h2>
                  <input
                    onChange={(e) => {
                      setupUsername(e.target.value);
                    }}
                    placeholder="username"
                    type="text"
                  />
                  <input
                    onChange={(e) => {
                      setupEmail(e.target.value);
                    }}
                    placeholder="email"
                    type="email"
                  />
                  <input
                    onChange={(e) => {
                      setupPassword(e.target.value);
                    }}
                    placeholder="password"
                    type="password"
                  />
                  <button onClick={Signup}>Submit</button>
                  <p
                    onClick={() => {
                      setflip("rotateY(180deg)");
                    }}
                  >
                    Already have an account? Sign in
                  </p>
                </div>
                <div className={styles.flipcardback}>
                  <h2>Sign in</h2>
                  <input
                    onChange={(e) => {
                      setinEmail(e.target.value);
                    }}
                    placeholder="username"
                    type="email"
                  />
                  <input
                    onChange={(e) => {
                      setinPassword(e.target.value);
                    }}
                    placeholder="password"
                    type="password"
                  />
                  <button onClick={Signin}>Submit</button>
                  <p
                    onClick={() => {
                      setflip("");
                    }}
                  >
                    Don't have an account? Sign up
                  </p>
                </div>
              </>
            ) : (
              <div className={styles.signed}>
                <h2>Thank You for Signing up {signed.username}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signupin;
