// import React, { useState } from 'react';
// import bg from '../assets/Ownerbg.jpg';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// function PropertyForm() {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleImageChange = (e) => {
//         console.log(e.target.files[0]);
//         setSelectedImage(e.target.files[0]);
//     };

//     const [property, setProperty] = useState({
//         name: "",
//         title: "",
//         description: "",
//         location: "",
//         price: "",
//         size: "",
//         type: "",
//         area: "",
//         amenities: "",
//         contact: "",
//         pincode: ""
//     });

//     const { token } = useAuth();

//     const navigate = useNavigate();

//     const handleInput = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         setProperty({
//             ...property,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();

//             formData.append("name", property.name);
//             formData.append("title", property.title);
//             formData.append("description", property.description);
//             formData.append("location", property.location);
//             formData.append("price", property.price);
//             formData.append("size", property.size);
//             formData.append("type", property.type);
//             formData.append("area", property.area);
//             formData.append("amenities", property.amenities);
//             formData.append("contact", property.contact);
//             formData.append("pincode", property.pincode);
//             formData.append("VRImage", selectedImage);

//             // const response = await fetch(apiUrl("/api/v1/property/addProperty"), {
//               const response = await fetch(`https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/property/addProperty` || `http://localhost:8000/api/v1/property/addProperty`, {
//                 method: "POST",
//                 crossDomain: true,
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: formData,
//             });

//             console.log(response);

//             if (response.ok) {
//                 const res = await response.json();
//                 toast.success(res.message);
//                 navigate("/");
//             } else {
//                 const errorResponse = await response.json();
//                 toast.error(errorResponse.message);
//             }

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>

// <div className='bg-tertiary'>
//             <div className='relative bottom-[10vh]  bg-tertiary flex w-[full] ' >
//                 <div className='w-[10%] bg-tertiary ' ></div>
//                 <div className='l-[5vw] w-[90%] rounded-bl-[10vh]  bg-tertiary ' >
//                     <img className='w-[100%] rounded-bl-[10vh] h-[80vh] bg-tertiary ' src={bg} alt="" />
//                 </div>
//             </div>

//             <div className='w-[full] flex flex-col  items-center ' >
//                 <h1 className='font-bold text-[24px] mt-0 ' >FILL OUT THE FORM</h1>
//                 <div className=' flex flex-col w-[70%]  ' >
//                     <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 ' >Personal Details</h1>
//                     <h1 className='text-[20px] font-semibold mb-2 ' >Name</h1>
//                     <input type="text" placeholder='Name' name='name' value={property.name} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100'  ></input>
//                     <h1 className='text-[20px] font-semibold mb-2' >Contact</h1>
//                     <input type="text" placeholder='Contact Number/Phone Number' name='contact' value={property.contact} onChange={handleInput} className='mb-8 h-[5vh] border-b-[1px] border-black bg-gray-100' ></input>
//                 </div>
//                 <div className=' flex flex-col w-[70%] ' >
//                     <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8  ' >Property Details</h1>
//                     <h1 className='text-[20px] font-semibold mb-2' >Title</h1>
//                     <input type="text" placeholder='Title' name='title' value={property.title} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100 ' />
//                     <h1 className='text-[20px] font-semibold mb-2' >Price</h1>
//                     <input type="text" placeholder='Price' name='price' value={property.price} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100'/>
//                     <h1 className='text-[20px] font-semibold mb-2' >Location</h1>
//                     <input type="text" placeholder='Location/Address' name='location' value={property.location} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
//                     <h1 className='text-[20px] font-semibold mb-2' >Pincode</h1>
//                     <input type="text" placeholder='Pincode' name='pincode' value={property.pincode} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
//                     <h1 className='text-[20px] font-semibold mb-2' >Size</h1>
//                     <input type="text" placeholder='Size' name='size' value={property.size} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
//                     <h1 className='text-[20px] font-semibold mb-2' >Type</h1>
//                     <input type="text" placeholder='Rent/Sell' name='type' value={property.type} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
//                     <h1 className='text-[20px] font-semibold mb-2' >Area</h1>
//                     <input type="text" placeholder='Area' name='area' value={property.area} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
//                     <h1 className='text-[20px] font-semibold mb-2' >Amenities</h1>
//                     <input type="text" placeholder='Amenities' name='amenities' value={property.amenities} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
//                     <h1 className='text-[20px] font-semibold mb-2' >Description</h1>
//                     <input type="text" placeholder='Description' name='description' value={property.description} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    
//                 </div>
//                 <div className=' flex flex-col w-[70%]  ' >
//                     <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 ' >Add Photos</h1>
//                     <input type="file" onChange={handleImageChange} />
//                 </div>

