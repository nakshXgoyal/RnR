import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import "./SpotDetail.css";

const SpotDetail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const spotRef = doc(db, "touristSpots", id);
        const snap = await getDoc(spotRef);
        if (snap.exists()) {
          setSpot({ id: snap.id, ...snap.data() });
        } else {
          console.error("Spot not found with id:", id);
          setSpot(null);
        }
      } catch (error) {
        console.error("Error fetching spot:", error);
        setSpot(null);
      }
    };
    fetchSpot();
  }, [id]);

  if (!spot) return <p className="loading-msg">Loading spot details...</p>;

  return (
    <div className="spot-detail-page">
      {/* Hero Image */}
      {spot.images && spot.images.length > 0 && (
        <div
          className="spot-hero"
          style={{ backgroundImage: `url(${spot.images[0]})` }}
        >
          <div className="hero-overlay">
            <h1>{spot.name}</h1>
            <p>{spot.location || "Location not available"}</p>
          </div>
        </div>
      )}

      {/* Spot Info */}
      <div className="spot-info fade-up">
        <span className={`badge ${spot.popular ? "popular" : "hidden"}`}>
          {spot.popular ? "Popular" : "Hidden Gem"}
        </span>
        <p className="category">{spot.category || "Category N/A"}</p>

        <div className="rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < (spot.rating || 0) ? "filled" : ""}>
              ★
            </span>
          ))}
        </div>

        <p className="description">{spot.description || "No description available."}</p>
        <p className="details">
          <strong>Timings:</strong> {spot.timings || "N/A"} <br />
          <strong>Entry Fee:</strong> {spot.entryFee || "Free"} <br />
          <strong>Nearby Attractions:</strong> {spot.nearby || "N/A"}
        </p>

        <button
          className="hire-guide-btn"
          onClick={() => navigate("/guide-request")}
        >
          Hire a Guide
        </button>
      </div>

      {/* Image Carousel */}
      {spot.images && spot.images.length > 1 && (
        <div className="spot-carousel fade-up">
          {spot.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${spot.name} ${idx + 1}`} />
          ))}
        </div>
      )}

      {/* Reviews Section */}
      {spot.reviews && spot.reviews.length > 0 && (
        <div className="reviews-section fade-up">
          <h2>Reviews</h2>
          {spot.reviews.map((rev, idx) => (
            <div key={idx} className="review-card">
              <p className="review-text">"{rev.comment}"</p>
              <p className="review-author">- {rev.user}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotDetail;
