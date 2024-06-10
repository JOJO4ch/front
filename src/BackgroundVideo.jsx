// BackgroundVideo.jsx
import React, { useRef, useEffect } from 'react';
import './BackgroundVideo.css';
import videoSource from './assets/vvv.mp4'; // Проверьте правильность пути

const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
        })
        .catch((error) => {
          // Automatic playback failed.
          console.error('Error playing video:', error);
        });
    }
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay loop>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