//                 <div className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><button>Get Started</button></div>
//             </div>
//         </div>

//         </form>

//     );
// }

// export default PropertyForm;


// import React, { useState } from 'react';
// import bg from '../assets/Ownerbg.jpg';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// function PropertyForm() {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleImageChange = (e) => {
//         setSelectedImage(e.target.files[0]);
//     };

//     const [property, setProperty] = useState({
//         name: "", title: "", description: "", location: "", price: "", 
//         size: "", type: "", area: "", amenities: "", contact: "", pincode: "",
//         // New PRD Fields
//         rent: "", deposit: "", maintenance: "", bhk: "", 
//         propertyType: "", furnished: "", commuteTime: "", transportDistance: ""
//     });

//     const { token } = useAuth();
//     const navigate = useNavigate();

//     const handleInput = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         setProperty({ ...property, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
            
//             // Original Fields
//             formData.append("name", property.name);
//             formData.append("title", property.title);
//             formData.append("description", property.description);
//             formData.append("location", property.location);
//             formData.append("price", property.price);
//             formData.append("size", property.size);
//             formData.append("type", property.type);
//             formData.append("area", property.area);
//             formData.append("amenities", property.amenities);
//             formData.append("contact", property.contact);
//             formData.append("pincode", property.pincode);
            
//             // New PRD Fields
//             formData.append("rent", property.rent);
//             formData.append("deposit", property.deposit);
//             formData.append("maintenance", property.maintenance);
//             formData.append("bhk", property.bhk);
//             formData.append("propertyType", property.propertyType);
//             formData.append("furnished", property.furnished);
//             formData.append("commuteTime", property.commuteTime);
//             formData.append("transportDistance", property.transportDistance);
            
//             formData.append("VRImage", selectedImage);

//             const response = await fetch(`http://localhost:8000/api/v1/property/addProperty`, {
//                 method: "POST",
//                 crossDomain: true,
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: formData,
//             });

//             if (response.ok) {
//                 const res = await response.json();
//                 toast.success(res.message);
//                 navigate("/");
//             } else {
//                 const errorResponse = await response.json();
//                 toast.error(errorResponse.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className='bg-tertiary'>
//                 <div className='relative bottom-[10vh]  bg-tertiary flex w-[full] ' >
//                     <div className='w-[10%] bg-tertiary ' ></div>
//                     <div className='l-[5vw] w-[90%] rounded-bl-[10vh]  bg-tertiary ' >
//                         <img className='w-[100%] rounded-bl-[10vh] h-[80vh] bg-tertiary ' src={bg} alt="" />
//                     </div>
//                 </div>

//                 <div className='w-[full] flex flex-col  items-center ' >
//                     <h1 className='font-bold text-[24px] mt-0 ' >FILL OUT THE FORM</h1>
                    
//                     <div className=' flex flex-col w-[70%]  ' >
//                         <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 ' >Personal Details</h1>
//                         <h1 className='text-[20px] font-semibold mb-2 ' >Name</h1>
//                         <input type="text" placeholder='Name' name='name' value={property.name} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100'  />
//                         <h1 className='text-[20px] font-semibold mb-2' >Contact</h1>
//                         <input type="text" placeholder='Contact Number/Phone Number' name='contact' value={property.contact} onChange={handleInput} className='mb-8 h-[5vh] border-b-[1px] border-black bg-gray-100' />
//                     </div>
                    
