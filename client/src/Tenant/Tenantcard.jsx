// import React, { useState } from 'react';
// import Panorama from '../PanaromaViewer/Panaroma';
// import logo from "../assets/icons8-price-30.png";
// import logo1 from "../assets/icons8-area-chart-30.png";
// import TextToSpeech from '../components/TextToSpeech';
// import googlemap from '../assets/googlemap.png';
// import DynamicGoogleMap from '../components/Map';

// function Tenantcard({ props }) {
//   const [showPanorama, setShowPanorama] = useState(false);
//   const [showMapPopup, setShowMapPopup] = useState(false);

//   const togglePanorama = () => {
//     setShowPanorama(!showPanorama);
//   };

//   const toggleMapPopup = () => {
//     setShowMapPopup(!showMapPopup);
//   };

//   const truncateBio = (bio) => {
//     const words = bio.split(' ');
//     return words.slice(0, 20).join(' ') + " . . .";
//   };

  

//   return (
//     <div className='w-[90vw] bg-tertiary flex justify-center py-8 mx-auto'>
//       <div className='sm:w-85vw w-95vw p-4 bg-white rounded-3xl flex flex-col justify-center gap-8 items-center xl:h-400px font-playfair shadow-2xl xl:flex-row h-auto'>
//         <div className='lg:w-35% sm:w-60% w-95% rounded-3xl flex items-center justify-start'>
//           <img src={props.VRImage} className='h-[350px] w-[380px] rounded-3xl' alt="" />
//         </div>
//         <div className='xl:w-58% w-90% flex flex-col justify-start items-start xl:justify-start gap-4'>
//           <p className='text-2xl font-bold'>{props.size}</p>
//           <p className='text-xl font-semibold'>{props.title}</p>

//           <div className="flex bg-gray-200 p-2 justify-between rounded-md w-full lg:flex-row flex-col">
//             <div className="flex items-center">
//               <img src={logo1} alt="" />
//               <strong className="md:ml-2">Plot Area:</strong>&nbsp;{props.area} sq. ft.
//             </div>
//             <div className="flex items-center">
//               <img src={logo} alt="" />
//               <strong className="md:ml-2">Average Price:</strong>&nbsp;$100,000
//             </div>
//             <div className="flex items-center">
//               <img src={logo} alt="" />
//               <strong className="md:ml-2">Price:</strong>&nbsp;₹{props.price}
//             </div>
//           </div>
//           <p><strong>Address:</strong> {props.location}</p>
//           <div className='w-[98%] flex'>
//             Discription:{truncateBio(props.description)}
//             <TextToSpeech text={(props.description)} />
//           </div>

//           <div className='flex w-full justify-between '>
//             <button onClick={toggleMapPopup} className='flex items-center'>
//               <img src={googlemap} alt="" />
//               <p>View Location in Map</p>
//             </button>
//             <div className='gap-4 flex'>
//               <button onClick={togglePanorama} className='px-2 bg-blue-500 py-2 rounded-md text-white hover:bg-blue-400'>View AR</button>
//               <a href="/Payment"><button className='px-6 py-3 rounded-md text-white bg-blue-500 hover:bg-blue-400'>Buy</button></a>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showMapPopup && (
//         <div className="fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-50">
//           <div className='w-[80vw] h-[80vh] bg-white rounded-lg relative'>
//             <button className="absolute top-4 right-4 p-2 bg-black rounded-full px-3 hover:scale-105 text-white z-[10000]" onClick={toggleMapPopup}>Close</button>
//             <DynamicGoogleMap
//               address={props.location}
//               pincode={props.pincode}
//             />
//           </div>
//         </div>
//       )}
//       {showPanorama && (
//         <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[5000] flex justify-center items-center bg-black bg-opacity-50">
//           <div className='w-[100vw] h-[100vh]'>
//             <Panorama 
//             VRImage={props.VRImage}
//             />
//             <button className="absolute top-4 left-4 p-2 bg-black rounded-2xl px-3 hover:scale-105 text-white z-[10000]" onClick={togglePanorama}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Tenantcard;


import React, { useState } from 'react';
import Panorama from '../PanaromaViewer/Panaroma';
import logo from "../assets/icons8-price-30.png";
import logo1 from "../assets/icons8-area-chart-30.png";
import TextToSpeech from '../components/TextToSpeech';
import googlemap from '../assets/googlemap.png';
import DynamicGoogleMap from '../components/Map';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';




