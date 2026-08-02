import React from 'react'
import Keys from "../assets/keys.png"
function Homesection2() {
  return (
   <>
   <div className='text-center sm:pt-20 pt-10 font-dancing'>
    <p className='text-2xl font-semibold'>Category</p>
    <h1 className='text-[40px] font-bold'> We Offer Best Services</h1>
   </div>
   <div className='md:h-[45vh] h-auto w-full flex gap-8 items-center md:justify-evenly mt-10 md:flex-row flex-col font-playfair'>
    <div className='flex flex-col justify-center items-center lg:h-[45vh] lg:w-[20vw] h-[40vh] sm:w-[35vw] w-[80vw] md:w[28vw] rounded-2xl text-center shadow-2xl  bg-white'>
     <div><img src={Keys} alt="" className='h-[10vh] pb-1'/></div>
     <div><h1 className='text-[20px] font-semibold py-2'>Post Property To Sell</h1></div>
     <div><p>"Ready to sell your property? List it our platform to a wide audience of potential buyers"</p></div>
    </div>
    <div className='flex flex-col justify-center items-center lg:h-[45vh] lg:w-[20vw] h-[40vh] sm:w-[35vw] w-[80vw] md:w[28vw] rounded-2xl text-center shadow-2xl  bg-white'>
     <div><img src={Keys} alt="" className='h-[10vh] pb-1'/></div>
     <div><h1 className='text-[20px] font-semibold py-2'>Post Property To Buy</h1></div>
     <div><p>"Explore listings, find your dream home. Start your journey to a new abode today!"</p></div>
    </div>
    <div className='flex flex-col justify-center items-center lg:h-[45vh] lg:w-[20vw] h-[40vh] sm:w-[35vw] w-[80vw] md:w[28vw] rounded-2xl text-center shadow-2xl  bg-white'>
     <div><img src={Keys} alt="" className='h-[10vh] pb-1'/></div>
     <div><h1 className='text-[20px] font-semibold py-2'>Search Property For Rent</h1></div>
     <div><p>"Discover rental listings. Your perfect home awaits. Start your search for a new space now!"</p></div>
    </div>
    <div className='flex flex-col justify-center items-center lg:h-[45vh] lg:w-[20vw] h-[40vh] sm:w-[35vw] w-[80vw] md:w[28vw] rounded-2xl text-center shadow-2xl  bg-white'>
     <div><img src={Keys} alt="" className='h-[10vh] pb-1'/></div>
     <div><h1 className='text-[20px] font-semibold py-2'>Search Property To Buy</h1></div>
     <div><p>"Find your dream home. Explore listings for sale. Begin your journey to a new abode now!"</p></div>
    </div>
   </div>
   </>
  )
}

export default Homesection2