//                     <div className=' flex flex-col w-[70%] ' >
//                         <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8  ' >Property Details</h1>
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Title</h1>
//                         <input type="text" placeholder='Title' name='title' value={property.title} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100 ' />
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Location</h1>
//                         <input type="text" placeholder='Location/Address' name='location' value={property.location} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Pincode</h1>
//                         <input type="text" placeholder='Pincode' name='pincode' value={property.pincode} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Amenities</h1>
//                         <input type="text" placeholder='Amenities' name='amenities' value={property.amenities} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Description</h1>
//                         <input type="text" placeholder='Description' name='description' value={property.description} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />

//                         <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 mt-4' >Rental Costs & Details</h1>
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Base Rent (₹)</h1>
//                         <input type="number" placeholder='Monthly Rent' name='rent' value={property.rent} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Maintenance (₹)</h1>
//                         <input type="number" placeholder='Maintenance Cost' name='maintenance' value={property.maintenance} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Deposit (₹)</h1>
//                         <input type="number" placeholder='Security Deposit' name='deposit' value={property.deposit} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />

//                         <h1 className='text-[20px] font-semibold mb-2' >BHK</h1>
//                         <input type="number" placeholder='e.g. 2' name='bhk' value={property.bhk} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
//                         <h1 className='text-[20px] font-semibold mb-2' >Furnished Status</h1>
//                         <input type="text" placeholder='Unfurnished / Semi-Furnished / Fully Furnished' name='furnished' value={property.furnished} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />

//                         <h1 className='text-[20px] font-semibold mb-2' >Commute Time (mins)</h1>
//                         <input type="number" placeholder='e.g. 30' name='commuteTime' value={property.commuteTime} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
//                         {/* Keeping original legacy fields as fallback to avoid breaking old code */}
//                         <div className="hidden">
//                             <input type="text" name='price' value={property.price = property.rent} onChange={handleInput} />
//                             <input type="text" name='size' value={property.size = property.bhk} onChange={handleInput} />
//                             <input type="text" name='type' value={property.type = "Rent"} onChange={handleInput} />
//                             <input type="text" name='area' value={property.area = property.bhk} onChange={handleInput} />
//                         </div>
//                     </div>
                    
//                     <div className=' flex flex-col w-[70%]  ' >
//                         <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 ' >Add 360°/VR Photo</h1>
//                         <input type="file" onChange={handleImageChange} className="mb-8" required />
//                     </div>

//                     <div className='border-[1px] bg-black px-6 py-3 text-white rounded-lg hover:scale-110 mb-20'>
//                         <button type="submit">Submit Property</button>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     );
// }

// export default PropertyForm;


