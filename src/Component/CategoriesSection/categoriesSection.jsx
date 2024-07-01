import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
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

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  // Custom Arrow Component
  const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow left-arrow" onClick={onClick}>
      <KeyboardArrowLeftIcon style={{ fontSize: 40 }} />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow right-arrow" onClick={onClick}>
      <KeyboardArrowRightIcon style={{ fontSize: 40 }} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="categories-section py-8 bg-gray-100">
      <h2 className="text-center text-3xl mb-8">Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="w-60 flex-shrink-0"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleCategoryClick(category.name)}
          >
            <Paper elevation={3} className="p-4 h-full flex flex-col justify-between cursor-pointer">
              <CardMedia
                component="img"
                style={{ height: '200px', objectFit: 'cover' }}
                image={category.fileUrl}
                alt={category.name}
                className="object-cover"
              />
              <div className="p-0 pt-4">
                <h3 className="text-xl mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">ID: {category.id}</p>
              </div>
            </Paper>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesSection;
