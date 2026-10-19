
// v4 

import React, { useEffect, useState } from "react";
import img from "../assets/Tenantbg.jpeg";
import { useAuth } from "../contexts/AuthContext";
import Tenantcard from "./Tenantcard";
import Tenantcard1 from "./Tenantcard1";
import Tenantcard2 from "./Tenantcard2";
import { toast } from "react-toastify";
import AiChatWidget from "../components/AiChatWidget";

function Tenant() {
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);
  
  // Advanced search states
  const [filters, setFilters] = useState({
    locality: "",
    budget: "",
    bhk: "",
    commuteTime: ""
  });

  // Drawer & Shortlist states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shortlistData, setShortlistData] = useState([]);
  const [isLoadingShortlist, setIsLoadingShortlist] = useState(false);

  const getProperties = async () => {
    try {
      const response = await fetch( `https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/property/getAllProperties`
         || `http://localhost:8000/api/v1/property/getAllProperties`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.ok) {
        const res = await response.json();
        setProperties(res.data || []);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.log(error);
      setProperties([]);
    }
  };

  // Shortlist data fetch karne ka function
  const fetchShortlist = async () => {
    setIsLoadingShortlist(true);
    try {
      const response = await fetch( `https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/shortlist` ||`http://localhost:8000/api/v1/shortlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const res = await response.json();
      if (response.ok) {
        setShortlistData(res.data?.properties || []);
      }
    } catch (error) {
      console.error("Error fetching shortlist", error);
    } finally {
      setIsLoadingShortlist(false);
    }
  };

  // Drawer open karne par data fetch karein
  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      fetchShortlist();
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Drawer se property remove karne ka function
  const handleRemoveFromShortlist = async (propertyId) => {
    try {
      const response = await fetch( `https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/shortlist/toggle` ||`http://localhost:8000/api/v1/shortlist/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId })
      });

      const res = await response.json();
      if (response.ok) {
        toast.success("Property removed from shortlist");
        // Update local state without re-fetching
        setShortlistData(prev => prev.filter(p => p._id !== propertyId));
      } else {
        toast.error(res.message || "Failed to remove property");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error");
    }
  };

  useEffect(() => {
    getProperties();
  }, [token]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col bg-base-200 relative">
        
        {/* Floating Shortlist Button */}
        <button 
          onClick={toggleDrawer}
          className="fixed top-24 right-4 z-[50] bg-green-600 text-white px-4 py-3 rounded-full font-bold shadow-xl hover:bg-green-500 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          My Watchlist
        </button>

        <div className="flex justify-center w-full">
          <img
            className="w-full h-[40vh] object-cover md:rounded-b-[3vw] shadow-lg"
            src={img}
            alt="Search Properties"
          />
        </div>

        <div className="relative -mt-16 mx-auto w-[95vw] md:w-[85vw] bg-base-100 shadow-2xl rounded-2xl p-6 z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-base-content">Find Your Perfect Home</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="locality"
              value={filters.locality}
              onChange={handleFilterChange}
              className="input input-bordered w-full"
              placeholder="Locality (e.g., Gwalior)"
            />
            <input
              type="number"
              name="budget"
              value={filters.budget}
              onChange={handleFilterChange}
              className="input input-bordered w-full"
              placeholder="Max Budget (₹)"
            />
            <select
              name="bhk"
              value={filters.bhk}
              onChange={handleFilterChange}
              className="select select-bordered w-full text-base-content"
            >
              <option value="">Any BHK</option>
              <option value="1">1 BHK / 1 Big Hall</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>
            <input
              type="number"
              name="commuteTime"
              value={filters.commuteTime}
              onChange={handleFilterChange}
              className="input input-bordered w-full"
              placeholder="Max Commute (mins)"
            />
          </div>
        </div>
      </div>

      <div className="bg-base-200 pt-12 pb-20">
        {(properties || [])
          .filter((tenant) => {
            const matchLocality = filters.locality === "" || 
              tenant.location?.toLowerCase().includes(filters.locality.toLowerCase()) || 
              tenant.area?.toLowerCase().includes(filters.locality.toLowerCase()) ||
              tenant.name?.toLowerCase().includes(filters.locality.toLowerCase());
              
            const matchBudget = filters.budget === "" || 
              Number(tenant.price || tenant.rent || 0) <= Number(filters.budget);
              
            const matchBhk = filters.bhk === "" || 
              String(tenant.bhk || tenant.size || "").includes(filters.bhk);
              
            const matchCommute = filters.commuteTime === "" || 
              Number(tenant.commuteTime || 0) <= Number(filters.commuteTime);

            return matchLocality && matchBudget && matchBhk && matchCommute;
          })
          .map((item) => (
            <Tenantcard key={item._id || item.id} props={item} />
          ))}
          
        <Tenantcard1 />
        <Tenantcard2 />
      </div>

      {/* Slide-over Watchlist Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[90vw] md:w-[400px] bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">My Watchlist</h2>
            <button onClick={toggleDrawer} className="p-2 hover:bg-gray-200 rounded-full text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoadingShortlist ? (
              <p className="text-center text-gray-500 mt-10">Loading properties...</p>
            ) : shortlistData.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">Your watchlist is empty.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {shortlistData.map((item) => (
                  <div key={item._id} className="flex flex-col border border-gray-200 rounded-xl p-3 shadow-sm bg-gray-50">
                    <img 
                      src={item.VRImage || 'https://via.placeholder.com/400x350?text=No+Image'} 
                      alt="Property" 
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-bold text-lg text-black">{item.title || 'Untitled Property'}</h3>
                    <p className="text-gray-600 text-sm mb-1">{item.location}</p>
                    <p className="font-semibold text-blue-600 mb-3">Rent: ₹{item.rent || item.price}</p>
                    
                    <button 
                      onClick={() => handleRemoveFromShortlist(item._id)}
                      className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-bold hover:bg-red-200 transition"
                    >
                      Remove from List
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-[90]" 
          onClick={toggleDrawer}
        ></div>
      )}

      <AiChatWidget />
    </>
  );
}

export default Tenant;