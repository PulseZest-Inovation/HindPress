import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import DesignGalleryImage1 from '../../assets/images/l1.webp';
import DesignGalleryImage10 from '../../assets/images/l10.webp';
import DesignGalleryImage2 from '../../assets/images/l2.webp';
import DesignGalleryImage3 from '../../assets/images/l3.webp';
import DesignGalleryImage4 from '../../assets/images/l4.webp';
import DesignGalleryImage5 from '../../assets/images/l5.webp';
import DesignGalleryImage6 from '../../assets/images/l6.webp';
import DesignGalleryImage7 from '../../assets/images/l7.webp';
import DesignGalleryImage8 from '../../assets/images/l8.webp';
import DesignGalleryImage9 from '../../assets/images/l9.webp';

const images = [
  { src: DesignGalleryImage1, title: "Rare Rabbit Round Neck T-Shirts" },
  { src: DesignGalleryImage2, title: "Rare Rabbit Polo T-Shirts" },
  { src: DesignGalleryImage3, title: "AcrylicWood QR Code Scanner" },
  { src: DesignGalleryImage4, title: "Rubber Stamp" },
  { src: DesignGalleryImage5, title: "Photo Pendant Wooden Stand" },
  { src: DesignGalleryImage6, title: "Standard Acrylic Photo Frames" },
  { src: DesignGalleryImage7, title: "Photo with Wooden Stand" },
  { src: DesignGalleryImage8, title: "Employee Joining Kits" },
  { src: DesignGalleryImage9, title: "Jute Bag" },
  { src: DesignGalleryImage10, title: "Holographic Stickers" },
];

const New = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 280; // Define card width + margin

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
      <div className="flex items-center justify-center mb-2"> {/* Adjusted mb-2 */}
        <hr className="border-gray-400 w-1/3" />
        <h2 className="text-center text-3xl font-bold mx-4 text-yellow-500">
          New Launches
        </h2>
        <hr className="border-gray-400 w-1/3" />
      </div>
      <div className="flex justify-center items-center mb-2"> {/* Adjusted mb-2 */}
        <motion.button
          onClick={goToPrevSlide}
          className={`p-2 ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <KeyboardArrowLeftIcon />
        </motion.button>
        <div ref={scrollRef} className="overflow-x-hidden overflow-y-hidden flex space-x-2 w-full">
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
                  height="100" // Adjusted height value
                  image={image.src}
                  alt={`Image Slide ${index + 1}`}
                  onError={(e) => e.currentTarget.src = '/fallback.jpg'}
                />
                <CardContent>
                  <h3 className="text-center">{image.title}</h3>
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
          transition={{ duration: 0.3 }}
        >
          <KeyboardArrowRightIcon />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default New;
