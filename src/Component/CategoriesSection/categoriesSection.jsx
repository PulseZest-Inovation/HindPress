import { CardMedia, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { db } from '../../utils/FireBase/firebaseConfig';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = categoryName => {
    navigate(`/category/${categoryName}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="categories-section py-8 bg-gray-100">
      <h2 className="text-center text-3xl mb-8">Categories</h2>
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {categories.map(category => (
            <motion.div
              key={category.id}
              className="p-2"
              style={{ margin: '0 10px' }} // Add margin for equal spacing
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <Paper elevation={3} className="p-4 h-full flex flex-col justify-between cursor-pointer">
                <CardMedia
                  component="img"
                  style={{ height: '150px', objectFit: 'cover' }}
                  image={category.fileUrl}
                  alt={category.name}
                  className="object-cover rounded-t-md"
                />
                <div className="p-4">
                  <h3 className="text-lg mb-2 text-center">{category.name}</h3>
                </div>
              </Paper>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoriesSection;
