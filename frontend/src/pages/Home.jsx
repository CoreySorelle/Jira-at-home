import React, { useState, useEffect } from "react";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";

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
        {isLoggedIn ? <Dashboard/> : <SignUp />}
      </>
    );
  };
  
  export default Home;