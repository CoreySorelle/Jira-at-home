import React, { useEffect, useState } from "react";

const WelcomeUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("Unauthorized: No token found.");
          return;
        }

        const response = await fetch("http://localhost:3001/user/get-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log("welcome data: " + data);
        setUser({ fname: data.fname, lname: data.lname });
      } catch (error) {
        setError("Error fetching user data.");
        console.error(error);
      }
    };

    fetchUser();
  }, []);

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
