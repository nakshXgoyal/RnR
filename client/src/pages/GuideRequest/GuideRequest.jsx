import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import "./GuideRequest.css";

const GuideRequest = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const guidesRef = collection(db, "guides");
        const snap = await getDocs(guidesRef);
        const allGuides = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setGuides(allGuides);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="guide-page">
      <div className="guide-hero">
        <h1 className="fade-up">Hire a Guide in Jharkhand</h1>
        <p className="fade-up">Find experienced local guides to explore hidden gems</p>
      </div>

      <div className="guides-grid">
        {guides.length > 0 ? (
          guides.map((guide) => (
            <div key={guide.id} className="guide-card fade-up">
              <div className="guide-info">
                <h3>{guide.name}</h3>
                <p><strong>Experience:</strong> {guide.experience} Years</p>
                <p><strong>Location:</strong> {guide.location}</p>
                <div className="rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < (guide.rating || 0) ? "filled" : ""}>★</span>
                  ))}
                </div>
                <button>Hire Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-guides-msg">Loading guides...</p>
        )}
      </div>
    </div>
  );
};

export default GuideRequest;
