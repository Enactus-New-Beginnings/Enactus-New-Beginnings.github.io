import React, { useEffect, useState } from "react";

const ReadingPage = ({ courseId }) => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const fetchReadings = async () => {
      const data = await import(`../courses/${courseId}/readings.json`);
      setReadings(data.default);
    };
    fetchReadings();
  }, [courseId]);

  return (
    <div className="readings-wrapper">
      <div className="readings">
        <h1>GED Practice</h1>
        {readings.map((reading) => (
          <div key={reading.id} className="card">
            <h3>{reading.title}</h3>
            <p>{reading.description}</p>
            <a href={reading.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingPage;
