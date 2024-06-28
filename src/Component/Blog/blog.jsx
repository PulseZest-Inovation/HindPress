import React, { useEffect, useState } from 'react';
import DesignGalleryImage1 from '../../assets/images/r1.jpg';

const images = [
  { src: DesignGalleryImage1 }
];

const App = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      // Simulating a delay to fetch the image
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Replace with your actual image URL
      const imageUrl = DesignGalleryImage1; // Use the imported image URL here
      setImageSrc(imageUrl);
      setImageLoaded(true);
    };

    loadImage();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      {imageLoaded ? (
        <div className="relative text-center">
          <div className="max-w-full overflow-hidden rounded-lg blur" style={{ filter: 'blur(8px)', height: '350px' }}>
            <img
              src={imageSrc} // Use imageSrc state variable here
              alt="Blurred Placeholder"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-shadow-lg">
          "Ink, Paper, Passion – <br/> We Bring Your Vision to Life"        
            </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default App;