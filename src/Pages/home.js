import React from 'react';
import Blog from '../Component/Blog/blog';
import SectionPostDetails from '../Component/CategoriesSection/SectionPostDetails';
import ResponsiveAppBar from '../Component/CategoryHeader/catygoryHead';
import CounterBar from '../Component/Counter/counter';
import QuiltedImageList from '../Component/Gallery/gallery';
import Header from '../Component/Header/header';
import HeroSection from '../Component/HeroSection/heroSection';
import Poster1 from '../Component/Poster/poster1';
import WhatsAppButton from '../Component/Whatsapp/Chat';
import Footer from '../Component/footer/footer';

const Home = () => {

  return (
    <div>
      <Header />
      <ResponsiveAppBar/>
      <HeroSection />
      <Poster1 />
      <SectionPostDetails/>
      <QuiltedImageList/>
      <CounterBar/>
      <Blog/>
      <Footer />
      <WhatsAppButton phoneNumber="9598919119" />
    </div>
  );
};

export default Home;