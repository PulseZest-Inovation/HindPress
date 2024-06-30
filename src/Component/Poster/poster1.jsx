import React, { useEffect, useState } from 'react';
import DesignGalleryImage1 from '../../assets/images/r1.jpg';

const Images = [
  { src: DesignGalleryImage1 }
];

const Poster1 = () => {
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
            <img
              src={imageSrc} // Use imageSrc state variable here
              alt="Blurred Placeholder"
              className="w-full h-full object-cover"
            />
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default Poster1;
