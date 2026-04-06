import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="overlay">
          <h1>About RnR - Roots & Routes</h1>
          <p>Discover Jharkhand like never before</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="about-content fade-up">
        <h2>Our Mission</h2>
        <p>
          RnR (Roots & Routes) is a tourism platform built to uncover the 
          hidden gems of Jharkhand. From ancient temples and breathtaking 
          natural spots to spiritual journeys and vibrant local shops, 
          our mission is to connect you with the true essence of Jharkhand.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Explore popular and hidden tourist destinations</li>
          <li>Hire experienced local guides for a better experience</li>
          <li>Get insights into temples, nature, culture, and spirituality</li>
          <li>Support local businesses and traditions</li>
        </ul>

        <h2>Why Choose Us?</h2>
        <p>
          We are not just a tourism app; we are storytellers of Jharkhand. 
          Every route leads you to the roots of culture, spirituality, and nature.
        </p>
      </div>
    </div>
  );
};

export default About;
