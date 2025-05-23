import RecentTransactions from '@/components/RecentTransactions'
import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { withAuthPage } from '@/lib/utils'
import React from 'react'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  return withAuthPage(async (loggedIn) => {
    const currentPage = Number(page as string) || 1;
    const accounts = await getAccounts({
      userId: loggedIn.$id
    });

    if (!accounts) return;
    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    const account = await getAccount({ appwriteItemId });

    return (
      <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
            <HeaderBox
              type='greeting'
              title='Welcome,'
              subtext='Access & manage your account and transactions efficiently.'
              user={loggedIn?.firstName || 'Guest'}
            />

            <TotalBalanceBox
              accounts={accountsData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
            />
          </header>

          <RecentTransactions
            accounts={accountsData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage} />
        </div>
        <RightSidebar user={loggedIn} transactions={account?.transactions} banks={accountsData?.slice(0, 2)} />
      </section>
    )
  });

}

export default Home
