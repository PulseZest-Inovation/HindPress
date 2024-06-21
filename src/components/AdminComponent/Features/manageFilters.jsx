import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/FireBase/firebaseConfig';
import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageFilters = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [newFilterName, setNewFilterName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        if (selectedCategory) {
          const querySnapshot = await getDocs(collection(db, 'filterCollections', selectedCategory.id, 'filters'));
          const filtersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFilters(filtersData);
        } else {
          setFilters([]);
        }
      } catch (error) {
        console.error("Error fetching filters: ", error);
      }
    };

    fetchFilters();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const q = collection(db, 'posts');
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    const selectedCategory = categories.find(category => category.id === categoryId);
    setSelectedCategory(selectedCategory);
    setSelectedFilter('');
    setSelectedPosts([]);
    setPosts([]);

    if (selectedCategory) {
      await fetchPosts();
    }
  };

  const handleFilterChange = async (filterId) => {
    setSelectedFilter(filterId);

    try {
      const filterDocRef = doc(db, 'filterCollections', selectedCategory.id, 'filters', filterId);
      const filterDoc = await getDoc(filterDocRef);
      if (filterDoc.exists()) {
        setSelectedPosts(filterDoc.data().postIds || []);
      } else {
        setSelectedPosts([]);
      }
    } catch (error) {
      console.error("Error fetching filter details: ", error);
    }
  };

  const handlePostToggle = (postId) => {
    const updatedSelectedPosts = selectedPosts.includes(postId)
      ? selectedPosts.filter(id => id !== postId)
      : [...selectedPosts, postId];

    setSelectedPosts(updatedSelectedPosts);
  };

  const handleSaveFilter = async () => {
    try {
      const filterRef = doc(db, 'filterCollections', selectedCategory.id, 'filters', selectedFilter);
      await updateDoc(filterRef, { postIds: selectedPosts });
      toast.success('Filter saved successfully!');
    } catch (error) {
      console.error("Error saving filter: ", error);
      toast.error('Error saving filter. Please try again.');
    }
  };

  const handleAddFilter = async () => {
    try {
      if (!selectedCategory) {
        console.error("No category selected.");
        return;
      }

      const newFilterRef = await addDoc(collection(db, 'filterCollections', selectedCategory.id, 'filters'), {
        name: newFilterName,
        postIds: []
      });
      toast.success('New filter added successfully!');
      setNewFilterName('');
    } catch (error) {
      console.error("Error adding new filter: ", error);
      toast.error('Error adding new filter. Please try again.');
    }
  };

  const handleDeleteFilter = async (filterId) => {
    try {
      const filterRef = doc(db, 'filterCollections', selectedCategory.id, 'filters', filterId);
      await deleteDoc(filterRef);
      toast.success('Filter deleted successfully!');
    } catch (error) {
      console.error("Error deleting filter: ", error);
      toast.error('Error deleting filter. Please try again.');
    }
  };

  const handleRemovePostFromFilter = async (postId) => {
    try {
      const filterRef = doc(db, 'filterCollections', selectedCategory.id, 'filters', selectedFilter);
      await updateDoc(filterRef, {
        postIds: selectedPosts.filter(id => id !== postId)
      });
      toast.success('Post removed from filter successfully!');
    } catch (error) {
      console.error("Error removing post from filter: ", error);
      toast.error('Error removing post from filter. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center">Manage Filters</h1>

      <div className="mb-4">
        <select
          value={selectedCategory ? selectedCategory.id : ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter new filter name"
            value={newFilterName}
            onChange={(e) => setNewFilterName(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleAddFilter}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all duration-300"
          >
            Add Filter
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filters.map(filter => (
          <div
            key={filter.id}
            className={`p-4 border rounded-md shadow-md cursor-pointer transition-all duration-300 ${selectedFilter === filter.id ? 'bg-blue-100' : ''}`}
            onClick={() => handleFilterChange(filter.id)}
          >
            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">{filter.name}</h2>
            <div className="mt-2">
              {selectedFilter === filter.id && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Select Posts:</h3>
                  {posts.map(post => (
                    <div key={post.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={post.id}
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handlePostToggle(post.id)}
                        className="mr-2"
                      />
                      <label htmlFor={post.id}>{post.name}</label>
                      <button
                        onClick={() => handleRemovePostFromFilter(post.id)}
                        className="ml-2 p-1 bg-red-600 text-white rounded-md hover:bg-red-800 transition-all duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleSaveFilter}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 mt-4 transition-all duration-300"
                  >
                    Save Filter
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => handleDeleteFilter(filter.id)}
              className="mt-2 p-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-all duration-300"
            >
              Delete Filter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFilters;
