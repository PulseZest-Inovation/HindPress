import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="categories-section py-8 bg-gray-100">
      <h2 className="text-center text-3xl mb-8">Categories</h2>
      <div className="container mx-auto px-4">
        <div
          className="categories-slider"
          style={{
            display: 'flex',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              style={{
                display: 'inline-block',
                width: '240px', /* 60rem / 4 */
                marginRight: '16px', /* 4rem / 4 */
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <Paper
                elevation={3}
                style={{
                  padding: '8px', /* 2rem / 4 */
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <CardMedia
                  component="img"
                  style={{ height: '150px', objectFit: 'cover' }}
                  image={category.fileUrl}
                  alt={category.name}
                  className="object-cover"
                />
                <div style={{ padding: '0 0 8px 0' }}> {/* 2rem / 4 */}
                  <h3 className="text-md mb-2 text-center">{category.name}</h3>
                </div>
              </Paper>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;