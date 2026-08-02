import React, { useState } from 'react';
import bg from '../assets/Ownerbg.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PropertyForm() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };

    const [property, setProperty] = useState({
        name: "",
        title: "",
        description: "",
        location: "",
        price: "",
        size: "",
        type: "",
        area: "",
        amenities: "",
        contact: "",
        pincode: ""
    });

    const { token } = useAuth();

    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProperty({
            ...property,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

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
            formData.append("VRImage", selectedImage);

            const response = await fetch(`http://localhost:8080/api/v1/property/addProperty`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            console.log(response);

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
                    <input type="text" placeholder='Name' name='name' value={property.name} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100'  ></input>
                    <h1 className='text-[20px] font-semibold mb-2' >Contact</h1>
                    <input type="text" placeholder='Contact Number/Phone Number' name='contact' value={property.contact} onChange={handleInput} className='mb-8 h-[5vh] border-b-[1px] border-black bg-gray-100' ></input>
                </div>
                <div className=' flex flex-col w-[70%] ' >
                    <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8  ' >Property Details</h1>
                    <h1 className='text-[20px] font-semibold mb-2' >Title</h1>
                    <input type="text" placeholder='Title' name='title' value={property.title} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100 ' />
                    <h1 className='text-[20px] font-semibold mb-2' >Price</h1>
                    <input type="text" placeholder='Price' name='price' value={property.price} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100'/>
                    <h1 className='text-[20px] font-semibold mb-2' >Location</h1>
                    <input type="text" placeholder='Location/Address' name='location' value={property.location} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    <h1 className='text-[20px] font-semibold mb-2' >Pincode</h1>
                    <input type="text" placeholder='Pincode' name='pincode' value={property.pincode} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    <h1 className='text-[20px] font-semibold mb-2' >Size</h1>
                    <input type="text" placeholder='Size' name='size' value={property.size} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    <h1 className='text-[20px] font-semibold mb-2' >Type</h1>
                    <input type="text" placeholder='Rent/Sell' name='type' value={property.type} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    <h1 className='text-[20px] font-semibold mb-2' >Area</h1>
                    <input type="text" placeholder='Area' name='area' value={property.area} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    <h1 className='text-[20px] font-semibold mb-2' >Amenities</h1>
                    <input type="text" placeholder='Amenities' name='amenities' value={property.amenities} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    <h1 className='text-[20px] font-semibold mb-2' >Description</h1>
                    <input type="text" placeholder='Description' name='description' value={property.description} onChange={handleInput} className='mb-5 h-[5vh] border-b-[1px] border-black bg-gray-100' />
                    
                </div>
                <div className=' flex flex-col w-[70%]  ' >
                    <h1 className='text-[22px] border-b-[2px] border-black font-bold mb-8 ' >Add Photos</h1>
                    <input type="file" onChange={handleImageChange} />
                </div>

                <div className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><button>Get Started</button></div>
            </div>
        </div>

        </form>

    );
}

export default PropertyForm;


