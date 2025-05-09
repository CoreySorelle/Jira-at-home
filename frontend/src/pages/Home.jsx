import React, { useState, useEffect } from "react";
import Hero from "../components/hero";
import Dashboard from "../components/Dashboard";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    }, []);
  
    return (
      <>
        <div style={{ height: "20px" }}></div>

        {isLoggedIn ? <Dashboard/> : <Hero/>}
      </>
    );
  };
  
  export default Home;