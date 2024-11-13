import React, { useEffect, useState } from "react";

const VideoPage = ({ courseId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await import(`../courses/${courseId}/videos.json`);
      setVideos(data.default);
    };
    fetchVideos();
  }, [courseId]);

  return (
    <div className="videos">
      <h1>Videos</h1>
      {videos.map((video) => (
        <div key={video.id} className="card">
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <a href={video.link} target="_blank" rel="noopener noreferrer">
            Watch Video
          </a>
        </div>
      ))}
    </div>
  );
};

export default VideoPage;
