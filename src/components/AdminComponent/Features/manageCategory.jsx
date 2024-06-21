import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../utils/FireBase/firebaseConfig';
import { collection, addDoc, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!postName || !postDescription || !postActualPrice || !postSellingPrice || !postImage || selectedCategories.length === 0) {
      toast.error('Please fill all the fields and select at least one category.');
      return;
    }
  
    // Start uploading process
    setUploading(true);
    
    try {
      // Upload image to storage
      const storageRef = ref(storage, `posts/${postImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, postImage);
      
      // Wait for image upload to complete
      await uploadTask;
  
      // Get download URL for the uploaded image
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
      // Iterate through each selected category and save a separate document for each
      for (const categoryId of selectedCategories) {
        const newPost = {
          name: postName,
          description: postDescription,
          actualPrice: postActualPrice,
          sellingPrice: postSellingPrice,
          imageUrl: downloadURL,
          categoryId: categoryId, // Assign each post to a specific category
        };
  
        // Add new post to 'posts' collection in Firestore
        await addDoc(collection(db, 'posts'), newPost);
      }
  
      // Reset form fields and state variables
      setPostName('');
      setPostDescription('');
      setPostActualPrice('');
      setPostSellingPrice('');
      setPostImage(null);
      setSelectedCategories([]);
      setUploading(false);
  
      // Display success message
      toast.success('Post added successfully!');
    } catch (error) {
      console.error('Error adding post: ', error);
      toast.error('Error adding post. Please try again.');
      setUploading(false);
    }
  };
  
  

  return (
    <div className="container mx-auto px-4 py-8">
  <ToastContainer />
  <h1 className="text-3xl font-bold mb-4 text-center">Manage Posts</h1>
  
  <div className="flex">
    {/* Form for adding a new post */}
    <div className="w-1/2 p-4 border rounded-md shadow-md bg-gray-100 mr-4">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
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
    </div>

    {/* Category selector */}
    <div className="w-1/2 p-4 border rounded-md shadow-md bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Select Categories</h2>
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
</div>  
  );
};

export default ManageCategory;
