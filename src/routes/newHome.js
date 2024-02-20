import React from "react";
import "../styles"; // Adjust the path as needed

const NewHome = () => {
  // JavaScript functions can be defined here.
  // For example, if you have a scrollToTop function in your original HTML, you can define it here.
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // The return statement contains your HTML converted to JSX
  return (
    <>
      <header>
        <div id="particles"></div>
        <div className="info-text">
          <h1>New Beginnings</h1>
          <h3>Welcome to Rutgers Enactus New Beginnings Web</h3>
          <a href="#about" className="scroll">
            <i className="bx bxs-down-arrow"></i>
          </a>
        </div>
      </header>

      <section id="about">
        <div className="header">
          <h1>about us</h1>
          <a href="#">contact us</a>
        </div>

        <div className="card">
          <img src="../img/logo.png" alt="Logo" />
          <div className="info">
            <h1>Who are we????</h1>
            {/* Content */}
          </div>
        </div>
      </section>

      <section id="features">
        <div className="header">
          <h1>What We Provide</h1>
        </div>
        <div className="feature-cards">{/* Cards */}</div>
      </section>

      <button className="scroll-top" onClick={scrollToTop}>
        <i className="bx bxs-up-arrow"></i>
      </button>

      {/* External scripts can be loaded here if needed */}
    </>
  );
};

export default NewHome;
