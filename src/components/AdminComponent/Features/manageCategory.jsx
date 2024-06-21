import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../utils/FireBase/firebaseConfig';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postName, setPostName] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postActualPrice, setPostActualPrice] = useState('');
  const [postSellingPrice, setPostSellingPrice] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    if (selectedCategory) {
      const fetchPosts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'posts'));
          const postsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })).filter(post => post.categoryId === selectedCategory.id);
          setPosts(postsData);
        } catch (error) {
          console.error("Error fetching posts: ", error);
        }
      };

      fetchPosts();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(category);
  };

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!postName || !postDescription || !postActualPrice || !postSellingPrice || !postImage || selectedCategories.length === 0) {
      toast.error('Please fill all the fields and select at least one category.');
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `posts/${postImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, postImage);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // You can add progress indication here if needed
      }, 
      (error) => {
        console.error('Upload error: ', error);
        toast.error('Upload failed. Please try again.');
        setUploading(false);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const newPostRef = doc(collection(db, 'posts')); // Create a new document reference
            await setDoc(newPostRef, {
              name: postName,
              description: postDescription,
              actualPrice: postActualPrice,
              sellingPrice: postSellingPrice,
              imageUrl: downloadURL,
              categoryIds: selectedCategories // Store multiple category IDs
            });
            setPostName('');
            setPostDescription('');
            setPostActualPrice('');
            setPostSellingPrice('');
            setPostImage(null);
            setSelectedCategories([]);
            setUploading(false);
            toast.success('Post added successfully!');
            setPosts([...posts, {
              id: newPostRef.id,
              name: postName,
              description: postDescription,
              actualPrice: postActualPrice,
              sellingPrice: postSellingPrice,
              imageUrl: downloadURL,
              categoryIds: selectedCategories
            }]);
          } catch (error) {
            console.error('Error adding post: ', error);
            toast.error('Error adding post. Please try again.');
            setUploading(false);
          }
        });
      }
    );
  };

  const handleDeletePost = async (postId, imageUrl) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      setPosts(posts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post: ', error);
      toast.error('Error deleting post. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center">Manage Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="p-4 border rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all duration-300"
            onClick={() => handleCategoryClick(category.id)}
          >
            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">{category.name}</h2>
            <p className="mt-2 text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="p-8 border rounded-md shadow-md bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Add Post to {selectedCategory.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form onSubmit={handleAddPost} className="grid grid-cols-1 gap-4">
              <input 
                type="text" 
                placeholder="Post Name" 
                value={postName} 
                onChange={(e) => setPostName(e.target.value)}
                className="p-2 border rounded-md"
              />
              <textarea 
                placeholder="Post Description" 
                value={postDescription} 
                onChange={(e) => setPostDescription(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input 
                type="number" 
                placeholder="Actual Price" 
                value={postActualPrice} 
                onChange={(e) => setPostActualPrice(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input 
                type="number" 
                placeholder="Selling Price" 
                value={postSellingPrice} 
                onChange={(e) => setPostSellingPrice(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input 
                type="file" 
                onChange={(e) => setPostImage(e.target.files[0])}
                className="p-2 border rounded-md"
              />
              <button 
                type="submit" 
                className={`p-2 bg-blue-600 text-white rounded-md ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800 transition-all duration-300'}`}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Add Post'}
              </button>
            </form>
            <div className="p-4 border rounded-md shadow-md bg-white">
              <h2 className="text-xl font-bold mb-2">Select Categories</h2>
              {categories.map(category => (
                <div key={category.id} className="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    id={category.id} 
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={category.id} className="text-gray-800">{category.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedCategory && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Posts in {selectedCategory.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map(post => (
              <div key={post.id} className="p-4 border rounded-md shadow-md">
                <img src={post.imageUrl} alt={post.name} className="w-full h-48 object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-2">{post.name}</h3>
                <p className="mt-1 text-gray-600">{post.description}</p>
                <p className="mt-1 text-gray-800 font-bold line-through">${post.actualPrice}</p>
                <p className="mt-1 text-gray-800 font-bold">${post.sellingPrice}</p>
                <button 
                  onClick={() => handleDeletePost(post.id, post.imageUrl)} 
                  className="mt-4 p-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-all duration-300"
                >
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
