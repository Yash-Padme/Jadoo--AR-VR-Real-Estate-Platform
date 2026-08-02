import React, { useState } from 'react';
import Panorama from '../PanaromaViewer/Panaroma';
import logo from "../assets/icons8-price-30.png";
import logo1 from "../assets/icons8-area-chart-30.png";
import TextToSpeech from '../components/TextToSpeech';
import googlemap from '../assets/googlemap.png';
import DynamicGoogleMap2 from '../components/Map2';
import lec2 from '../assets/lec2.jpg'

function Tenantcard2() {
  const [showPanorama, setShowPanorama] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);

  const togglePanorama = () => {
    setShowPanorama(!showPanorama);
  };

  const toggleMapPopup = () => {
    setShowMapPopup(!showMapPopup);
  };

  const truncateBio = (bio) => {
    const words = bio.split(' ');
    return words.slice(0, 20).join(' ') + " . . .";
  };
  const image = lec2;

  return (
    <div className='w-[90vw] bg-tertiary flex justify-center py-8 mx-auto'>
      <div className='sm:w-85vw w-95vw p-4 bg-white rounded-3xl flex flex-col justify-center gap-8 items-center xl:h-400px font-playfair shadow-2xl xl:flex-row h-auto'>
        <div className='lg:w-35% sm:w-60% w-95% rounded-3xl flex items-center justify-start'>
          <img src={image} className='h-[350px] w-[380px] rounded-3xl' alt="" />
        </div>
        <div className='xl:w-58% w-90% flex flex-col justify-start items-start xl:justify-start gap-4'>
          <p className='text-2xl font-bold'>Lab</p>
          <p className='text-xl font-semibold'>Samta Colony</p>

          <div className="flex bg-gray-200 p-2 justify-between rounded-md w-full lg:flex-row flex-col">
            <div className="flex items-center">
              <img src={logo1} alt="" />
              <strong className="md:ml-2">Plot Area:</strong>&nbsp;28 sq. ft.
            </div>
            <div className="flex items-center">
              <img src={logo} alt="" />
              <strong className="md:ml-2">Average Price:</strong>&nbsp;$100,000
            </div>
            <div className="flex items-center">
              <img src={logo} alt="" />
              <strong className="md:ml-2">Price:</strong>&nbsp;₹1000000
            </div>
          </div>
          <p><strong>Address:</strong> Samta Colony</p>
          <div className='w-[98%] flex'>
            Discription:{truncateBio("Computer Programming Lab is a learning setup which started in 2016 at IIIT NR with focus on developing the program in high level language and translation into machine level language. Computer Programming lab is a hands-on project and assignment-based learning space where students will gain strong practical and technical skills in various programming languages including C, Python and Java, UNIX/Linux: shell, tools, utilities and programming environments, user interfaces, and software engineering principles. The interactive experiments in this lab will give the students an opportunity for learning and better understanding of the basic concepts and constructs of computer programming as well as advanced methodology concepts like Deep learning, Big data Technologies, Artificial Intelligence, Computational Intelligence etc.")}
            <TextToSpeech text={("Computer Programming Lab is a learning setup which started in 2016 at IIIT NR with focus on developing the program in high level language and translation into machine level language. Computer Programming lab is a hands-on project and assignment-based learning space where students will gain strong practical and technical skills in various programming languages including C, Python and Java, UNIX/Linux: shell, tools, utilities and programming environments, user interfaces, and software engineering principles. The interactive experiments in this lab will give the students an opportunity for learning and better understanding of the basic concepts and constructs of computer programming as well as advanced methodology concepts like Deep learning, Big data Technologies, Artificial Intelligence, Computational Intelligence etc.")} />
          </div>

          <div className='flex w-full justify-between '>
            <button onClick={toggleMapPopup} className='flex items-center'>
              <img src={googlemap} alt="" />
              <p>View Location in Map</p>
            </button>
            <div className='gap-4 flex'>
              <button onClick={togglePanorama} className='px-2 bg-blue-500 py-2 rounded-md text-white hover:bg-blue-400'>View AR</button>
              <a href="/Payment"><button className='px-6 py-3 rounded-md text-white bg-blue-500 hover:bg-blue-400'>Buy</button></a>
            </div>
          </div>
        </div>
      </div>
      {showMapPopup && (
        <div className="fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-50">
          <div className='w-[80vw] h-[80vh] bg-white rounded-lg relative'>
            <button className="absolute top-4 right-4 p-2 bg-black rounded-full px-3 hover:scale-105 text-white z-[10000]" onClick={toggleMapPopup}>Close</button>
            <DynamicGoogleMap2
            />
          </div>
        </div>
      )}
      {showPanorama && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[5000] flex justify-center items-center bg-black bg-opacity-50">
          <div className='w-[100vw] h-[100vh]'>
            <Panorama 
            VRImage={image}
            />
            <button className="absolute top-4 left-4 p-2 bg-black rounded-2xl px-3 hover:scale-105 text-white z-[10000]" onClick={togglePanorama}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tenantcard2;