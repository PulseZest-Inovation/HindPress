import React, { useEffect, useState } from 'react';
import DesignGalleryImage1 from '../../assets/images/o1.webp';

const PosterPage = () => {
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
          <a
            href="/poster-details" // Replace with actual route path
            style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
          >
            <img
              src={imageSrc}
              alt="Blurred Placeholder"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              style={{ cursor: 'pointer' }}
            />
          </a>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Any overlay content or actions */}
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default PosterPage;
