import React, { useState } from "react";
import "../App.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    street: "",
    city: "",
    zip: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      const data = await response.json();
      console.log("Account created successfully:", data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      {Object.keys(formData).map((key) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key}>{key}</label>
          <input
            type={key === "password" ? "password" : key === "dob" ? "date" : "text"}
            name={key}
            id={key}
            value={formData[key]}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </form>
  );
};

export default SignUp;