import React, { useState } from 'react';
import Hamburger from "../assets/Hamburger.png";
import { useAuth } from '../contexts/AuthContext';
import LogOut from './LogOut';

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    };

    const {isLoggedIn} = useAuth();

    return (
        <div className=' bg-white sticky top-2 backdrop-blur-lg backdrop-brightness-75 z-[100]  mx-auto w-[95vw] rounded-xl'>
            <div className='h-[10vh] w-[95vw] mx-auto flex justify-between items-center p-4 font-playfair text-[17px]'>
                <div><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc57725c-8ab0-43ad-a8c1-24eb43956f47?apiKey=0e2d2b3fdaa848b2ac6dc9f62f11a5f8" alt="Logo" /></div>
                <div className='md:flex h-[10vh] justify-center items-center gap-12 hidden'>
                    <div className='hover:scale-110'><a href="/">Home</a></div>
                    {isLoggedIn ? (
                        <>
                        <div className='hover:scale-110'><a href="/Tenant">For Tenants</a></div>
                        <div className='hover:scale-110'><a href="/PropertyForm">For Owners</a></div>
                        <div className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><button><a href="/Logout">Logout</a></button></div>
                        </>
                    ):(
                        <>
                        <div className='hover:scale-110'><a href="/Getstarted">For Tenants</a></div>
                        <div className='hover:scale-110'><a href="/Getstarted">For Owners</a></div>
                        <div className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><button><a href="/Getstarted">Get Started</a></button></div>
                        </>
                    )}
                </div>
                <div className='md:hidden '><button onClick={handleClick} className='text-white rounded-[50%]'><img className='h-[36px] w-[36px]' src={Hamburger} alt="Menu" /></button></div>
            </div>
            {showMenu && (
                <div className='h-[88vh] w-[100vw] md:hidden font-playfair pt-8  text-[17px]'>
                    <div className='flex flex-col  gap-[30px] text-start px-4'>
                        <div>
                            <a href="/" className=' hover:scale-110'>Home</a>
                            <hr className='border-gray-600 mt-2' />
                        </div>
                        <div>
                            <a href="/Tenant" className=' hover:scale-110'>For Tenants</a>
                            <hr className='border-gray-600 mt-2' />
                        </div>
                        <div>
                            <a href="/" className=' hover:scale-110'>For owners</a>
                            <hr className='border-gray-600 mt-2' />
                        </div>
                        <div className='flex justify-center mt-2'>
                            <button className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><a href="/Getstarted" >Get Started</a></button></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
