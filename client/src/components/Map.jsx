import React, { useState, useEffect } from 'react';

const DynamicGoogleMap = ({ address, pincode }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // const apiKey = '8826ed8f468c4bdd9bc7f012edba3fb3'; // Your API key
        const apiKey = 'b1e49cafa42a4d0abbac79c30920b290'; // mine API key
        const query = `${address} ${pincode}`.trim();
        
        if (!query) return;

        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${apiKey}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const { lat, lon } = data.features[0].properties;
          setLatitude(lat);
          setLongitude(lon);
        } else {
          console.log('Location not found');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [address, pincode]); // Re-run if address or pincode changes

  // Show a loading state while fetching coordinates
  if (loading) {
    return (
      <div className="flex justify-center items-center w-[80vw] h-[80vh] bg-gray-200 rounded-lg animate-pulse font-playfair">
        Loading Map...
      </div>
    );
  }

  // Fallback if coordinates are not found
  if (!latitude || !longitude) {
    return (
      <div className="flex justify-center items-center w-[80vw] h-[80vh] bg-gray-200 rounded-lg font-playfair">
        Map location not found for this address.
      </div>
    );
  }

  return (
    <div className="w-[80vw] h-[80vh] rounded-lg overflow-hidden bg-gray-100">
      <iframe
        title="Dynamic Google Map"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24929.867916541945!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ3JzM5LjgiTiA4McKwNjYsNDYuMiJF!5e0!3m2!1sen!2sin!4v1645378221921!5m2!1sen!2sin`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default DynamicGoogleMap;