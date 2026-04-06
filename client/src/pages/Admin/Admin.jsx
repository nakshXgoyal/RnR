import { useState } from "react";
import { addSpot } from "../../services/spotService";
import { addGuide } from "../../services/guideService";
import "./Admin.css";

const Admin = () => {
  const [spotData, setSpotData] = useState({
    name: "",
    description: "",
    category: "",
    locationDescription: "",
    images: ""
  });

  const [guideData, setGuideData] = useState({
    name: "",
    experience: "",
    languages: "",
    contact: ""
  });

  const handleSpotChange = (e) => {
    setSpotData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGuideChange = (e) => {
    setGuideData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpotSubmit = async (e) => {
    e.preventDefault();
    await addSpot({
      ...spotData,
      images: spotData.images.split(",").map((url) => url.trim()),
      rating: 0,
    });
    alert("✅ Tourist spot added successfully!");
    setSpotData({ name: "", description: "", category: "", locationDescription: "", images: "" });
  };

  const handleGuideSubmit = async (e) => {
    e.preventDefault();
    await addGuide({
      ...guideData,
      experience: Number(guideData.experience),
      languages: guideData.languages.split(",").map((lang) => lang.trim()),
      rating: 0,
    });
    alert("✅ Guide added successfully!");
    setGuideData({ name: "", experience: "", languages: "", contact: "" });
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage tourist spots and guides</p>
      </header>

      <div className="admin-container">
        {/* Add Tourist Spot */}
        <div className="admin-card">
          <h2>Add Tourist Spot</h2>
          <form onSubmit={handleSpotSubmit} className="admin-form">
            <input name="name" placeholder="Spot Name" value={spotData.name} onChange={handleSpotChange} required />
            <textarea name="description" placeholder="Description" value={spotData.description} onChange={handleSpotChange} required />
            <input name="category" placeholder="Category (Temple/Nature/etc.)" value={spotData.category} onChange={handleSpotChange} required />
            <input name="locationDescription" placeholder="Location Description" value={spotData.locationDescription} onChange={handleSpotChange} required />
            <input name="images" placeholder="Image URLs (comma-separated)" value={spotData.images} onChange={handleSpotChange} required />
            <button type="submit" className="admin-btn primary">Add Spot</button>
          </form>
        </div>

        {/* Add Guide */}
        <div className="admin-card">
          <h2>Add Guide</h2>
          <form onSubmit={handleGuideSubmit} className="admin-form">
            <input name="name" placeholder="Guide Name" value={guideData.name} onChange={handleGuideChange} required />
            <input name="experience" placeholder="Experience (years)" value={guideData.experience} onChange={handleGuideChange} required />
            <input name="languages" placeholder="Languages (comma-separated)" value={guideData.languages} onChange={handleGuideChange} required />
            <input name="contact" placeholder="Contact Number" value={guideData.contact} onChange={handleGuideChange} required />
            <button type="submit" className="admin-btn success">Add Guide</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
