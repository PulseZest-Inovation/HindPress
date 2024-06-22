import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

const SectionsAndPosts = () => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const scrollContainer = useRef(null);

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

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 300;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {sections.map(section => (
        <div key={section.id} className="mb-12 relative">
          <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
            <h2 className="text-4xl font-extrabold py-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center">
              {section.title}
            </h2>
            <div className="relative flex items-center">
              <button
                className="absolute left-0 bg-gray-800 text-white p-2 rounded-full z-10"
                onClick={scrollLeft}
              >
                &lt;
              </button>
              <div ref={scrollContainer} className="flex p-6 space-x-4 overflow-x-auto">
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
                        <p className="text-sm font-bold text-black-800 text-shadow">Name: {post.name}</p>
                      </div>
                      <div className="flex justify-between mt-4 relative group">
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      </div>
                    </Paper>
                  </motion.div>
                ))}
              </div>
              <button
                className="absolute right-0 bg-gray-800 text-white p-2 rounded-full z-10"
                onClick={scrollRight}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionsAndPosts;
