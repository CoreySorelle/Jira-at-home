import { Outlet, Link } from "react-router-dom";
import "../App.css";

const Layout = () => {
  return (
    <>
      <nav className="nav-main">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/board">Board</Link>
          </li>
        </ul>
      </nav>
      
        <Outlet />
      
     
    </>
  )
};

export default Layout;