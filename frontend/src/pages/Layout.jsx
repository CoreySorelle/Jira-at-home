import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../App.css";

const Layout = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="nav-main">
        <ul>
          <li>
            <Link to="/"><span className="logo">Jira<br/>At<br/>Home</span></Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <div className="nav-right">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-logout-container">
                  <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
