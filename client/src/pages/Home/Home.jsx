import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import SpotCard from "../../components/SpotCard/SpotCard";
import "./Home.css";
import {FaSign, FaPlaneDeparture, FaSignature} from "react-icons/fa";

const Home = () => {
  const [popularSpots, setPopularSpots] = useState([]);
  const [hiddenSpots, setHiddenSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpots = async () => {
      const spotsRef = collection(db, "touristSpots");

      const popularQuery = query(spotsRef, where("popular", "==", true));
      const popularSnap = await getDocs(popularQuery);
      setPopularSpots(popularSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const hiddenQuery = query(spotsRef, where("popular", "==", false));
      const hiddenSnap = await getDocs(hiddenQuery);
      setHiddenSpots(hiddenSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchSpots();
  }, []);

  const categories = [
    { name: "Temples", Image: "D:/RnR/client/public/images/temple.jpg" },
    { name: "Nature", Image: "D:/RnR/client/public/images/temple.jpg" },
    { name: "Spiritual", Image: "/images/icons/spiritual.png" },
    { name: "Shops", Image: "/images/icons/shop.png" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="fade-in">Discover the Hidden Gems of Jharkhand</h1>
          <p className="fade-in delay-1">Temples, Nature, Spiritual Spots, and More</p>
          <div className="hero-buttons fade-in delay-2">
            <button onClick={() => navigate("/spots")}><FaPlaneDeparture size={20} />Explore Spots</button>
            <button onClick={() => navigate("/guide-request")}><FaSignature size={20} />Hire a Guide</button>
          </div>
        </div>
      </div>

      {/* Popular Spots Carousel */}
      <h2 className="section-title fade-up">Popular Spots</h2>
      <div className="spots-carousel fade-up">
        {popularSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>

      {/* Hidden Gems Carousel */}
      <h2 className="section-title fade-up">Hidden Gems</h2>
      <div className="spots-carousel fade-up">
        {hiddenSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>

      {/* Categories Section */}
      <h2 className="section-title fade-up">Explore by Category</h2>
      <div className="categories-grid fade-up">
        {categories.map((cat) => (
          <div
            className="category-card"
            key={cat.name}
          >
            <img src={cat.img} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Hire Guide Section */}
      <div className="hire-guide-section fade-up">
        <img src="/images/guides-hero.jpg" alt="Hire Guide" className="tilt-hover"/>
        <div className="hire-guide-text">
          <h2>Hire a Guide</h2>
          <p>Get local experts to show you hidden spots and save time!</p>
          <button onClick={() => navigate("/guide-request")}>Hire Now</button>
        </div>
      </div>
      </div>
  );
};

export default Home;
