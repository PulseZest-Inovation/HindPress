import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { db } from '../../../utils/FireBase/firebaseConfig';
import { collection, addDoc, getDocs, getDoc,deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import PostSidebar from './PostSidebar'; // Adjust path as per your file structure

const AddHeadLine = () => {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: '', postIds: [] });
  const [loading, setLoading] = useState(false);
  const [addingSection, setAddingSection] = useState(false);
  const [deletingSection, setDeletingSection] = useState(null); // ID of the section being deleted
  const [addingPost, setAddingPost] = useState(null); // ID of the section to which posts are being added
  const [removingPost, setRemovingPost] = useState(null); // ID of the post being removed

  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'sections'));
      const sectionsData = querySnapshot.docs.map(docRef => ({
        id: docRef.id,
        ...docRef.data(),
        posts: []
      }));

      const postIds = sectionsData.flatMap(section => section.postIds.split(','));
      if (postIds.length > 0) {
        const postsQuery = query(collection(db, 'posts'), where('__name__', 'in', postIds));
        const postsSnapshot = await getDocs(postsQuery);

        const postsMap = postsSnapshot.docs.reduce((map, docRef) => {
          map[docRef.id] = { id: docRef.id, ...docRef.data() };
          return map;
        }, {});

        sectionsData.forEach(section => {
          section.posts = section.postIds.split(',').map(postId => postsMap[postId]).filter(Boolean);
        });
      }

      setSections(sectionsData);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleAddSection = async () => {
    setAddingSection(true);
    try {
      const postIdsString = newSection.postIds.join(',');
      const sectionData = { ...newSection, postIds: postIdsString };

      const docRef = await addDoc(collection(db, 'sections'), sectionData);
      console.log('Section added with ID:', docRef.id);
      setNewSection({ title: '', postIds: [] });

      fetchSections();
    } catch (error) {
      console.error('Error adding section:', error);
    } finally {
      setAddingSection(false);
    }
  };

  const handleDeleteSection = async (id) => {
    setDeletingSection(id);
    try {
      await deleteDoc(doc(db, 'sections', id));
      console.log('Section deleted successfully!');
      setSections(prevSections => prevSections.filter(section => section.id !== id));
    } catch (error) {
      console.error('Error deleting section:', error);
    } finally {
      setDeletingSection(null);
    }
  };

  const handleAddPostToSection = async (sectionId) => {
    setAddingPost(sectionId);
    try {
      const sectionRef = doc(db, 'sections', sectionId);
      const sectionSnapshot = await getDoc(sectionRef);
      const currentPostIds = sectionSnapshot.data().postIds || '';

      // Add new post IDs to the existing comma-separated string
      const updatedPostIds = currentPostIds
        ? `${currentPostIds},${newSection.postIds.join(',')}`
        : newSection.postIds.join(',');

      await updateDoc(sectionRef, {
        postIds: updatedPostIds
      });

      console.log('Posts added to section:', sectionId);

      fetchSections();
    } catch (error) {
      console.error('Error adding posts to section:', error);
    } finally {
      setAddingPost(null);
    }
  };

  const handleRemovePostFromSection = async (sectionId, postIdToRemove) => {
    setRemovingPost(postIdToRemove);
    try {
      const sectionRef = doc(db, 'sections', sectionId);
      const sectionSnapshot = await getDoc(sectionRef);
      let currentPostIds = sectionSnapshot.data().postIds || '';

      currentPostIds = currentPostIds.split(',').filter(postId => postId !== postIdToRemove).join(',');

      await updateDoc(sectionRef, {
        postIds: currentPostIds
      });

      console.log('Post removed from section:', sectionId);

      fetchSections();
    } catch (error) {
      console.error('Error removing post from section:', error);
    } finally {
      setRemovingPost(null);
    }
  };

  const handlePostSelection = useCallback((postId) => {
    setNewSection(prevState => ({
      ...prevState,
      postIds: prevState.postIds.includes(postId)
        ? prevState.postIds.filter(id => id !== postId)
        : [...prevState.postIds, postId]
    }));
  }, []);

  const memoizedSections = useMemo(() => sections, [sections]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2xl', fontWeight: 'bold' }}>Add HeadLine</h1>

        <div style={{ marginBottom: '20px', display: 'flex' }}>
          <input
            type="text"
            placeholder="Section Title"
            value={newSection.title}
            onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
            style={{ padding: '10px', fontSize: '16px', width: 'calc(100% - 80px)', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button onClick={handleAddSection} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={addingSection}>
            {addingSection ? 'Adding...' : 'Add Section'}
          </button>
        </div>

        {loading ? (
          <p>Loading sections...</p>
        ) : (
          <div style={{ display: 'flex' }}>
            <PostSidebar onSelectPost={handlePostSelection} />

            <div style={{ flex: 1 }}>
              {memoizedSections.map(section => (
                <div key={section.id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                  <h3 style={{ marginBottom: '10px' }}>{section.title}</h3>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {section.posts.map(post => (
                      <li key={post.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '20px' }}><strong>Post ID:</strong> {post.id}</span>
                        <span style={{ marginRight: '20px' }}><strong>Post Name:</strong> {post.name}</span>
                        <button onClick={() => handleRemovePostFromSection(section.id, post.id)} style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={removingPost === post.id}>
                          {removingPost === post.id ? 'Removing...' : 'Remove'}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <button onClick={() => handleAddPostToSection(section.id)} style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }} disabled={addingPost === section.id}>
                      {addingPost === section.id ? 'Adding Posts...' : 'Add Selected Posts'}
                    </button>
                    <button onClick={() => handleDeleteSection(section.id)} style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={deletingSection === section.id}>
                      {deletingSection === section.id ? 'Deleting...' : 'Delete Section'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddHeadLine;
