import HeaderBox from '@/components/ui/HeaderBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firsName: 'Enrico'}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            subtext='Access & manage your account and transactions efficiently.'
            user={loggedIn?.firsName || 'Guest'} 
          />
        </header>
      </div> 
    </section>
  )
}

export default Home
