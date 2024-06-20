import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import DesignGalleryImage1 from '../../assets/images/1.jpg';
import DesignGalleryImage2 from '../../assets/images/2.jpeg';
import DesignGalleryImage3 from '../../assets/images/3.jpg';
import DesignGalleryImage4 from '../../assets/images/4.png';
import DesignGalleryImage5 from '../../assets/images/5.jpeg';

const images = [
  DesignGalleryImage1,
  DesignGalleryImage2,
  DesignGalleryImage3,
  DesignGalleryImage4,
  DesignGalleryImage5,
];

const Popular = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 320; // Define card width including margins/padding

  const goToNextSlide = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: (currentImageIndex + 1) * cardWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const goToPrevSlide = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: (currentImageIndex - 1) * cardWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <motion.div
      className="section-content bg-white text-black py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-4">
        <hr className="border-gray-400 w-1/3" />
        <h2 className="text-center text-3xl font-bold mx-4 text-yellow-500">
          Popular Products
        </h2>
        <hr className="border-gray-400 w-1/3" />
      </div>
      <div className="flex justify-center items-center mb-4">
        <motion.button
          onClick={goToPrevSlide}
          className={`p-2 ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <KeyboardArrowLeftIcon />
        </motion.button>
        <div ref={scrollRef} className="overflow-x-hidden overflow-y-hidden flex space-x-4 w-full">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="w-80 flex-shrink-0"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <Card className="h-full">
                <CardMedia component="img" height="140" image={image} alt={`Image Slide ${index + 1}`} />
                <CardContent>
                  {/* Additional content for each card can go here */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.button
          onClick={goToNextSlide}
          className={`p-2 ${currentImageIndex >= images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <KeyboardArrowRightIcon />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Popular;
