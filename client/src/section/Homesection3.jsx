import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import home1 from "../assets/h1.jpg";
import home2 from "../assets/h2.jpg";
import home3 from "../assets/h3.jpg";
import home4 from "../assets/h4.jpg";
import home5 from "../assets/h5.jpg";

function Homesection3() {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
  };

  const images = [home1, home2, home3, home4, home5];

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1.5, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };

  return (
    <>
      <div className='text-center pt-20 font-dancing pb-8 mt-8 '>
        <p className='text-2xl font-semibold'>Recommendation</p>
        <h1 className='sm:text-[40px] font-bold text-[30px]'>Best homes in the best places</h1>
      </div>
      <div className="flex items-center flex-col justify-center sm:h-[80vh] h-[30vh] mb-0">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={image}
            className="rounded-[12px] sm:w-[40%] w-[42%]" // Adjusted width for mobile view
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute" }}
          />
        ))}
      </div>
    </>
  );
}

export default Homesection3;
