import React, { useEffect, useState } from 'react';
import "../styles/ReadingsPage.css"; // Add your styles

const ReadingsPage = () => {
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the readings data from the public folder
    fetch('/data/readings.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch readings data");
        }
        return response.json();
      })
      .then((data) => setReadings(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (readings.length === 0) {
    return <div className="loading-message">Loading readings...</div>;
  }

  return (
    <div className="readings-page">
      <h1>Readings</h1>
      <ul className="readings-list">
        {readings.map((reading) => (
          <li key={reading.id} className="reading-item">
            <h2>{reading.title}</h2>
            <p>{reading.description}</p>
            <a href={reading.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingsPage;
