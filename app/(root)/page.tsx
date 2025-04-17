import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.action'
import React from 'react'

const Home = async() => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome,'
            subtext='Access & manage your account and transactions efficiently.'
            user={loggedIn?.name || 'Guest'} 
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1234.56}
          />
        </header> 
      </div> 
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance:1234}, {currentBalance:1234}]} />
    </section>
  )
}

export default Home
