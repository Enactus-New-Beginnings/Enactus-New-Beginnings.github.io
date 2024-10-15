import React from 'react';
import "../styles/Home.css";
import { Link, Element } from 'react-scroll';
import { Button } from "reactstrap";
import Logo from '../img/logo.png';

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

      {/* About Section */}
      <Element name="about" className="about-page">
        <h1>Our Mission</h1>
        <p>
          Our mission is to help formerly incarcerated individuals secure
          employment, establish strong relationships with mentors, and gain
          access to local resources in order to ease their transition from
          prison.
        </p>
        <div className="about-info-box">
          <img src= "../img/logo.png" alt="Description" />
          <div className="about-info-box-content">
           <h2>Support and Guidance</h2>
         <p>We provide training, job matching, and personal mentoring to ensure the success of our participants.</p>
        </div>  
          </div>
        <Link to="info" smooth={true} duration={200}>
          <div className="arrow">&#9660;</div>
        </Link>
      </Element>

      {/* Services Section */}
      <Element name="info" className="info-page">
        <h2>Our Services</h2>
        <div className="info-box-container">
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
          <a href="mailto:enactusnewbeginning@gmail.com">
            <Button color="danger" size="small" style={{ margin: "2%" }}>
              Send Us An Email
            </Button>
          </a>
        </p>
      </Element>
    </div>
  );
};

export default Home;
