import React from 'react'
import Homesection1 from '../section/Homesection1'
import Homesection2 from '../section/Homesection2'
import Homesection3 from '../section/Homesection3'
import Homesection4 from '../section/Homesection4'
import OptionChatbot from '../components/OptionChatbot'

function Home() {
  return (
    <div className='bg-tertiary'>
      <Homesection1/>
      <Homesection2/>
      <Homesection3/>
      <Homesection4/>
      <OptionChatbot/>
    </div>
  )
}

export default Home
