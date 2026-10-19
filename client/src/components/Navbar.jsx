// import React, { useState } from 'react';
// import Hamburger from "../assets/Hamburger.png";
// import { useAuth } from '../contexts/AuthContext';
// import LogOut from './LogOut';

// function Navbar() {
//     const [showMenu, setShowMenu] = useState(false);

//     const handleClick = () => {
//         setShowMenu(!showMenu);
//     };

//     const {isLoggedIn} = useAuth();

//     return (
//         <div className=' bg-white sticky top-2 backdrop-blur-lg backdrop-brightness-75 z-[100]  mx-auto w-[95vw] rounded-xl'>
//             <div className='h-[10vh] w-[95vw] mx-auto flex justify-between items-center p-4 font-playfair text-[17px]'>
//                 <div><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc57725c-8ab0-43ad-a8c1-24eb43956f47?apiKey=0e2d2b3fdaa848b2ac6dc9f62f11a5f8" alt="Logo" /></div>
//                 <div className='md:flex h-[10vh] justify-center items-center gap-12 hidden'>
//                     <div className='hover:scale-110'><a href="/">Home</a></div>
//                     {isLoggedIn ? (
//                         <>
//                         <div className='hover:scale-110'><a href="/Tenant">For Tenants</a></div>
//                         <div className='hover:scale-110'><a href="/PropertyForm">For Owners</a></div>
//                         <div className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><button><a href="/Logout">Logout</a></button></div>
//                         </>
//                     ):(
//                         <>
//                         <div className='hover:scale-110'><a href="/Getstarted">For Tenants</a></div>
//                         <div className='hover:scale-110'><a href="/Getstarted">For Owners</a></div>
//                         <div className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><button><a href="/Getstarted">Get Started</a></button></div>
//                         </>
//                     )}
//                 </div>
//                 <div className='md:hidden '><button onClick={handleClick} className='text-white rounded-[50%]'><img className='h-[36px] w-[36px]' src={Hamburger} alt="Menu" /></button></div>
//             </div>
//             {showMenu && (
//                 <div className='h-[88vh] w-[100vw] md:hidden font-playfair pt-8  text-[17px]'>
//                     <div className='flex flex-col  gap-[30px] text-start px-4'>
//                         <div>
//                             <a href="/" className=' hover:scale-110'>Home</a>
//                             <hr className='border-gray-600 mt-2' />
//                         </div>
//                         <div>
//                             <a href="/Tenant" className=' hover:scale-110'>For Tenants</a>
//                             <hr className='border-gray-600 mt-2' />
//                         </div>
//                         <div>
//                             <a href="/" className=' hover:scale-110'>For owners</a>
//                             <hr className='border-gray-600 mt-2' />
//                         </div>
//                         <div className='flex justify-center mt-2'>
//                             <button className='border-[1px] bg-black px-3 py-2 text-white rounded-lg hover:scale-110'><a href="/Getstarted" >Get Started</a></button></div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Navbar;



