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
     <div><h1 className='text-[20px] font-semibold py-2'>Discover Rental Homes</h1></div>
     <div className='px-2'><p>"Explore listings tailored to your specific lifestyle, budget, and commute preferences."</p></div>
    </div>
    <div className='flex flex-col justify-center items-center lg:h-[45vh] lg:w-[20vw] h-[40vh] sm:w-[35vw] w-[80vw] md:w[28vw] rounded-2xl text-center shadow-2xl  bg-white'>
     <div><img src={Keys} alt="" className='h-[10vh] pb-1'/></div>
     <div><h1 className='text-[20px] font-semibold py-2'>Analyze True Costs</h1></div>
     <div className='px-2'><p>"Calculate total monthly expenses including rent, maintenance, utilities, and transport."</p></div>
    </div>
    <div className='flex flex-col justify-center items-center lg:h-[45vh] lg:w-[20vw] h-[40vh] sm:w-[35vw] w-[80vw] md:w[28vw] rounded-2xl text-center shadow-2xl  bg-white'>
     <div><img src={Keys} alt="" className='h-[10vh] pb-1'/></div>
     <div><h1 className='text-[20px] font-semibold py-2'>Immersive Virtual Tours</h1></div>
     <div className='px-2'><p>"Take 360-degree interactive virtual walkthroughs of properties from anywhere."</p></div>
    </div>
    <div className='flex flex-col justify-center items-center lg:h-[45vh] lg:w-[20vw] h-[40vh] sm:w-[35vw] w-[80vw] md:w[28vw] rounded-2xl text-center shadow-2xl  bg-white'>
     <div><img src={Keys} alt="" className='h-[10vh] pb-1'/></div>
     <div><h1 className='text-[20px] font-semibold py-2'>AI Property Assistant</h1></div>
     <div className='px-2'><p>"Ask our intelligent assistant to compare properties and summarize extra charges."</p></div>
    </div>
   </div>
   </>
  )
}

export default Homesection2
