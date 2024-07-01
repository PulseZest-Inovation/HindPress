import React, { useEffect, useState } from 'react';
import DesignGalleryImage1 from '../../assets/images/o1.webp';

const App = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      // Simulating a delay to fetch the image
      await new Promise(resolve => setTimeout(resolve, 2000));
      const imageUrl = DesignGalleryImage1; // Use the imported image URL here
      setImageSrc(imageUrl);
      setImageLoaded(true);
    };

    loadImage();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      {imageLoaded ? (
        <div className="relative text-center">
          <div className="max-w-full" style={{ height: 'auto' }}>
            <img
              src={imageSrc}
              alt="Blurred Placeholder"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default App;
