import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import DesignGalleryImage1 from '../../assets/images/P1.jpg';
import DesignGalleryImage10 from '../../assets/images/P10.jpg';
import DesignGalleryImage11 from '../../assets/images/P11.jpg';
import DesignGalleryImage12 from '../../assets/images/P12.jpg';
import DesignGalleryImage2 from '../../assets/images/P2.jpg';
import DesignGalleryImage3 from '../../assets/images/P3.jpg';
import DesignGalleryImage4 from '../../assets/images/P4.jpg';
import DesignGalleryImage5 from '../../assets/images/P5.jpg';
import DesignGalleryImage6 from '../../assets/images/P6.jpg';
import DesignGalleryImage7 from '../../assets/images/P7.jpg';
import DesignGalleryImage8 from '../../assets/images/P8.jpg';
import DesignGalleryImage9 from '../../assets/images/P9.jpg';

const images = [
  { src: DesignGalleryImage1, title: "Business Cards" },
  { src: DesignGalleryImage2, title: "Apparel" },
  { src: DesignGalleryImage3, title: "Corporate Gifts" },
  { src: DesignGalleryImage4, title: "Drinkware" },
  { src: DesignGalleryImage5, title: "Mailer Boxes" },
  { src: DesignGalleryImage6, title: "Awards" },
  { src: DesignGalleryImage7, title: "Stickers" },
  { src: DesignGalleryImage8, title: "Name Plates" },
  { src: DesignGalleryImage9, title: "Backpacks" },
  { src: DesignGalleryImage10, title: "Labels" },
  { src: DesignGalleryImage11, title: "Courier Poly Bag" },
  { src: DesignGalleryImage12, title: "Posters" },
];

const Popular = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 280; // Adjusted card width including margins/padding

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
            className="w-64 flex-shrink-0" // Adjusted width to w-64
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.20 }}
            >
              <Card className="h-full">
                <CardMedia
                  component="img"
                  height="140"
                  image={image.src} // Ensure image.src is correctly used
                  alt={`Image Slide ${index + 1}`}
                  onError={(e) => e.currentTarget.src = '/fallback.jpg'} // Example fallback image path
                />
                <CardContent>
                  <p className="text-black">{image.title}</p> {/* Ensure text color is black */}
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
