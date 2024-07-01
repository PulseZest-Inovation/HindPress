import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { db } from '../../utils/FireBase/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const HeroSection = () => {
  const [posts, setPosts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const cardWidth = 320;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const sectionsCollection = collection(db, 'sections');
        const sectionsSnapshot = await getDocs(sectionsCollection);
        const postPromises = [];

        sectionsSnapshot.forEach((sectionDoc) => {
          const postIds = sectionDoc.data().postIds;
          if (postIds) {
            const postIdsArray = postIds.split(',');
            const randomPostId = postIdsArray[Math.floor(Math.random() * postIdsArray.length)];
            const postDocRef = doc(db, 'posts', randomPostId.trim());
            postPromises.push(getDoc(postDocRef));
          }
        });

        const postDocs = await Promise.all(postPromises);
        const postsData = postDocs.map((postDoc) => ({
          id: postDoc.id,
          ...postDoc.data(),
        }));

        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentImageIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentImageIndex]);

  const goToNextSlide = () => {
    const newIndex = Math.min(currentImageIndex + 1, posts.length - 1);
    controls.start({ x: `-${newIndex * cardWidth}px` });
    setCurrentImageIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = Math.max(currentImageIndex - 1, 0);
    controls.start({ x: `-${newIndex * cardWidth}px` });
    setCurrentImageIndex(newIndex);
  };

  return (
    <motion.div
      className="section-content bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-8"
      initial={{ x: '-100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <div className="flex justify-center items-center mb-4 space-x-4">
        <motion.button
          onClick={goToPrevSlide}
          className={`p-2 rounded-full bg-white text-purple-500 ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ scale: 1.1, backgroundColor: '#f0f0f0' }}
          whileTap={{ scale: 0.9 }}
        >
          <KeyboardArrowLeftIcon />
        </motion.button>
        <div
          ref={scrollRef}
          className="overflow-x-hidden overflow-y-hidden flex space-x-4 w-full smooth-scroll"
          style={{ scrollBehavior: 'smooth' }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className="w-80 flex-shrink-0 rounded-lg shadow-lg"
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Link to={`/posts/${post.id}`} className="block">
                <Card className="h-full rounded-lg overflow-hidden">
                  <CardMedia
                    component="img"
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <CardContent>
                    <h3 className="text-lg font-semibold">{post.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.button
          onClick={goToNextSlide}
          className={`p-2 rounded-full bg-white text-purple-500 ${currentImageIndex >= posts.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          whileHover={{ scale: 1.1, backgroundColor: '#f0f0f0' }}
          whileTap={{ scale: 0.9 }}
        >
          <KeyboardArrowRightIcon />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HeroSection;