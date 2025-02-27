import React, { useEffect, useState } from "react";

const WelcomeUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      console.log("Token:", token);  // Log token to ensure it's correct

      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/user/get-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API response:", response);  // Log API response

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log("User data:", data);  // Log user data from the response

        if (!data) {
          setError("User data not found in the response.");
          return;
        }

        setUser(data);  // Correctly set user from `data.user`
      } catch (error) {
        setError("Error fetching user data.");
        console.error(error);
      }
    };

    fetchUser();
  }, []);  // Empty dependency array ensures the effect runs only once

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 bg-gray-100 border rounded-md">
      <h1 className="text-xl font-semibold">Welcome, {user.fname} {user.lname}!</h1>
    </div>
  );
};

export default WelcomeUser;