import React, { useState } from 'react';
import Hamburger from "../assets/Hamburger.png";
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    // Profile dropdown ko toggle karne ke liye state
    const [showProfile, setShowProfile] = useState(false);
    
    // AuthContext se user details aur logout function access kar rahe hain
    const { isLoggedIn, logout, user } = useAuth();

    const handleClick = () => {
        setShowMenu(!showMenu);
    };

    const handleProfileClick = () => {
        setShowProfile(!showProfile);
    };

    return (
        <div className='bg-white sticky top-2 backdrop-blur-lg backdrop-brightness-75 z-[100] mx-auto w-[95vw] rounded-xl'>
            <div className='h-[10vh] w-[95vw] mx-auto flex justify-between items-center p-4 font-playfair text-[17px]'>
                <div>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc57725c-8ab0-43ad-a8c1-24eb43956f47?apiKey=0e2d2b3fdaa848b2ac6dc9f62f11a5f8" alt="Logo" />
                </div>
                
                {/* Desktop Menu */}
                <div className='md:flex h-[10vh] justify-center items-center gap-12 hidden'>
                    <div className='hover:scale-110'><a href="/">Home</a></div>
                    {isLoggedIn ? (
                        <>
                            <div className='hover:scale-110'><a href="/Tenant">For Tenants</a></div>
                            <div className='hover:scale-110'><a href="/PropertyForm">For Owners</a></div>
                            
                            {/* Profile Icon with Dropdown */}
                            <div className='relative'>
                                <button onClick={handleProfileClick} className='flex items-center gap-2 border-[1px] bg-gray-100 px-3 py-1.5 rounded-full hover:shadow-md transition-all'>
                                    <div className='bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm'>
                                        {/* User ke naam ka pehla letter */}
                                        {user?.userName ? user.userName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className='font-semibold'>{user?.userName || 'User'}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {/* Dropdown Menu */}
                                {showProfile && (
                                    <div className='absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-200 flex flex-col z-[200]'>
                                        <div className='px-4 py-3 border-b border-gray-100'>
                                            <p className='text-xs text-gray-500'>Logged in as</p>
                                            <p className='text-sm font-bold text-black truncate'>{user?.email || 'Email not available'}</p>
                                        </div>
                                        <button onClick={logout} className='text-left px-4 py-2 mt-1 text-red-600 hover:bg-red-50 font-semibold w-full transition-colors'>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='hover:scale-110'><a href="/Getstarted">For Tenants</a></div>
                            <div className='hover:scale-110'><a href="/Getstarted">For Owners</a></div>
                            <div className='border-[1px] bg-black px-4 py-2 text-white rounded-lg hover:scale-110'>
                                <a href="/Getstarted">Get Started</a>
                            </div>
                        </>
                    )}
                </div>
                
                {/* Mobile Hamburger Button */}
                <div className='md:hidden'>
                    <button onClick={handleClick} className='text-white rounded-[50%]'>
                        <img className='h-[36px] w-[36px]' src={Hamburger} alt="Menu" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMenu && (
                <div className='h-[88vh] w-[100vw] md:hidden font-playfair pt-8 text-[17px] bg-white absolute top-[10vh] left-0 z-[150] shadow-2xl rounded-b-xl'>
                    <div className='flex flex-col gap-[30px] text-start px-6'>
                        
                        {/* Mobile Profile Details */}
                        {isLoggedIn && (
                            <div className='bg-gray-100 p-4 rounded-xl mb-2 flex flex-col gap-1'>
                                <p className='text-sm text-gray-500'>Welcome Back,</p>
                                <p className='font-bold text-xl'>{user?.userName || 'User'}</p>
                                <p className='text-sm text-blue-600 truncate font-semibold'>{user?.email}</p>
                            </div>
                        )}

                        <div>
                            <a href="/" className='hover:scale-105 inline-block'>Home</a>
                            <hr className='border-gray-200 mt-3' />
                        </div>
                        <div>
                            {/* Updated Flow: Login ke baad /Tenant par jayega */}
                            <a href={isLoggedIn ? "/Tenant" : "/Getstarted"} className='hover:scale-105 inline-block'>For Tenants</a>
                            <hr className='border-gray-200 mt-3' />
                        </div>
                        <div>
                            <a href={isLoggedIn ? "/PropertyForm" : "/Getstarted"} className='hover:scale-105 inline-block'>For Owners</a>
                            <hr className='border-gray-200 mt-3' />
                        </div>
                        
                        <div className='flex justify-center mt-4'>
                            {isLoggedIn ? (
                                <button onClick={logout} className='border-[1px] border-red-600 text-red-600 bg-red-50 px-8 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all w-full font-bold'>
                                    Logout
                                </button>
                            ) : (
                                <a href="/Getstarted" className='w-full'>
                                    <button className='bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all w-full font-bold'>
                                        Get Started
                                    </button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;