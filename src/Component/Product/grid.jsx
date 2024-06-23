import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import DesignGalleryImage1 from '../../assets/images/d1.webp';
import DesignGalleryImage2 from '../../assets/images/d2.webp';
import DesignGalleryImage3 from '../../assets/images/d3.webp';
import DesignGalleryImage4 from '../../assets/images/d4.webp';
import DesignGalleryImage5 from '../../assets/images/d5.webp';
import DesignGalleryImage6 from '../../assets/images/d6.webp';

const images = [
  { src: DesignGalleryImage1, title: "Gift Hampers" },
  { src: DesignGalleryImage2, title: "Backpacks" },
  { src: DesignGalleryImage3, title: "Diaries" },
  { src: DesignGalleryImage4, title: "Awards" },
  { src: DesignGalleryImage5, title: "Drinkware" },
  { src: DesignGalleryImage6, title: "View All Corporate Gifts" },
];

const Grid = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 320; // Define card width + margin

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentImageIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentImageIndex]);

  const goToNextSlide = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleViewAllClick = () => {
    // Logic to view all images or navigate to another page
    console.log("View All clicked");
    // Example: navigate to another page or open a modal
    // window.location.href = '/view-all-page';
  };

  return (
    <motion.div
      className="section-content bg-white text-black py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center w-full px-6">
      <h1 className="text-center text-3xl font-bold mx-4 text-yellow-500">
      Motivate, Inspire, and Appreciate Your Team</h1> {/* Adjusted margin-top here */}
        <p className="text-gray-700"><br/>
          Find the Perfect Gift for your Team - Start Exploring Our Collection!
        </p>
      </div>
      <div className="flex justify-center items-center mt-2"> {/* Adjusted margin-top here */}
        <motion.button
          onClick={goToPrevSlide}
          className={`p-2 ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <KeyboardArrowLeftIcon />
        </motion.button>
        <div
          ref={scrollRef}
          className="overflow-x-hidden overflow-y-hidden flex space-x-2 w-full smooth-scroll"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="w-64 flex-shrink-0"
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.20 }}
            >
              <Card
                className={`h-full ${index === images.length - 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : ''}`}
                onClick={index === images.length - 1 ? handleViewAllClick : null}
                style={index === images.length - 1 ? { cursor: 'pointer', border: '2px solid #FFA500', transform: 'scale(1.05)' } : {}}
              >
                {image.src ? (
                  <>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image.src}
                      alt={`Image Slide ${index + 1}`}
                    />
                    <CardContent className="text-black">
                      <h3 className={`text-black ${index === images.length - 1 ? 'text-lg font-bold' : ''}`}>
                        {image.title}
                      </h3>
                    </CardContent>
                  </>
                ) : (
                  <div
                    className="flex items-center justify-center h-full"
                    onClick={handleViewAllClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 className="text-black">{image.title}</h3>
                  </div>
                )}
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

export default Grid;
