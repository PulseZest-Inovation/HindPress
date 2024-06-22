import React, { useEffect, useState } from 'react';
import { db } from '../utils/FireBase/firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import Header from '../Component/Header/header';
import Footer from '../Component/footer/footer';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CategoriesSection from '../Component/CategoriesSection/categoriesSection';

const Home = () => {
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
      // Remove post from current section
      const currentSectionRef = doc(db, 'sections', currentSectionId);
      const currentSectionSnapshot = await getDoc(currentSectionRef);
      if (currentSectionSnapshot.exists()) {
        const currentPostIds = currentSectionSnapshot.data().postIds.split(',');
        const updatedPostIds = currentPostIds.filter(id => id !== postId);
        await updateDoc(currentSectionRef, { postIds: updatedPostIds.join(',') });
      }

      // Add post to new section
      const newSectionRef = doc(db, 'sections', newSectionId);
      const newSectionSnapshot = await getDoc(newSectionRef);
      if (newSectionSnapshot.exists()) {
        const newPostIds = newSectionSnapshot.data().postIds.split(',');
        const updatedPostIds = [...newPostIds, postId];
        await updateDoc(newSectionRef, { postIds: updatedPostIds.join(',') });
      }

      // Refresh sections after moving the post
      fetchSectionsAndPosts();
    } catch (error) {
      console.error('Error moving post:', error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`); // Navigate to the post details page
  };

  return (
    <div>
      <Header />
      <CategoriesSection />
      <div className="container mx-auto px-4">
        {sections.map(section => (
          <div key={section.id} className="text-center mb-8">
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-200 to-white">
              <h2 className="text-3xl font-bold py-4 bg-blue-500 text-white">{section.title}</h2>
              <div className="flex overflow-x-auto p-4">
                {section.posts.map(post => (
                  <motion.div
                    key={post.id}
                    className="w-72 flex-shrink-0 mr-4 relative"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handlePostClick(post.id)} // Handle click to show post details
                  >
                    <Paper elevation={3} className="p-4 h-full flex flex-col justify-between cursor-pointer">
                      <CardMedia
                        component="img"
                        height="160"
                        image={post.imageUrl} // Assuming imageUrl is a field in your post document
                        alt={post.title} // Assuming title is a field in your post document
                        className="object-cover"
                      />
                      <div className="p-0 pt-4">
                        <h3 className="text-lg mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-500">Name: {post.name}</p>
                      </div>
                      <div className="flex justify-between mt-4">
                        {/* Slide-in buttons */}
                        <div className="post-buttons absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md mr-2"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent section click when clicking button
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

      <Footer />
    </div>
  );
};

export default Home;
