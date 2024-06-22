import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import Header from "../Header/header";
import Footer from "../footer/footer";

const CategoryPosts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [categoryNameFromDB, setCategoryNameFromDB] = useState('');

  useEffect(() => {
    if (location.state && location.state.searchResults) {
      setPosts(location.state.searchResults);
    } else {
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
    }
  }, [categoryName, location.state]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <Header onSearchResults={(results) => setPosts(results)} />
      <div className="category-posts-section py-8 bg-gray-100">
        <h2 className="text-center text-4xl font-bold mb-12 text-gray-800">Category: {categoryNameFromDB}</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {posts.map(post => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handlePostClick(post.id)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={post.imageUrl}
                  alt={post.name}
                  className="w-full object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.name}</h3>
                  <div className="flex justify-start items-center text-gray-700 mb-4 space-x-2">
                    <p className="text-lg font-bold text-green-600">${post.sellingPrice}</p>
                    <p className="text-base line-through">${post.actualPrice}</p>
                  </div>
                  <p className="text-sm text-gray-600">{post.description}</p>
                </CardContent>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPosts;
