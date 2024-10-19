import React, { useState } from 'react';
import "../styles/Home.css";
import { Link, Element } from 'react-scroll';
import { Button } from "reactstrap";
import Logo from '../img/logo.png';
import Test from '../img/error-bg.jpg';

// Array of carousel images
const carouselImages = [
  { id: 1, url: Logo, alt: 'Image 1' },
  { id: 2, url: Test, alt: 'Image 2' },
  { id: 3, url: '/path-to-image3.jpg', alt: 'Image 3' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage current slide index

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      {/* Carousel slides */}
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselImages.map((image) => (
          <div key={image.id} className="carousel-slide">
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

const Home = () => {
  return (
    <div className="common-container">
      {/* Homepage Section */}
      <div className="homepage">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>New Beginnings</h1>
        <h2>A Rutgers Enactus Initiative</h2>
        <Link to="about" smooth={true} duration={200}>
          <div className="arrow">&#9660;</div>
        </Link>
      </div>

      <Element name="about" className="about-page">
  <h1>Our Mission</h1>
  <div className="about-info-box">
    {/* Labels */}
    <div className="info-labels">
      <h3 className="label-statistics-label">Statistics</h3>
      <h3 className="label-what-we-do-label">What We Do</h3>
    </div>
    <div className="flex-container">
      <div className="about-info-text">
       <img src={Logo} alt="Rutgers Enactus" className="about-banner-image" />
        <p>
          Rutgers Enactus New Beginnings is a dedicated initiative with the mission of assisting formerly incarcerated individuals in their journey towards societal reintegration and self-sufficiency. Our primary focus is on the state of New Jersey, aiming to reduce the recidivism rate by providing essential resources such as food, shelter, and potential job opportunities.
        </p>
        <div class="divider"></div>
      </div>
      <Carousel />
    </div>
  </div>
  <Link to="info" smooth={true} duration={200}>
    <div className="arrow">&#9660;</div>
  </Link>
</Element>



      {/* Services Section */}
      <Element name="info" className="info-page" style={{ backgroundColor: "#f0f0f0" }}>
        <h2>What we offer</h2>
           {/* black border Section */}
        <div className="info-box-container" style={{ backgroundColor: "#997f84" }}>  
          <div className="info-box">
            <h3>Resources</h3>
            <p>Find housing, educational programs, and other essential support.</p>
          </div>
          <div className="info-box">
            <h3>Career Opportunities</h3>
            <p>Connect with employers and access job training programs tailored to your needs.</p>
          </div>
          <div className="info-box">
            <h3>Chatbot Assistance</h3>
            <p>Get real-time help with our chatbot for questions regarding reentry into society.</p>
          </div>
        </div>
        <p className="contact">
          Contact Us: <br /> 555-555-5555
          <br />
          <a href="mailto:enactusnewbeginning@gmail.com">
            <Button color="danger" size="small" style={{ margin: "2%" }}>
              Send Us An Email
            </Button>
          </a></p>
      </Element>
    </div>
  );
};

export default Home;
