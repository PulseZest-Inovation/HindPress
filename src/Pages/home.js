import React from 'react'
import CounterBar from '../Component/Counter/counter'
import Gallery from '../Component/Gallery/gallery'
import HeroSection from '../Component/HeroSection/heroSection'
import New from '../Component/NewLaunches/new'
import Pack from '../Component/Packaging/print'
import Popular from '../Component/PopularProduct/popular'
import Sign from '../Component/SignsMarketing/sign'
import State from '../Component/Stationery/state'
export default function Home() {
  return (
    <div> 
      <HeroSection/>
      <CounterBar />
      <New />
      <Popular/>
      <Gallery />
      <Pack />
      <Sign />
      <State />
    </div>
  )
}
