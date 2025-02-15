import React, { useState, useEffect } from "react";
import SignUp from "../components/SignUp";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    }, []);
  
    return (
      <>
        <div className="title-div">
          <p>Me: Mom, can we get Jira?</p>
          <p>Mom: we have Jira at home</p>
          <h1 className="app-header">Jira At Home</h1>
        </div>
        {isLoggedIn ? <h2>Welcome</h2> : <SignUp />}
      </>
    );
  };
  
  export default Home;