import React, { useState } from 'react';
import bg from '../assets/Ownerbg.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PropertyForm() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const [property, setProperty] = useState({
        name: "", title: "", description: "", location: "", price: "", 
        size: "", type: "", area: "", amenities: "", contact: "", pincode: "",
        rent: "", deposit: "", maintenance: "", bhk: "", 
        propertyType: "", furnished: "", commuteTime: "", transportDistance: "",
        latitude: "", longitude: "" 
    });

    const { token } = useAuth();
    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProperty({ ...property, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            
            // Original Fields
            formData.append("name", property.name);
            formData.append("title", property.title);
            formData.append("description", property.description);
            formData.append("location", property.location);
            formData.append("price", property.price);
            formData.append("size", property.size);
            formData.append("type", property.type);
            formData.append("area", property.area);
            formData.append("amenities", property.amenities);
            formData.append("contact", property.contact);
            formData.append("pincode", property.pincode);
            
            // New PRD Fields
            formData.append("rent", property.rent);
            formData.append("deposit", property.deposit);
            formData.append("maintenance", property.maintenance);
            formData.append("bhk", property.bhk);
            formData.append("propertyType", property.propertyType);
            formData.append("furnished", property.furnished);
            formData.append("commuteTime", property.commuteTime);
            formData.append("transportDistance", property.transportDistance);
            
            // Map Coordinates
            formData.append("latitude", property.latitude);
            formData.append("longitude", property.longitude);
            
            formData.append("VRImage", selectedImage);

            const response = await fetch( `https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/property/addProperty` || `http://localhost:8000/api/v1/property/addProperty`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const res = await response.json();
                toast.success(res.message);
                navigate("/");
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='bg-tertiary'>
                <div className='relative bottom-[10vh]  bg-tertiary flex w-[full] ' >
                    <div className='w-[10%] bg-tertiary ' ></div>
                    <div className='l-[5vw] w-[90%] rounded-bl-[10vh]  bg-tertiary ' >
                        <img className='w-[100%] rounded-bl-[10vh] h-[80vh] bg-tertiary ' src={bg} alt="" />
                    </div>
                </div>

                <div className='w-[full] flex flex-col  items-center ' >
                    <h1 className='font-bold text-[24px] mt-0 ' >FILL OUT THE FORM</h1>
                    
                    <div className=' flex flex-col w-[70%]  ' >
                        <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 ' >Personal Details</h1>
                        <h1 className='text-[20px] font-semibold mb-2 ' >Name</h1>
                        <input type="text" placeholder='Name' name='name' value={property.name} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100'  />
                        <h1 className='text-[20px] font-semibold mb-2' >Contact</h1>
                        <input type="text" placeholder='Contact Number/Phone Number' name='contact' value={property.contact} onChange={handleInput} className='mb-8 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    </div>
                    
                    <div className=' flex flex-col w-[70%] ' >
                        <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8  ' >Property Details</h1>
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Title</h1>
                        <input type="text" placeholder='Title' name='title' value={property.title} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100 ' />
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Location</h1>
                        <input type="text" placeholder='Location/Address' name='location' value={property.location} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Pincode</h1>
                        <input type="text" placeholder='Pincode' name='pincode' value={property.pincode} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 mt-4' >Map Coordinates</h1>
                        <h1 className='text-[20px] font-semibold mb-2' >Latitude</h1>
                        <input type="text" placeholder='e.g. 26.2183' name='latitude' value={property.latitude} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Longitude</h1>
                        <input type="text" placeholder='e.g. 78.1828' name='longitude' value={property.longitude} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />

                        <h1 className='text-[20px] font-semibold mb-2 mt-4' >Amenities</h1>
                        <input type="text" placeholder='Amenities' name='amenities' value={property.amenities} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Description</h1>
                        <input type="text" placeholder='Description' name='description' value={property.description} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />

                        <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 mt-4' >Rental Costs & Details</h1>
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Base Rent (₹)</h1>
                        <input type="number" placeholder='Monthly Rent' name='rent' value={property.rent} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Maintenance (₹)</h1>
                        <input type="number" placeholder='Maintenance Cost' name='maintenance' value={property.maintenance} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Deposit (₹)</h1>
                        <input type="number" placeholder='Security Deposit' name='deposit' value={property.deposit} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />

                        <h1 className='text-[20px] font-semibold mb-2' >BHK</h1>
                        <input type="text" placeholder='e.g. 2 BHK' name='bhk' value={property.bhk} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        <h1 className='text-[20px] font-semibold mb-2' >Furnished Status</h1>
                        <input type="text" placeholder='Unfurnished / Semi-Furnished / Fully Furnished' name='furnished' value={property.furnished} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />

                        <h1 className='text-[20px] font-semibold mb-2' >Commute Time (mins)</h1>
                        <input type="number" placeholder='e.g. 30' name='commuteTime' value={property.commuteTime} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                        
                        {/* Keeping original legacy fields as fallback to avoid breaking old code */}
                        <div className="hidden">
                            <input type="text" name='price' value={property.price = property.rent} onChange={handleInput} />
                            <input type="text" name='size' value={property.size = property.bhk} onChange={handleInput} />
                            <input type="text" name='type' value={property.type = "Rent"} onChange={handleInput} />
                            <input type="text" name='area' value={property.area = property.bhk} onChange={handleInput} />
                        </div>
                    </div>
                    
                    <div className=' flex flex-col w-[70%]  ' >
                        <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 ' >Add 360°/VR Photo</h1>
                        <input type="file" onChange={handleImageChange} className="mb-8" required />
                    </div>

                    <div className='border-[1px] bg-black px-6 py-3 text-white rounded-lg hover:scale-110 mb-20'>
                        <button type="submit">Submit Property</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PropertyForm;
