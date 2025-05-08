import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    let userData = { email, password };
    let basicAuthHeader = btoa(`${email}:${password}`);

    try {
      let response = await axios.post(`${API_URL}/user/login`, userData, {
        headers: { Authorization: `Basic ${basicAuthHeader}` }
      });

      sessionStorage.setItem("token", response.data.token);
      login();
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Login Portal</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
		<br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
