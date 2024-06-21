import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';

const CategoryPosts = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [categoryNameFromDB, setCategoryNameFromDB] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [categoryFilters, setCategoryFilters] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoryQuerySnapshot = await getDocs(collection(db, 'categories'));
        categoryQuerySnapshot.forEach(doc => {
          if (doc.data().name === categoryName) {
            setCategoryNameFromDB(doc.data().name);
            fetchPosts(doc.data().id); // Fetch posts where categoryId matches category id
            fetchCategoryFilters(doc.data().id); // Fetch category filters
          }
        });
      } catch (error) {
        console.error("Error fetching category details: ", error);
      }
    };

    const fetchCategoryFilters = async (categoryId) => {
      try {
        const filtersQuerySnapshot = await getDocs(collection(db, 'filterCollections', categoryId, 'filters'));
        const filtersData = filtersQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoryFilters(filtersData);
      } catch (error) {
        console.error("Error fetching category filters: ", error);
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
        setFilteredPosts(postsData); // Initialize filtered posts with all posts
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchCategoryDetails();
  }, [categoryName, db]);

  // Function to handle filter selection
  const handleFilterClick = async (filterId) => {
    setSelectedFilter(filterId);
    try {
      // Construct the reference to the filter document
      const filterDocRef = doc(db, 'filterCollections', categoryName, 'filters', filterId);
  
      // Fetch the document
      const filterDocSnap = await getDoc(filterDocRef);
  
      // Check if the document exists
      if (filterDocSnap.exists()) {
        // Extract postIds array from the document data
        const postData = filterDocSnap.data();
        const postIds = postData.postIds || [];
  
        // Log the postIds array
        console.log("Post IDs array:", postIds);
  
        // Set filteredPosts to the postIds array
        setFilteredPosts(postIds);
      } else {
        console.error(`Filter with ID ${filterId} does not exist.`);
      }
    } catch (error) {
      console.error("Error fetching filtered posts details: ", error);
    }
  };
  
  
  
  

  return (
    <div className="category-posts-section py-8 bg-gray-100">
    <h2 className="text-center text-3xl mb-8">Category: {categoryNameFromDB}</h2>

    {/* Filter buttons */}
    <div className="flex justify-center items-center gap-4 mb-4">
      {categoryFilters.map(filter => (
        <div
          key={filter.id}
          className={`relative p-2 border rounded-md cursor-pointer ${selectedFilter === filter.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-200'}`}
          onClick={() => handleFilterClick(filter.id)}
        >
          {filter.name}
          {selectedFilter === filter.id && (
            <div className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded-md p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Filter Details</h3>
              <p className="text-sm text-gray-700">Details for filter: {filter.name}</p>
              
              {/* Display postIds */}
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-1">Post IDs:</h4>
      <ul className="list-disc pl-4">
      {filteredPosts.map((postId, index) => (
  <li key={index}>{`Index ${index}: ${postId}`}</li>
))}
      </ul>
    </div>
            </div>
          )}
        </div>
      ))}
    </div>
      {/* Display posts based on selected filter */}
      <div className="flex justify-center items-center flex-wrap gap-4">
        {filteredPosts.map(post => (
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
