import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import DesignGalleryImage1 from '../../assets/images/h1.webp';
import DesignGalleryImage2 from '../../assets/images/h2.webp';
import DesignGalleryImage3 from '../../assets/images/h3.webp';
import DesignGalleryImage4 from '../../assets/images/h4.webp';
import DesignGalleryImage5 from '../../assets/images/h5.webp';

const images = [
  { src: DesignGalleryImage1, alt: 'Image 1', buttonText: 'Explore Now' },
  { src: DesignGalleryImage2, alt: 'Image 2', buttonText: 'Explore Now' },
  { src: DesignGalleryImage3, alt: 'Image 3', buttonText: 'Explore Now' },
  { src: DesignGalleryImage4, alt: 'Image 4', buttonText: 'Explore Now' },
  { src: DesignGalleryImage5, alt: 'Image 5', buttonText: 'Explore Now' },
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
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        className="section-content text-white py-8"
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50 }}
        style={{
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          overflow: 'hidden', // Hide any overflow
        }}
      >
        <div className="flex justify-center items-center mb-4">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar"
            style={{ paddingBottom: '16px', scrollBehavior: 'smooth' }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="w-[180px] md:w-[200px] flex-shrink-0 relative"
                style={{ marginRight: index !== images.length - 1 ? '8px' : 0 }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full relative" sx={{ width: '100%', height: '240px' }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={image.src}
                    alt={image.alt}
                    sx={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
                    <motion.button
                      className="bg-white text-black py-1 px-4 rounded-md"
                      style={{ whiteSpace: 'nowrap' }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      {image.buttonText}
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </ThemeProvider>
  );
};

export default HeroSection;
