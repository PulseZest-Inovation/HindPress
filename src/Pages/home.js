import React from 'react'
import Header from '../Component/Header/header';
import Footer from '../Component/footer/footer';
import CounterBar from '../Component/Counter/counter'
import HeroSection from '../Component/HeroSection/heroSection'
import New from '../Component/NewLaunches/new'
import Popular from '../Component/PopularProduct/popular'
import Print from '../Component/Printo/print'
import Sign from '../Component/SignsMarketing/sign'
import State from '../Component/Stationery/state'
import ResponsiveAppBar from '../Component/CategoryHeader/catygoryHead'
export default function Home() {
  return (
    <div> 
    <Header/>
    <ResponsiveAppBar/>
      <HeroSection/>
      <New />
      <Popular/>
      <Print />
      <Sign />
      <State />
      <CounterBar/>
      <Footer />
    </div>
  )
}
