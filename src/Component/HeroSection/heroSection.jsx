import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import DesignGalleryImage6 from '../../assets/images/a6.jpg';
import DesignGalleryImage7 from '../../assets/images/g10.webp';
import DesignGalleryImage1 from '../../assets/images/h1.webp';
import DesignGalleryImage2 from '../../assets/images/h2.webp';
import DesignGalleryImage3 from '../../assets/images/h3.webp';
import DesignGalleryImage4 from '../../assets/images/h4.webp';
import DesignGalleryImage5 from '../../assets/images/h5.webp';

const images = [
  { src: DesignGalleryImage1, alt: 'Design Gallery Image 1' },
  { src: DesignGalleryImage2, alt: 'Design Gallery Image 2' },
  { src: DesignGalleryImage3, alt: 'Design Gallery Image 3' },
  { src: DesignGalleryImage4, alt: 'Design Gallery Image 4' },
  { src: DesignGalleryImage5, alt: 'Design Gallery Image 5' },
  { src: DesignGalleryImage6, alt: 'Design Gallery Image 6' },
  { src: DesignGalleryImage7, alt: 'Design Gallery Image 7' },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#b185db',
    },
    secondary: {
      main: '#421e86',
    },
  },
});

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 200; // Adjust this according to your card width

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
    <ThemeProvider theme={theme}>
      <motion.div
        className="section-content text-white py-8 scroll-container"
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50 }}
        style={{
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          overflow: 'hidden',
        }}
      >
        <div className="flex justify-center items-center mb-4">
          <motion.button
            onClick={goToPrevSlide}
            className={`p-2 ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentImageIndex === 0}
          >
            <KeyboardArrowLeftIcon />
          </motion.button>
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden"
            style={{ paddingBottom: '16px', scrollBehavior: 'smooth', overflowY: 'hidden' }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="w-[180px] md:w-[200px] flex-shrink-0 relative"
                style={{ marginRight: index !== images.length - 1 ? '8px' : 0 }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.20 }}
              >
                <Card className="h-full relative" sx={{ width: '100%', height: '240px' }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={image.src}
                    alt={image.alt}
                    sx={{ width: '100%', height: '100%' }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={goToNextSlide}
            className={`p-2 ${currentImageIndex >= images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentImageIndex >= images.length - 1}
          >
            <KeyboardArrowRightIcon />
          </motion.button>
        </div>
      </motion.div>
    </ThemeProvider>
  );
};

export default HeroSection;
