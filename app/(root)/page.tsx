import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Enrico', lastName: 'Riski', email: 'EnricoRiskiP@Gmail.com' }
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            subtext='Access & manage your account and transactions efficiently.'
            user={loggedIn?.firstName || 'Guest'} 
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1234.56}
          />
        </header> 
      </div> 
      <RightSidebar user={loggedIn} transactions={[]} banks={[]} />
    </section>
  )
}

export default Home
