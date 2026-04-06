const GuideCard = ({ guide }) => {
  return (
    <div className="guide-card">
      <h3>{guide.name}</h3>
      <p>Experience: {guide.experience} years</p>
      <p>Languages: {guide.languages.join(", ")}</p>
      <p>Contact: {guide.contact}</p>
      <p>Rating: {guide.rating}</p>
    </div>
  );
};

export default GuideCard;
