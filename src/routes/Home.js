import logo from "../img/logo.png";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga4";
// import { getAnalytics } from "firebase/analytics";
// import {firebase} from '../firebase';

function App() {
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "home" });
  }, []);
  // const analytics=getAnalytics(firebase)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">
          New <br />
          Beginnings
        </h1>
        <div className="box">
          <p style={{ color: "black" }}>
            Our mission is to help formerly incarcerated individuals secure
            employment, establish strong relationships with mentors, and gain
            access to local resources in order to ease their transition from
            prison.
          </p>
        </div>
      </header>
      <div className="features">
        <Container>
          <Row>
            <Col sm="4">
              <h3>
                <FontAwesomeIcon icon={solid("briefcase")} />
                <br />
                Employment
              </h3>
              <p>
                Reach out to employers who don’t discriminate based on the past.
                Create an account and upload your resume to get matched with
                oppurtunities most relevant to you!
              </p>
              <Link to="/profile#resume">
                <Button color="primary" size="lg" style={{ margin: "2%" }}>
                  Upload Your Resume
                </Button>
              </Link>
              <br />
              <Link to="/employment">
                <Button color="primary" size="lg" style={{ margin: "2%" }}>
                  View Employers
                </Button>
              </Link>
            </Col>
            <Col sm="4">
              <h3>
                <FontAwesomeIcon icon={solid("book")} /> <br />
                Resources
              </h3>
              <p>
                Here you can find a curriculum to guide your professional
                development, as well as other local resources: affordable
                housing, local support groups, transportation etc.{" "}
              </p>
              <Link to="/resources/food">
                <Button color="success" size="lg" style={{ margin: "2%" }}>
                  Local Resources
                </Button>
              </Link>
              <br />
              <Link to="/resources/videos/career">
                <Button color="success" size="lg" style={{ margin: "2%" }}>
                  Video Tutorials
                </Button>
              </Link>
            </Col>
            <Col sm="4">
              <h3>
                <FontAwesomeIcon icon={solid("handshake")} /> <br />
                Mentorship
              </h3>
              <p>
                Connect with like-minded people who turned their lives around
                upon re-entering society. Studies show that people with strong
                mentors are twice as likely to get employed.{" "}
              </p>
              <Button
                color="warning"
                size="lg"
                style={{ margin: "2%" }}
                disabled
              >
                Coming Soon!
              </Button>
            </Col>
            <Col sm="4" style={{ margin: 'auto', textAlign: 'center' }}>
              <h3>
                <FontAwesomeIcon icon={solid("envelope")} />
                <br />
                Contact Us
              </h3>
              <p>
                Get in contact with us, via email, regarding any questions, concerns, or opportunities.
              </p>
              <Link to="/contact">
                <Button color="danger" size="lg" style={{ margin: "2%" }}>
                  Deliver Email
                </Button>
              </Link>
              {/* <br /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
