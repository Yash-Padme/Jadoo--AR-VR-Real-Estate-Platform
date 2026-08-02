import React, { useEffect } from 'react';

const DynamicGoogleMap2 = () => {
  useEffect(() => {
    // Define latitude and longitude variables
    const latitude = 21.24561807183376;
    const longitude = 81.61101209145748;

    // Generate the iframe code with dynamic latitude and longitude
    const iframeCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24929.867916541945!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ3JzM5LjgiTiA4McKwNjYsNDYuMiJF!5e0!3m2!1sen!2sin!4v1645378221921!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

    // Display the iframe code in the map-container div
    document.getElementById('map-container').innerHTML = iframeCode;
    const iframeElement = document.querySelector('#map-container iframe');
    iframeElement.style.width = '80vw';
    iframeElement.style.height = '80vh';
  }, []);

  return <div id="map-container" />;
};

export default DynamicGoogleMap2;