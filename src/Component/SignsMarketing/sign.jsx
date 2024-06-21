import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import DesignGalleryImage1 from '../../assets/images/m1.jpg';
import DesignGalleryImage2 from '../../assets/images/m2.jpg';
import DesignGalleryImage3 from '../../assets/images/m3.jpg';
import DesignGalleryImage4 from '../../assets/images/m4.jpg';
import DesignGalleryImage5 from '../../assets/images/m5.jpg';
import DesignGalleryImage6 from '../../assets/images/m6.jpg';
import DesignGalleryImage7 from '../../assets/images/m7.jpg';

const images = [
  { src: DesignGalleryImage1, title: "Packaging Labels" },
  { src: DesignGalleryImage2, title: "Stand Up Pouches" },
  { src: DesignGalleryImage3, title: "Sleeved Mailer Boxes" },
  { src: DesignGalleryImage4, title: "Paper Bags" },
  { src: DesignGalleryImage5, title: "Courier Poly Bags" },
  { src: DesignGalleryImage6, title: "Packing Tape" },
  { src: DesignGalleryImage7, title: "Food & Cake Boxes" },
];

const Sign = () => {
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
          Sign & Marketing
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
        <div
  ref={scrollRef}
  className="overflow-x-hidden overflow-y-hidden flex space-x-2 w-full smooth-scroll"
>
  {images.map((image, index) => (
    <motion.div
      key={index}
      className="w-64 flex-shrink-0" // Adjusted width to w-64
      whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <Card className="h-full">
        <CardMedia
          component="img"
          height="140"
          image={image.src}
          alt={`Image Slide ${index + 1}`}
        />
        <CardContent className="text-black">
          <h3 className="text-black">{image.title}</h3>
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

export default Sign;
