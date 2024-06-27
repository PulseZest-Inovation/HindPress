import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';

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

  return (
    <div className="categories-section py-8 bg-gray-100">
      <h2 className="text-center text-3xl mb-8">Categories</h2>
      <div className="flex justify-center items-center flex-wrap gap-4">
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
      </div>
    </div>
  );
};

export default CategoriesSection;
