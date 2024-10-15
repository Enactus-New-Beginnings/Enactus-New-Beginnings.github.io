import React from 'react';
import "../styles/Home.css";
import { Link, Element } from 'react-scroll';
import { Button} from "reactstrap";
import Logo from '../img/logo.png';
const Home = () => {
        return (
    <div className="common-container">
      <div className="homepage">
      
        <img src={Logo} alt="Logo" className="logo" />
        <h1>New Beginnings</h1>
        <h2> A Rutgers Enactus Initiative</h2>
        <Link to="about" smooth={true} duration={200}>
          <div className="arrow">&#9660;</div>
        </Link>
      </div>

      <Element name="about" className="about-page">
        <h1>Our Mission</h1>
        <p>
            Our mission is to help formerly incarcerated individuals secure
            employment, establish strong relationships with mentors, and gain
            access to local resources in order to ease their transition from
            prison.
          </p>
        <div className="about-info-box">
          <h2>--</h2>
              <p></p></div>
        <Link to="info" smooth={true} duration={200}>
          <div className="arrow">&#9660;</div>
        </Link>
      </Element> 

      <Element name="info" className="info-page">
        <h2>Services</h2>
        <div className="info-box-container">
          <div className="info-box">
            <h3>Resources</h3>
            <p>Lalalalalala</p>
          </div>
          <div className="info-box">
            <h3>Career</h3>
            <p>Lalalalalala</p>
          </div>
          <div className="info-box">
            <h3>Chatbot</h3>
            <p>Lalalalalala</p>
          </div>
        </div>
        <p className="contact">Contact Us<p>555-555-5555</p>
        <a href="mailto:enactusnewbeginning@gmail.com">
                <Button color="danger" size="small" style={{ margin: "2%" }}>
                  Send Us An Email
                </Button>
              </a></p>
      </Element>
    </div>
  );
};


export default Home
