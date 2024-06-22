import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/FireBase/firebaseConfig';
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import PostSidebar from './PostSidebar'; // Adjust path as per your file structure

const AddHeadLine = () => {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: '', postIds: [] }); // Initialize postIds as an array

  // Define fetchSections function
  const fetchSections = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'sections'));
      const sectionsData = [];

      for (const docRef of querySnapshot.docs) {
        const sectionData = {
          id: docRef.id,
          ...docRef.data(),
          posts: [] // Initialize posts array
        };

        // Fetch posts for the current section
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
      console.error('Error fetching sections:', error);
      // Handle error fetching data (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    fetchSections(); // Initial fetch on component mount
  }, []);

  const handleAddSection = async () => {
    try {
      // Convert postIds array to comma-separated string
      const postIdsString = newSection.postIds.join(',');
      const sectionData = { ...newSection, postIds: postIdsString };

      const docRef = await addDoc(collection(db, 'sections'), sectionData);
      console.log('Section added with ID:', docRef.id);
      setNewSection({ title: '', postIds: [] }); // Clear input

      // Refresh sections after adding a new section
      fetchSections();
    } catch (error) {
      console.error('Error adding section:', error);
      // Handle error adding section (e.g., show a message to the user)
    }
  };

  const handleDeleteSection = async (id) => {
    try {
      await deleteDoc(doc(db, 'sections', id));
      console.log('Section deleted successfully!');
      // Update local state after deletion
      setSections(prevSections => prevSections.filter(section => section.id !== id));
    } catch (error) {
      console.error('Error deleting section:', error);
      // Handle error deleting section (e.g., show a message to the user)
    }
  };

  const handleAddPostToSection = async (sectionId) => {
    try {
      const sectionRef = doc(db, 'sections', sectionId);

      // Get current postIds array from state
      const currentPostIds = newSection.postIds;

      // Concatenate new postIds to the existing array
      const updatedPostIds = currentPostIds.length > 0 ? [...currentPostIds, ...newSection.postIds] : newSection.postIds;

      // Update the section's postIds array
      await updateDoc(sectionRef, {
        postIds: updatedPostIds
      });

      console.log('Posts added to section:', sectionId);

      // Refresh sections after adding posts to a section
      fetchSections();
    } catch (error) {
      console.error('Error adding posts to section:', error);
      // Handle error adding posts to section (e.g., show a message to the user)
    }
  };

  const handleRemovePostFromSection = async (sectionId, postIdToRemove) => {
    try {
      const sectionRef = doc(db, 'sections', sectionId);

      // Get the current postIds array from Firestore
      const sectionSnapshot = await getDoc(sectionRef);
      let currentPostIds = sectionSnapshot.data().postIds || ''; // Default to empty string

      // Remove postIdToRemove from the postIds array
      currentPostIds = currentPostIds.split(',').filter(postId => postId !== postIdToRemove).join(',');

      // Update the section's postIds array
      await updateDoc(sectionRef, {
        postIds: currentPostIds
      });

      console.log('Post removed from section:', sectionId);

      // Refresh sections after removing post from a section
      fetchSections();
    } catch (error) {
      console.error('Error removing post from section:', error);
      // Handle error removing post from section (e.g., show a message to the user)
    }
  };

  const handlePostSelection = (postId) => {
    // Toggle selection of post in newSection state
    if (newSection.postIds.includes(postId)) {
      setNewSection(prevState => ({
        ...prevState,
        postIds: prevState.postIds.filter(id => id !== postId)
      }));
    } else {
      setNewSection(prevState => ({
        ...prevState,
        postIds: [...prevState.postIds, postId]
      }));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Page</h2>
        <div style={{ marginBottom: '20px', display: 'flex' }}>
          <input
            type="text"
            placeholder="Section Title"
            value={newSection.title}
            onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
            style={{ padding: '10px', fontSize: '16px', width: 'calc(100% - 80px)', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button onClick={handleAddSection} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Section</button>
        </div>

        <div style={{ display: 'flex' }}>
          {/* Sidebar component for posts */}
          <PostSidebar onSelectPost={handlePostSelection} />

          {/* Sections display */}
          <div style={{ flex: 1 }}>
            {sections.map(section => (
              <div key={section.id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                <h3 style={{ marginBottom: '10px' }}>{section.title}</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {section.posts.map(post => (
                    <li key={post.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '20px' }}><strong>Post ID:</strong> {post.id}</span>
                      <span style={{ marginRight: '20px' }}><strong>Post Name:</strong> {post.name}</span>
                      <button onClick={() => handleRemovePostFromSection(section.id, post.id)} style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                    </li>
                  ))}
                </ul>
                <div>
                  <button onClick={() => handleAddPostToSection(section.id)} style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>Add Selected Posts</button>
                  <button onClick={() => handleDeleteSection(section.id)} style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete Section</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHeadLine;
