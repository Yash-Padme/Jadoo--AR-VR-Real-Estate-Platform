import React, { useState,useEffect } from 'react';

const DynamicGoogleMap = (prop) => {
  
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

 
  const handleLocation= async () => {
    const apiKey = '8826ed8f468c4bdd9bc7f012edba3fb3'; // Your API key
    const query = `${prop.address} ${prop.pincode}`.trim();
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${apiKey}`);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const { lat, lon } = data.features[0].properties;
      setLatitude(lat);
      setLongitude(lon);
    } else {
      console.log('Location not found');
    }
  };
  const handleMap = async () => {
    const iframeCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24929.867916541945!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ3JzM5LjgiTiA4McKwNjYsNDYuMiJF!5e0!3m2!1sen!2sin!4v1645378221921!5m2!1sen!2sin" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  
    document.getElementById('map-container').innerHTML = iframeCode;
    const iframeElement = document.querySelector('#map-container iframe');
    iframeElement.style.width = '80vw';
    iframeElement.style.height = '80vh';
  };
  

  useEffect(() => {
    
    handleLocation();
    handleMap();
    
  }, []);

  return <div id="map-container" />;
};

export default DynamicGoogleMap;
