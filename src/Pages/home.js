import React from 'react';

import Header from '../Component/Header/header';
import Footer from '../Component/footer/footer';


import CategoriesSection from '../Component/CategoriesSection/categoriesSection';
import HeroSection from '../Component/HeroSection/heroSection';
import SectionsAndPosts from '../Component/CategoriesSection/SectionPostDetails';
import ResponsiveAppBar from '../Component/CategoryHeader/catygoryHead';
import CounterBar from '../Component/Counter/counter';
import WhatsAppButton from '../Component/Whatsapp/Chat';

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

      <WhatsAppButton phoneNumber="9598919119" />
    </div>
  );
};

export default Home;
