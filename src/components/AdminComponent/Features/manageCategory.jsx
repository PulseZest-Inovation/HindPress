import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../utils/FireBase/firebaseConfig';
import { collection, addDoc, deleteDoc, doc, getDocs, where, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCategoryComponent = () => {
  const [categoryName, setCategoryName] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

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
        console.error('Error fetching categories:', error.message);
        toast.error('Failed to fetch categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      if (!categoryName || !file) {
        toast.error('Please enter category name and choose a file');
        return;
      }

      // Generate unique ID for the category
      const categoryId = `cat${(categories.length + 1).toString().padStart(2, '0')}`;

      // Upload file to Firebase Storage
      const fileRef = ref(storage, `categories/${uuidv4()}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      // Save category data to Firestore
      const createdAt = new Date().toISOString(); // Current timestamp
      await addDoc(collection(db, 'categories'), {
        id: categoryId,
        name: categoryName,
        fileUrl: fileUrl,
        createdAt: createdAt,
      });

      // Update state with the new category
      setCategories([...categories, { id: categoryId, name: categoryName, fileUrl: fileUrl, createdAt: createdAt }]);

      // Clear form fields
      setCategoryName('');
      setFile(null);

      // Success toast
      toast.success('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error.message);
      // Error toast
      toast.error('Failed to add category. Please try again later.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // Find the document ID in Firestore based on the categoryId
      const querySnapshot = await getDocs(query(collection(db, 'categories'), where('id', '==', categoryId)));
      querySnapshot.forEach(async (doc) => {
        const categoryData = doc.data();
        const fileUrl = categoryData.fileUrl;
  
        // Delete file from Storage if fileUrl exists
        if (fileUrl) {
          const fileRef = ref(storage, fileUrl);
          await deleteObject(fileRef);
        }
  
        // Delete document from Firestore using the found document ID
        await deleteDoc(doc.ref);
  
        // Update state to remove the deleted category
        setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
  
        // Success toast
        toast.success('Category deleted successfully!');
      });
    } catch (error) {
      console.error('Error deleting category:', error.message);
      // Error toast
      toast.error('Failed to delete category. Please try again later.');
    }
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }));

  const StyledImage = styled('img')({
    width: '20%',
    height: 'auto',
    borderRadius: '50%',
    objectFit: 'cover',
  });

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
  };

  const categorySectionStyle = {
    width: '100%',
    maxWidth: '800px',
    maxHeight: 'calc(100vh - 180px)',
    overflowY: 'auto',
    paddingRight: '10px',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Add New Category</h2>
        <input
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '100%' }}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory} style={{ marginTop: '10px', width: '100%' }}>
          Add Category
        </Button>
      </div>
      <div style={categorySectionStyle}>
        <h2>Saved Categories</h2>
        {categories.map(category => (
          <StyledPaper key={category.id}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <Typography variant="h6" component="div">
                  Category Name: {category.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Unique ID: {category.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created At: {new Date(category.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  View File:{' '}
                  <a href={category.fileUrl} target="_blank" rel="noopener noreferrer">
                    <StyledImage src={category.fileUrl} alt={category.name} />
                  </a>
                </Typography>
              </div>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteCategory(category.id, category.fileUrl)}>
                Delete
              </Button>
            </div>
          </StyledPaper>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageCategoryComponent;
