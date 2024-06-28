import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { motion } from 'framer-motion';

const SectionPostDetails = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigate = useNavigate();
  const scrollRefs = useRef([]); // Multiple refs for each section
  const cardWidth = 320;

  useEffect(() => {
    const fetchSectionsAndPosts = async () => {
      try {
        // Fetch all posts
        const postsSnapshot = await getDocs(collection(db, 'posts'));
        const postsData = {};
        postsSnapshot.forEach(doc => {
          postsData[doc.id] = { id: doc.id, ...doc.data() };
        });

        // Fetch all sections
        const sectionsSnapshot = await getDocs(collection(db, 'sections'));
        const sectionsData = [];

        sectionsSnapshot.forEach(docSnap => {
          const sectionData = {
            id: docSnap.id,
            ...docSnap.data(),
            posts: []
          };

          const postIds = sectionData.postIds.split(',');
          sectionData.posts = postIds.map(postId => postsData[postId]).filter(post => post);

          sectionsData.push(sectionData);
        });

        setSections(sectionsData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching sections and posts:', error);
      }
    };

    fetchSectionsAndPosts();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const goToNextSlide = (index) => {
    const scrollRef = scrollRefs.current[index];
    if (scrollRef) {
      const maxScrollLeft = scrollRef.scrollWidth - scrollRef.clientWidth;
      scrollRef.scrollTo({
        left: Math.min(scrollRef.scrollLeft + cardWidth, maxScrollLeft),
        behavior: 'smooth'
      });
    }
  };

  const goToPrevSlide = (index) => {
    const scrollRef = scrollRefs.current[index];
    if (scrollRef) {
      scrollRef.scrollTo({
        left: Math.max(scrollRef.scrollLeft - cardWidth, 0),
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <motion.div
      className="section-content bg-white text-black py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <div key={section.id}>
          <div className="flex items-center justify-center mb-4">
            <hr className="border-gray-400 w-1/3" />
            <h2 className="text-center text-3xl font-bold mx-4 text-yellow-500">
              {section.title}
            </h2>
            <hr className="border-gray-400 w-1/3" />
          </div>
          <div className="flex justify-center items-center mb-4">
            <motion.button
              onClick={() => goToPrevSlide(index)}
              className="p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <KeyboardArrowLeftIcon />
            </motion.button>
            <div
              ref={(el) => (scrollRefs.current[index] = el)}
              className="overflow-x-hidden overflow-y-hidden flex space-x-4 w-full"
              style={{ maxHeight: '100vh', overflowY: 'hidden' }} // Ensure no vertical scrollbar
            >
              {section.posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="w-80 flex-shrink-0"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  onClick={() => handlePostClick(post.id)}
                >
                  <Card className="h-full">
                    <CardMedia
                      component="img"
                      style={{ height: '200px', objectFit: 'cover' }}
                      image={post.imageUrl}
                      alt={post.title}
                    />
                    <CardContent>
                      {/* Add any additional content for the card here */}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => goToNextSlide(index)}
              className="p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <KeyboardArrowRightIcon />
            </motion.button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default SectionPostDetails;
