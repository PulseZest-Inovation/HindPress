import React from 'react';

import Header from '../Component/Header/header';
import Footer from '../Component/footer/footer';


import CategoriesSection from '../Component/CategoriesSection/categoriesSection';
import HeroSection from '../Component/HeroSection/heroSection';
import SectionsAndPosts from '../Component/CategoriesSection/SectionPostDetails';

const Home = () => {

  return (
    <div>
      <Header />
      <HeroSection />
      <CategoriesSection />
      <SectionsAndPosts/>

      <Footer />
    </div>
  );
};

export default Home;
