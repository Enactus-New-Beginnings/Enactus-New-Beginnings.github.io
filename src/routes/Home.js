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

      <Element name="about" className="about-page">
  <h1>About Our Project</h1>
  <div className="about-info-box">
  {/* Statistics Box */}
  <div className="info-box statistics-box">
    <h3 className="label-statistics-label">Statistics</h3>
    <div className="statistics-content">
      <img src={Logo} alt="Rutgers Enactus" className="statistics-image" />
      <figcaption>"This is caption, insert something"</figcaption>
    </div>
  </div>

  {/* Our Mission Box */}
  <div className="info-box mission-box">
    <h3 className="label-what-we-do-label">Our Mission</h3>
    <p>To provide essential resources, job opportunities, 
      and education to support incarcerated and recently
       released individuals, fostering a sustainable 
       program that enhances their quality of life and community reintegration.</p>
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
