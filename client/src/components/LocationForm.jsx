import React, { useState } from 'react';

const LocationForm = () => {
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const apiKey = '8826ed8f468c4bdd9bc7f012edba3fb3'; // Your API key
    const query = `${address} ${pincode}`.trim();
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

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Pincode:
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </label>
        <br />
        <button type="submit">Get Latitude and Longitude</button>
      </form>
      {latitude && longitude && (
        <div>
          Latitude: {latitude}<br />
          Longitude: {longitude}
        </div>
      )}
    </div>
  );
};

export default LocationForm;