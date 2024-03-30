import React, { useEffect, useRef } from 'react';


function VideoOnScroll() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    function isElementInViewport(element) {
      var rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function playVideoOnScroll() {
      if (isElementInViewport(video)) {
        video.play();
      } else {
        video.pause();
      }
    }

    window.addEventListener('scroll', playVideoOnScroll);

    return () => {
      window.removeEventListener('scroll', playVideoOnScroll);
    };
  }, []);

  return (
    <div className="relative" style={{ height: '500px' }}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: '10' }}
      >
        {/* <div className="h-16 w-16 bg-gray-800 rounded-full"></div> */}
      </div>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src='./nftvid.mp4'
        loop
        muted
      ></video>
    </div>
  );
}

export default VideoOnScroll;