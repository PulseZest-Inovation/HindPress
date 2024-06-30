import React from 'react';
import Header from '../Component/Header/header';
import Footer from '../Component/footer/footer';
import CategoriesSection from '../Component/CategoriesSection/categoriesSection';
import HeroSection from '../Component/HeroSection/heroSection';
import SectionPostDetails from '../Component/CategoriesSection/SectionPostDetails';
import ResponsiveAppBar from '../Component/CategoryHeader/catygoryHead';
import CounterBar from '../Component/Counter/counter';
import WhatsAppButton from '../Component/Whatsapp/Chat';
import QuiltedImageList from '../Component/Gallery/gallery';
import Blog from '../Component/Blog/blog';
const Home = () => {

  return (
    <div>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <ResponsiveAppBar/>
      <HeroSection />
      <CategoriesSection/>
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