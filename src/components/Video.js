import { useEffect, useRef } from 'react';

const Video = ({ videoSrc, ...props }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // If video is in viewport
        if (entry.isIntersecting) {
          videoRef.current.src = videoSrc;
          videoRef.current.load();
        } 
        // If video is not in viewport
        else {
          videoRef.current.src = '';
        }
      });
    });
    observer.observe(videoRef.current);

    // Clean up on unmount
    return () => {
      observer.disconnect();
    };
  }, [videoSrc]);

  return (
    <video ref={videoRef} {...props} />
  );
};

export default Video;
