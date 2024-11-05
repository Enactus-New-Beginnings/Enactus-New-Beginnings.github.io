import logo from "../img/logo.png";
import "../styles/NewHome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import ReactGA from "react-ga4";
// import { getAnalytics } from "firebase/analytics";
// import {firebase} from '../firebase';

function App() {
  const targetRef = useRef(null);
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "newhome" });
  }, []);
  // const analytics=getAnalytics(firebase)
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="title">New Beginnings</h1>
        <div className="box">
          <p style={{ color: "white", fontSize: "2em" }}>
            Welcome to Rutgers Enactus New Beginnings Web
          </p>
        </div>
        <div className="scroll">
          <Button
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
            }}
            onClick={() =>
              targetRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <FontAwesomeIcon icon={solid("caret-down")} size="2x" />
          </Button>
        </div>
      </header>
      <div ref={targetRef} className="features">
        <div className="features-content">
          <div className="contact">
            <h4>Contact Us</h4>
          </div>
          <h2>About Us</h2>
          <div className="who">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="who-details">
              <h3>Who Are We</h3>
              <p>
                Our mission is to help formerly incarcerated individuals secure
                employment, establish strong relationships with mentors, and
                gain access to local resources in order to ease their transition
                from prison.
              </p>
            </div>
          </div>
          <h2>What We Provide</h2>
          <div className="provide">
            <div className="service">
              <h3>
                <FontAwesomeIcon icon={solid("briefcase")} />
                <br />
              </h3>
              <h3>Local Resource, food/shelter/clothing</h3>
              <p>
                Make use of local resources to find food and clothing shelters.
              </p>
            </div>
            <div className="service">
              <h3>
                <FontAwesomeIcon icon={solid("book")} /> <br />
              </h3>
              <h3>Career help, employ/find right career</h3>
              <p>
                Seek professional help, employment opportunities, and career
                options.
              </p>
            </div>
            <div className="service">
              <h3>
                <FontAwesomeIcon icon={solid("handshake")} /> <br />
              </h3>
              <h3>Resume building with chatbot</h3>
              <p>
                Use our helpful chatbot to help build a strong and impressive
                resume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