function Tenantcard({ props }) {
  const { token } = useAuth();
  const [showPanorama, setShowPanorama] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);

  // NEW: State for owner popup
  const [showOwnerPopup, setShowOwnerPopup] = useState(false);

  if (!props) return null;

  const togglePanorama = () => setShowPanorama(!showPanorama);
  const toggleMapPopup = () => setShowMapPopup(!showMapPopup);
  // NEW: Toggle function for owner popup
  const toggleOwnerPopup = () => setShowOwnerPopup(!showOwnerPopup);

  const truncateBio = (bio) => {
    if (!bio) return "";
    const words = bio.split(' ');
    return words.slice(0, 20).join(' ') + " . . .";
  };

  // NEW: Function to save the property to the user's shortlist
  const handleShortlist = async () => {
    try {
      const response = await fetch( `https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/shortlist/toggle` || `http://localhost:8000/api/v1/shortlist/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId: props._id || props.id })
      });

      const res = await response.json();
      if (response.ok) {
        toast.success(res.message); // Will say "Property added to shortlist" or "removed"
      } else {
        toast.error(res.message || "Failed to update shortlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while shortlisting");
    }
  };

  return (
    // <div className='w-[90vw] bg-tertiary flex justify-center py-8 mx-auto'>
    //   <div className='sm:w-85vw w-95vw p-4 bg-white rounded-3xl flex flex-col justify-center gap-8 items-center xl:h-400px font-playfair shadow-2xl xl:flex-row h-auto'>
    //     <div className='lg:w-35% sm:w-60% w-95% rounded-3xl flex items-center justify-start'>
    //       <img 
    //         src={props.VRImage || 'https://via.placeholder.com/400x350?text=No+360+Image'} 
    //         className='h-[350px] w-[380px] rounded-3xl object-cover' 
    //         alt="Property" 
    //       />
    //     </div>

  <div className='w-[90vw] bg-tertiary flex justify-center py-8 mx-auto'>
  {/* Added brackets to sm:w-[85vw], w-[95vw], and xl:h-[400px] */}
  <div className='sm:w-[85vw] w-[95vw] p-4 bg-white rounded-3xl flex flex-col justify-center gap-8 items-center xl:h-[400px] font-playfair shadow-2xl xl:flex-row h-auto'>
    {/* Added brackets to lg:w-[35%], sm:w-[60%], and w-[95%] */}
    <div className='lg:w-[35%] sm:w-[60%] w-[95%] rounded-3xl flex items-center justify-start'>
      <img 
        src={props.VRImage || 'https://via.placeholder.com/400x350?text=No+360+Image'} 
        className='h-[350px] w-[380px] rounded-3xl object-cover' 
        alt="Property" 
      />
      </div>

        
        <div className='xl:w-58% w-90% flex flex-col justify-start items-start xl:justify-start gap-4'>
          <p className='text-2xl font-bold'>{props.title ? `${props.title}` : (props.size || 'N/A')}</p>
          <p className='text-xl font-semibold'>{props.size || 'Untitled Property'}</p>

          <div className="flex bg-gray-200 p-2 justify-between rounded-md w-full lg:flex-row flex-col">
            <div className="flex items-center">
              <img src={logo1} alt="" className="w-6 h-6 mr-1" />
              <strong className="md:ml-2">Furnishing:</strong>&nbsp;{props.furnished || "Not specified"}
            </div>
            <div className="flex items-center">
              <img src={logo} alt="" className="w-6 h-6 mr-1" />
              <strong className="md:ml-2">Rent:</strong>&nbsp;₹{props.rent || props.price || '0'}
            </div>
            <div className="flex items-center text-blue-700">
              <img src={logo} alt="" className="w-6 h-6 mr-1" />
              <strong className="md:ml-2">True Monthly Cost:</strong>&nbsp;₹{props.trueMonthlyCost || "N/A"}
            </div>
          </div>
          
          <p><strong>Address:</strong> {props.location || 'Address not provided'}</p>
          <div className='w-[98%] flex flex-col'>
            <span><strong>Description:</strong> {truncateBio(props.description)}</span>
            <TextToSpeech text={(props.description || 'No description available')} />
          </div>

          <div className='flex w-full justify-between'>
            <button onClick={toggleMapPopup} className='flex items-center'>
              <img src={googlemap} alt=""  />
              <p>View Location</p>
            </button>

            <div className='gap-2 flex flex-wrap justify-end'>
              {/* NEW: Contact Owner Button */}
              <button onClick={toggleOwnerPopup} className=' px-4 bg-blue-500 py-2 rounded-md text-white hover:bg-blue-400 font-bold'>
                Contact Owner
              </button>


            <div className='gap-4 flex'>
              <button onClick={togglePanorama} className='px-4 bg-blue-500 py-2 rounded-md text-white hover:bg-blue-400 font-bold'>
                View AR Tour
              </button>
              {/* NEW: Attached the handleShortlist function to the button */}
              <button onClick={handleShortlist} className='px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-500 font-bold'>
                Shortlist
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {showMapPopup && (
        <div className="fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-50">
          <div className='w-[80vw] h-[80vh] bg-white rounded-lg relative'>
            <button className="absolute top-4 right-4 p-2 bg-black rounded-full px-3 hover:scale-105 text-white z-[10000]" onClick={toggleMapPopup}>Close</button>
            <DynamicGoogleMap address={props.location} pincode={props.pincode} />
          </div>
        </div>
      )}
      
      {showPanorama && props.VRImage && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[5000] flex justify-center items-center bg-black bg-opacity-90">
          <div className='w-[100vw] h-[100vh]'>
            <Panorama VRImage={props.VRImage} />
            <button className="absolute top-4 left-4 p-2 bg-white rounded-2xl px-4 py-2 hover:scale-105 text-black font-bold z-[10000]" onClick={togglePanorama}>Close Tour</button>
          </div>
        </div>
      )}

      {/* NEW: Owner Details Popup */}
      {showOwnerPopup && (
        <div className="fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-50">
          <div className='w-[90vw] sm:w-[40vw] p-8 bg-white rounded-2xl relative flex flex-col shadow-2xl'>
            <button className="absolute top-4 right-4 p-2 bg-black rounded-full px-3 hover:scale-105 text-white" onClick={toggleOwnerPopup}>
              Close
            </button>
            <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-6">Owner Details</h2>
            <div className="flex flex-col gap-4 text-xl">
              <p><strong className="text-gray-700">Name:</strong> {props.name || 'Not Available'}</p>
              <p><strong className="text-gray-700">Phone No:</strong> {props.contact || 'Not Available'}</p>
            </div>
          </div>
        </div>
      )}

      
    </div>
    </div>
  );
}

export default Tenantcard;