import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/FireBase/firebaseConfig';
import Header from '../Header/header';
import Footer from '../footer/footer';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post details: ", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="post-details-section py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={post.imageUrl} alt={post.name} className="w-full object-cover rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{post.name}</h2>
              <div className="flex justify-start items-center text-gray-700 mb-4 space-x-2">
                <p className="text-3xl font-bold text-green-600">₹{post.sellingPrice}</p>
                <p className="text-xl line-through">₹{post.actualPrice}</p>
              </div>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-4 shadow-lg transition duration-300 transform hover:scale-105">
                Query
              </button>
              <p className="mt-4 text-gray-500">Only 1 left in stock. Order soon!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
