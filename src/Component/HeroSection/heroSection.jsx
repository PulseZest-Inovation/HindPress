import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CategoriesSection from '../CategoriesSection/categoriesSection'; // Adjust the path as necessary
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

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const cardWidth = 320; // Card width + margin

  useEffect(() => {
    // Animate scrolling on current image index change
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentImageIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentImageIndex]);

  const goToNextSlide = () => {
    const newIndex = Math.min(currentImageIndex + 1, images.length - 1);
    controls.start({ x: `-${newIndex * cardWidth}px` });
    setCurrentImageIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = Math.max(currentImageIndex - 1, 0);
    controls.start({ x: `-${newIndex * cardWidth}px` });
    setCurrentImageIndex(newIndex);
  };

  return (
    <>
      <motion.div
        className="section-content bg-purple-950 text-white py-8"
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <div className="flex justify-center items-center mb-4 space-x-4">
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
            className="overflow-x-hidden overflow-y-hidden flex space-x-4 w-full smooth-scroll"
            style={{ scrollBehavior: 'smooth' }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="w-80 flex-shrink-0"
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardMedia component="img" height="140" image={image} alt={`Image Slide ${index + 1}`} />
                  <CardContent>
                    {/* Add any additional content for the card here */}
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
      <CategoriesSection />
    </>
  );
};

export default HeroSection;
