import React from 'react'
import CounterBar from '../Component/Counter/counter'
import HeroSection from '../Component/HeroSection/heroSection'
import New from '../Component/NewLaunches/new'
import Popular from '../Component/PopularProduct/popular'
import Print from '../Component/Printo/print'
import Sign from '../Component/SignsMarketing/sign'
import State from '../Component/Stationery/state'
export default function Home() {
  return (
    <div> 
      <HeroSection/>
      <CounterBar />
      <New />
      <Popular/>
      <Print />
      <Sign />
      <State />
    </div>
  )
}
