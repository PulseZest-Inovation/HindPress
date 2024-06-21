import React, { useEffect, useState } from 'react';
import { db } from '../../';  // Adjust the path as necessary
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await db.collection('categories').get();
      const categoriesData = snapshot.docs.map(doc => doc.data());
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-section py-8">
      <h2 className="text-center text-3xl mb-8">Categories</h2>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="w-80">
            <CardMedia
              component="img"
              height="140"
              image={category.image} // Assumes each category has an 'image' field
              alt={category.name} // Assumes each category has a 'name' field
            />
            <CardContent>
              <h3 className="text-xl">{category.name}</h3>
              <p>{category.description}</p> {/* Assumes each category has a 'description' field */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
