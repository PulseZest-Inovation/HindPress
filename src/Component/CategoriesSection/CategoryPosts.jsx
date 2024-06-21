import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';

const CategoryPosts = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [categoryNameFromDB, setCategoryNameFromDB] = useState('');

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoryQuerySnapshot = await getDocs(collection(db, 'categories'));
        categoryQuerySnapshot.forEach(doc => {
          if (doc.data().name === categoryName) {
            setCategoryNameFromDB(doc.data().name);
            fetchPosts(doc.data().id); // Fetch posts where categoryId matches category id
          }
        });
      } catch (error) {
        console.error("Error fetching category details: ", error);
      }
    };

    const fetchPosts = async (categoryId) => {
      try {
        const q = query(collection(db, 'posts'), where('categoryId', '==', categoryId));
        const querySnapshot = await getDocs(q);

        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchCategoryDetails();
  }, [categoryName]);

  return (
    <div className="category-posts-section py-8 bg-gray-100">
      <h2 className="text-center text-3xl mb-8">Category: {categoryNameFromDB}</h2>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {posts.map(post => (
          <motion.div
            key={post.id}
            className="w-60 flex-shrink-0"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={3} className="p-4 h-full flex flex-col justify-between">
              <CardMedia
                component="img"
                height="120"
                image={post.imageUrl}
                alt={post.name}
                className="object-cover"
              />
              <CardContent className="p-0 pt-4">
                <h3 className="text-xl mb-2">{post.name}</h3>
                <p className="text-sm text-gray-500">Price: ${post.price}</p>
                <p className="text-sm text-gray-500">{post.description}</p>
              </CardContent>
            </Paper>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPosts;
