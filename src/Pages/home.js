import React from 'react';

import Header from '../Component/Header/header';
import Footer from '../Component/footer/footer';


import CategoriesSection from '../Component/CategoriesSection/categoriesSection';
import HeroSection from '../Component/HeroSection/heroSection';
import SectionsAndPosts from '../Component/CategoriesSection/SectionPostDetails';
import ResponsiveAppBar from '../Component/CategoryHeader/catygoryHead';
import CounterBar from '../Component/Counter/counter';

const Home = () => {

  return (
    <div>
      <Header />
      <ResponsiveAppBar/>
      <HeroSection />
      <CategoriesSection />
      <SectionsAndPosts/>
      <CounterBar/>
      <Footer />
    </div>
  );
};

export default Home;
