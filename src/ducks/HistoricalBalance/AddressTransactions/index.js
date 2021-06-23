import React, { useState } from 'react'
import Section from '../Section'
import { TabType } from '../defaults'
import Tab from '../../../components/Tab'
import TopTransactions from './TopTransactions'
import RecentTransactions from './RecentTransactions'

const Tabs = ({ tabState }) => (
  <>
    <Tab tab={TabType.LATEST_TRANSACTIONS} tabState={tabState} />
    <Tab tab={TabType.TOP_TRANSACTIONS} tabState={tabState} />
  </>
)

const AddressTransactions = ({ settings, walletAssets }) => {
  const tabState = useState(TabType.LATEST_TRANSACTIONS)
  const activeTab = tabState[0]

  return (
    <Section title={<Tabs tabState={tabState} />}>
      {activeTab === TabType.LATEST_TRANSACTIONS && (
        <RecentTransactions settings={settings} />
      )}
      {activeTab === TabType.TOP_TRANSACTIONS && (
        <TopTransactions settings={settings} walletAssets={walletAssets} />
      )}
    </Section>
  )
}

export default AddressTransactions
