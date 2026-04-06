import React from "react";
import { useNavigate } from "react-router-dom";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  const navigate = useNavigate();

  return (
    <div
      className="spot-card"
      onClick={() => navigate(`/spots/${spot.id}`)} // Correct navigation
    >
      <img
        src={spot.images && spot.images[0] ? spot.images[0] : "/images/placeholder.jpg"}
        alt={spot.name}
      />
      <div className="spot-info">
        <h3>{spot.name}</h3>
        <p>{spot.locationDescription || "Location not available"}</p>
        <span className={`badge ${spot.popular ? "popular" : "hidden"}`}>
          {spot.popular ? "Popular" : "Hidden Gem"}
        </span>
      </div>
    </div>
  );
};

export default SpotCard;
