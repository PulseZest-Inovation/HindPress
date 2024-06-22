import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

const SectionsAndPosts = () => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  const fetchSectionsAndPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'sections'));
      const sectionsData = [];

      for (const docRef of querySnapshot.docs) {
        const sectionData = {
          id: docRef.id,
          ...docRef.data(),
          posts: []
        };

        const postIds = sectionData.postIds.split(',');

        for (const postId of postIds) {
          const postRef = doc(db, 'posts', postId);
          const postSnapshot = await getDoc(postRef);
          if (postSnapshot.exists()) {
            sectionData.posts.push({
              id: postId,
              ...postSnapshot.data()
            });
          } else {
            console.error(`Post with ID ${postId} not found.`);
          }
        }

        sectionsData.push(sectionData);
      }

      setSections(sectionsData);
    } catch (error) {
      console.error('Error fetching sections and posts:', error);
    }
  };

  useEffect(() => {
    fetchSectionsAndPosts();
  }, []);

  const handleSectionClick = (sectionId) => {
    navigate(`/section/${sectionId}`);
  };

  const handleMovePost = async (postId, currentSectionId, newSectionId) => {
    try {
      const currentSectionRef = doc(db, 'sections', currentSectionId);
      const currentSectionSnapshot = await getDoc(currentSectionRef);
      if (currentSectionSnapshot.exists()) {
        const currentPostIds = currentSectionSnapshot.data().postIds.split(',');
        const updatedPostIds = currentPostIds.filter(id => id !== postId);
        await updateDoc(currentSectionRef, { postIds: updatedPostIds.join(',') });
      }

      const newSectionRef = doc(db, 'sections', newSectionId);
      const newSectionSnapshot = await getDoc(newSectionRef);
      if (newSectionSnapshot.exists()) {
        const newPostIds = newSectionSnapshot.data().postIds.split(',');
        const updatedPostIds = [...newPostIds, postId];
        await updateDoc(newSectionRef, { postIds: updatedPostIds.join(',') });
      }

      fetchSectionsAndPosts();
    } catch (error) {
      console.error('Error moving post:', error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {sections.map(section => (
        <div key={section.id} className="mb-12">
          <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
            <h2 className="text-4xl font-extrabold py-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center">
              {section.title}
            </h2>
            <div className="flex overflow-x-auto p-6 space-x-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-900">
              {section.posts.map(post => (
                <motion.div
                  key={post.id}
                  className="w-80 flex-shrink-0 relative rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 0, 0, 0.4)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handlePostClick(post.id)}
                >
                  <Paper elevation={3} className="p-4 h-full flex flex-col justify-between cursor-pointer bg-gray-800 text-white rounded-lg transform transition-transform duration-300 hover:scale-105">
                    <CardMedia
                      component="img"
                      height="180"
                      image={post.imageUrl}
                      alt={post.title}
                      className="object-cover rounded-lg"
                    />
                    <div className="pt-4">
                      <h3 className="text-xl mb-2 font-semibold">{post.title}</h3>
                      <p className="text-sm text-red-400">Name: {post.name}</p>
                    </div>
                    <div className="flex justify-between mt-4 relative group">
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMovePost(post.id, section.id, 'otherSectionId');
                          }}
                        >
                          Move to Other Section
                        </button>
                      </div>
                    </div>
                  </Paper>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionsAndPosts;
