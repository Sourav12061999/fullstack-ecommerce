import "../styles/globals.css";
import Navbar from "../Components/navbar";
import "../styles/Navbar.css";
import React from "react";
import { useState } from "react";
export const Context1 = React.createContext();
export const Context2 = React.createContext();
function MyApp({ Component, pageProps }) {
  const [signedup, setsignedup] = useState(false);
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <Context1.Provider value={signedup}>
      <Context2.Provider value={setsignedup}>
        <Navbar />
        <Component {...pageProps} />
      </Context2.Provider>
    </Context1.Provider>
  );
}

export default MyApp;
