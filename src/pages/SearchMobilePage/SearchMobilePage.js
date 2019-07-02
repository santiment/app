import React, { useState } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import Search from './../../components/Search/SearchContainer'
import styles from './SearchMobilePage.module.scss'

const TABS = [
  {
    index: 'Assets',
    content: 'Assets'
  },
  {
    index: 'Trends',
    content: 'Trends'
  }
]

const SearchMobilePage = ({ history }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const onSelectTab = selected => selectTab(selected)

  return (
    <>
      <div>
        <MobileHeader
          goBack={history.goBack}
          backRoute={'/'}
          classes={{
            wrapper: styles.wrapper,
            right: styles.hidden,
            title: styles.hidden
          }}
          title='Search'
        >
          <Search className={styles.search} />
        </MobileHeader>
      </div>
      <Tabs
        options={TABS}
        defaultSelectedIndex={selectedTab}
        onSelect={onSelectTab}
        className={styles.tabs}
      />
    </>
  )
}

export default SearchMobilePage
