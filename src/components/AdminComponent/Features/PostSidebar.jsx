import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/FireBase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

const PostSidebar = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name, // Assuming 'name' field exists in your Firestore document
          ...doc.data()
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error fetching data (e.g., show a message to the user)
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '20px' }}>
      <h3 style={{ marginBottom: '10px' }}>All Posts</h3>
      <input
        type="text"
        placeholder="Search Posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', width: '100%', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredPosts.map(post => (
          <li key={post.id} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                onChange={() => onSelectPost(post.id)}
                style={{ marginRight: '5px' }}
              />
              {post.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostSidebar;
