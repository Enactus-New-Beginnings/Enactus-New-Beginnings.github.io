import React from 'react';
import '../styles/About.css';

/**
 * Displays some information about New Beginnings and our goal.
 * @module About
 */

export default function About() {
    return (
        <div className="about-container">
            <h1>


            </h1>
            <div className="about-info">
                <div className="info-section">
                    <h1>Information and Statistics</h1>

                </div>
                <div className="image-section">
                    <img
                        src={require('../img/RECIDIVISM.png')}
                        alt="Recidivism Statistics"
                        className="recidivism-image"
                    />
                </div>
            </div>
        </div>
    );
}
