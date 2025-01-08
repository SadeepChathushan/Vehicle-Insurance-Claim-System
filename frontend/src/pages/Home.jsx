import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Home.css';
import logo from '../assets/images/cover360.png';
// import logo from '../assets/images/';

import hero from '../assets/images/home/baby.jpg';
import service1 from '../assets/images/home/service 1.png';
import service2 from '../assets/images/home/service 2.png';
import service3 from '../assets/images/home/service 3.png';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/signin');
    };

    return (
        <div>
            {/* Navbar Section */}
            <header className="header">
                <img src={logo} alt="Maternease Logo" className="logo"/>
                <span className="name" style={{color: '#1e90ff', fontSize: '25px'}}>Cover360</span>  
                {/* #1e90ff */}
                <nav className="navbar">
                    <a href="#about">About Us</a>
                    <a href="#mission">Mission</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact Us</a>
                    <button className="login-button" onClick={handleLoginClick}>Log in</button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <img src={hero} alt="Mother and baby" className="hero-image"/>
                <div className="hero-overlay"></div>
                <div className="hero-text">
                    <h1 className="heading">Welcome to <span className="large-text">MaternEase</span></h1>
                    <h1 className="heading">Maternity and Child Clinic Management System</h1>
                    <h2 className="sub-heading">Providing compassionate care for mothers and children.</h2>
                    <button className="sign-up-button login-button" onClick={handleLoginClick}>Get
                        Started
                    </button>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission">
                <div className="mission-description">
                    <h1 className="heading">Mission</h1>
                    <p>
                        Our mission is to offer comprehensive, high-quality maternity and pediatric care by enhancing the overall effectiveness and
                        accessibility of healthcare services for expectant mothers, their children, and healthcare providers. We strive to
                        create a supportive and nurturing environment for families, empowering them through every stage of pregnancy and
                        childhood.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="about-us" id="about">
                <h2 className="heading">About Us</h2>
                <div className="about-content">
                    <p>At MaternEase, we are dedicated to providing exceptional care for mothers and children. Our team of experienced healthcare professionals is committed to ensuring the health and well-being of every family we serve.</p>
                </div>
            </section>

            {/* Services Section */}
            <section className="services" id="services">
                <h2 className="heading">Services</h2>
                <div className="service-list">
                    <div className="service-item">
                        <p className="sub-heading">Digitalized Record Keeping</p>
                        <img src={service1} alt="Service 1"/>
                        <p className="description"> Access and manage your medical reports seamlessly;
                            from anywhere and at any time, ensuring that your
                            health information is always at your fingertips.</p>
                    </div>
                    <div className="service-item">
                        <p className="sub-heading">Data Visualization</p>
                        <img src={service2} alt="Service 2"/>
                        <p className="description">Experience clear and insightful representations of your health data, track your progress over time to take
                            decisions about your health .</p>
                    </div>
                    <div className="service-item">
                        <p className="sub-heading">Appointment Management</p>
                        <img src={service3} alt="Service 3"/>
                        <p className="description">Simplify scheduling and managing your clinical visits by managing appointments online, and receive timely reminders to ensure you never
                            miss a critical visit.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-us" id="contact">
                <h2 className="heading">Contact Us</h2>
                {/*<p className="contact-intro">Get in touch with us to book an appointment or learn more about our services.</p>*/}
                {/*<div className="contact-details">*/}
                {/*    <p><strong>Phone:</strong> 123-456-7890</p>*/}
                {/*    <p><strong>Email:</strong> info@maternEase.com</p>*/}
                {/*    <p><strong>Address:</strong> 1234 Clinic Road, City, State, ZIP</p>*/}
                {/*</div>*/}
                <form className="contact-form">
                    <input type="text" placeholder="Your Name" required/>
                    <input type="email" placeholder="Your Email" required/>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </section>

            {/* Footer Section */}
            <footer>
                <div className="footer-container">
                    <div className="footer-contact-details">
                        <h3>Contact Details</h3>
                        <p><strong>Phone:</strong> 123-456-7890</p>
                        <p><strong>Email:</strong> info@maternEase.com</p>
                        <p><strong>Address:</strong> 1234 Clinic Road, City, State, ZIP</p>
                    </div>
                    <div className="footer-quick-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#mission">Mission</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-about">
                        <p><br/>
                            MaternEase is dedicated to providing exceptional care for mothers and children. Our team of
                            experienced healthcare professionals is committed to ensuring the health and well-being of
                            every family we serve.</p>
                    </div>
                </div>
                <p className="footer-bottom">All Rights Reserved 2024 | MaternEase</p>
            </footer>
        </div>
    );
}

export default Home;
