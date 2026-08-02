import React from 'react'
import steps from "../assets/steps.jpeg"
import s1 from "../assets/map.svg"
import s2 from "../assets/money.svg"
import s3 from "../assets/car.svg"
function Homesection4() {
  return (
    <>
    <div className='w-[95vw] lg:h-[60vh] flex flex-col lg:flex-row  items-center  lg:justify-around sm:mt-40 mt-16   font-playfair'>
      <div className='lg:w-[46%] md:w-[60vw] w-[95vw] h-[60vh] flex  flex-col justify-center lg:justify-start lg:items-start gap-2 pl-4'>
     <div><h1 className='sm:text-[40px] text-[25px] font-bold pb-4 font-dancing'>Book your home in three easy steps</h1></div> 
  
    <div className='flex gap-4  pb-4'>
      <div><img src={s1} alt="" /></div>
      <div>
        <h1>Choose Destination</h1>
        <p>"Select your ideal locale. Start your property search today!"</p>
        </div>
  
    </div>
    <div className='flex gap-4 pb-4'>
      <div><img src={s2} alt="" /></div>
      <div>
        <h1>Choose Destination</h1>
        <p>"Select your ideal locale. Start your property search today!"</p>
        </div>
  
    </div>
    <div className='flex gap-4 pb-4'>
      <div><img src={s3} alt="" /></div>
      <div>
        <h1>Choose Destination</h1>
        <p>"Select your ideal locale. Start your property search today!"</p>
        </div>
        </div>
    </div>
      
      <div className='lg:w-[46%] md:w-[60vw] w-[95vw] h-[60vh] mt-8'>
        <div><img src={steps} alt="" className='lg:w-[46vw] md:w-[60vw] w-[95vw] h-[50vh] rounded-2xl shadow-2xl ml-2' /></div>
      </div>
    </div>
    </>
  )
}

export default Homesection4
