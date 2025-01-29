import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Home.css';

// Images (adjust paths as needed)
import logo from '../assets/images/cover360.png'; 
import heroBg from '../assets/images/car111.jpg';
import aboutImg from '../assets/images/home3.jpg';
import servicesImg from '../assets/images/home4.jpg';
import familyImg from '../assets/images/home5.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signin');
  };

  return (
    <div className="home-container">
      
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="Cover360 Logo" className="logo" />
        </div>
        <nav className="navbar">
          <a href="#services">Services</a>
          <a href="#family-coverage">Family Coverage</a>
          <a href="#claims">File a Claim</a>
          <a href="#policies">View Policies</a>
          <a href="#support">Support</a>
          <button className="btn login-button" onClick={handleLoginClick}>
            Log in
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            Welcome to <span>Cover360</span>
          </h1>
          <h2>Your All-in-One Vehicle Insurance</h2>
          <button className="btn cta-button" onClick={handleLoginClick}>
            Get Started
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="split-section" id="mission">
        <div className="split-text">
          <h2>Our Mission</h2>
          <p>
            At Cover360, our purpose is to safeguard every driver’s journey with 
            reliable protection and personalized coverage. We believe you deserve 
            peace of mind behind the wheel—no matter where the road takes you. 
            Trust our dedicated team to stand by your side, so you can focus on what 
            matters most: driving with confidence.
          </p>
        </div>
        {/* 
        If you'd like an image on the right side for the Mission section, 
        you can uncomment this and provide your mission image:
        
        <div className="split-image">
          <img src={missionImg} alt="Mission" />
        </div> 
        */}
      </section>

      {/* About Us Section */}
      <section className="split-section reversed" id="about">
        <div className="split-image">
          <img src={aboutImg} alt="About Cover360" />
        </div>
        <div className="split-text">
          <h2>About Us</h2>
          <p>
            For decades, Cover360 has specialized in vehicle insurance that
            safeguards your mobility. Our expertise ensures that you can focus
            on the road ahead, knowing we’re here to protect your family, your
            car, and your peace of mind.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="split-section" id="services">
        <div className="split-image">
          <img src={servicesImg} alt="Services" />
        </div>
        <div className="split-text">
          <h2>Our Services</h2>
          <ul>
            <li><strong>Accident Coverage:</strong> Comprehensive protection for collisions and disasters.</li>
            <li><strong>Roadside Assistance:</strong> 24/7 help for flat tires, engine trouble, and more.</li>
            <li><strong>Claims Service:</strong> Easy claim processes to get you back on the road fast.</li>
          </ul>
        </div>
      </section>

      {/* Family Coverage Section */}
      <section className="split-section reversed" id="family-coverage">
        <div className="split-image">
          <img src={familyImg} alt="Family Coverage" />
        </div>
        <div className="split-text">
          <h2>Protect Your Loved Ones</h2>
          <p>
            We understand that your family’s safety is a top priority. Our
            specialized coverage options ensure that everyone in your household
            feels secure every time they buckle up. From new drivers to seasoned
            parents, we’ve got you covered.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Contact: +123 456 7890 | support@cover360.com</p>
          <p>Address: 1234 Insurance Lane, YourCity, YS</p>
          <p>&copy; {new Date().getFullYear()} Cover360. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
