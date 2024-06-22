import React, { useState, useEffect } from 'react';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

const Section = ({ title, postIds }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), where('id', 'in', postIds));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };

    fetchPosts();
  }, [postIds]);

  return (
    <div className="section py-8 bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-12 text-gray-800">{title}</h2>
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
            >
              <img
                src={post.imageUrl}
                alt={post.name}
                className="w-full object-cover h-48"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.name}</h3>
                <div className="flex justify-between items-center text-gray-700 mb-4">
                  <p className="text-lg font-bold text-green-600">${post.sellingPrice}</p>
                  <p className="text-base line-through">${post.actualPrice}</p>
                </div>
                <p className="text-sm text-gray-600">{post.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
