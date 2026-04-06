// src/components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";
import { FaHome, FaLocationArrow, FaQuestion, FaUserFriends } from "react-icons/fa";


const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RnR</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/"><FaHome size={20} />Home</Link></li>
        <li><Link to="/spots"><FaLocationArrow size={20} />Spots</Link></li>
        <li><Link to="/guide-request"><FaUserFriends size={20}/>Guides</Link></li>
        <li><Link to="/about"><FaQuestion size={20} />About</Link></li>
      </ul>

      <div className="auth-links">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-btn">Login</Link>
            <Link to="/signup" className="auth-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
