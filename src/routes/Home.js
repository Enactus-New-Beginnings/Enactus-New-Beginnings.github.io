import "../styles/Home.css";
import { Link, Element } from "react-scroll";
import { Button } from "reactstrap";
import Logo from "../img/logo.png";

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
        <h1>A Little Bit About Us...</h1>

        {/* Statistics and Mission Section */}
        <div className="about-info-section">
          {/* Statistics Section */}
          <div className="statistics-section">
            <h3 className="label-statistics-label">Meet the Team!</h3>
            {/*<img src={Stat} alt="Rutgers Enactus" className="statistics-image" />*/}
          </div>

          {/* Our Mission Section */}
          <div className="mission-section">
            <h3 className="label-mission-label">Our Mission Statement:</h3>
            <p className="mission-description">
              To provide essential resources, job opportunities, and education
              to support incarcerated and recently released individuals,
              fostering a sustainable program that enhances their quality of
              life and community reintegration.
            </p>
          </div>
        </div>

        <Link to="info" smooth={true} duration={200}>
          <div className="arrow">&#9660;</div>
        </Link>
      </Element>

      {/* Services Section */}
      <Element name="info" className="info-page" style={{ backgroundColor: "#f0f0f0" }}>
        <h2>What do we offer?</h2>
        <div className="info-box-container">
          <div className="info-box">
            <h3>Resources</h3>
            <p>Find housing, educational programs, and other essential support.</p>
          </div>
          <div className="info-box">
            <h3>Career Opportunities</h3>
            <p>
              Connect with employers and access job training programs tailored
              to your needs.
            </p>
          </div>
          <div className="info-box">
            <h3>Chatbot Assistance</h3>
            <p>
              Get real-time help with our chatbot for questions regarding
              reentry into society.
            </p>
          </div>
        </div>
        <p className="contact">
          Contact Us: <br /> rutgers.newbeginnings@gmail.com
          <br />
          <a href="mailto:rutgers.newbeginnings@gmail.com">
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

