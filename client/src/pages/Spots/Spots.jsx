import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import SpotCard from "../../components/SpotCard/SpotCard";
import "./Spots.css";

const Spots = () => {
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [categories, setCategories] = useState(["All", "Temples", "Nature", "Spiritual", "Shops"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // search term state
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSpots = async () => {
      const spotsRef = collection(db, "touristSpots");
      const snap = await getDocs(spotsRef);
      const allSpots = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setSpots(allSpots);

      // Apply category filter from query
      const category = searchParams.get("category");
      if(category) {
        setActiveCategory(category);
        setFilteredSpots(allSpots.filter(s => s.category === category));
      } else {
        setFilteredSpots(allSpots);
      }
    };

    fetchSpots();
  }, [searchParams]);

  // Handle category click
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    filterSpots(searchTerm, cat);
  }

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterSpots(term, activeCategory);
  }

  // Filter spots based on search term + category
  const filterSpots = (term, category) => {
    let filtered = spots;

    if(category && category !== "All") {
      filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if(term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(s => 
        (s.name && s.name.toLowerCase().includes(lowerTerm)) ||
        (s.location && s.location.toLowerCase().includes(lowerTerm)) ||
        (s.category && s.category.toLowerCase().includes(lowerTerm))
      );
    }

    setFilteredSpots(filtered);
  }

  return (
    <div className="spots-page">
      {/* Hero / Header */}
      <div className="spots-banner">
        <div className="banner-overlay">
          <h1 className="fade-up delay-1">Explore Jharkhand</h1>
          <p className="fade-up delay-2">Discover hidden gems, temples, nature, and more!</p>
        </div>
      </div>
      <div className="spots-hero">
        <h1 className="fade-up delay-3">{activeCategory === "All" ? "All Spots" : activeCategory}</h1>
        <p className="fade-up delay-4">Discover the best places in Jharkhand</p>
      </div>

      {/* Search Bar */}
      <div className="spots-search">
        <input
          type="text"
          placeholder="Search by name, location, or category..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>



      {/* Category Filters */}
      <div className="spots-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spots Grid */}
      <div className="spots-grid">
        {filteredSpots.length > 0 ? (
          filteredSpots.map(spot => <SpotCard key={spot.id} spot={spot} />)
        ) : (
          <p className="no-spots-msg">No spots found.</p>
        )}
      </div>
    </div>
  );
};

export default Spots;
