import React, { useRef, useEffect } from 'react';
import video from '../assets/video1.mp4';
import h2 from "../assets/h2.jpg"
function Homesection1() {
  const videoRef = useRef(null);

  useEffect(() => {
    const trimDuration = 48; 

    const handleVideoEnd = () => {
      videoRef.current.currentTime = 0;
      // Play the video again
      videoRef.current.play();
    };

    const interval = setInterval(() => {
      // Check if video has played for the desired duration
      if (videoRef.current.currentTime >= trimDuration) {
        // If it has, pause the video and handle the end
        videoRef.current.pause();
        handleVideoEnd();
      }
    }, 1000); // Check every second

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative bottom-[10vh] w-full'>
      <div className='z-[-1] w-full sm:h-[100vh] h-[65vh]'>
        <video autoPlay loop id="expert-video" muted playsInline poster={h2} className='w-full h-full object-cover' ref={videoRef}>
          <source src={video} type="video/mp4" />
        </video>
        <div className='absolute sm:top-[20vh] top-8  flex a justify-center items-start md:pt-36 pt-20 w-full  font-playfair'>
          <div className='md:w-[60%] w-[90vw] text-center   font-bold'>
            <h1 className='font-bold md:text-[50px] sm:text-2xl text-xl mb-8  text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)]  font-serif '>Find a home you will love!</h1>
            <p className='md:text-[22px] sm:text-xl text-[15px] text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]  font-playfair '>Welcome to Jadoo, where your dream home is just a click away. Discover a curated collection of properties, each tailored to fit your unique lifestyle. From cozy apartments to spacious family houses, we have options to suit every taste. Start your journey towards the perfect space with us today.</p>
            <a className='w-[100%] flex justify-center pt-5 ' href='/Getstarted' >
              <h1 className='bg-black md:px-10 md:py-5 px-6 py-3 rounded-2xl  font-bold md:text-xl sm:text-2xl text-md   text-white '>GET STARTED!</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homesection1;
