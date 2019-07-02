import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Tabs from '@santiment-network/ui/Tabs'
import Icon from '@santiment-network/ui/Icon'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import Search from './../../components/Search/SearchContainer'
import {
  getRecentAssets,
  getRecentTrends,
  removeRecentTrends,
  removeRecentAssets
} from '../../utils/recent'
import allProjects from '../../allProjects.json'
import styles from './SearchMobilePage.module.scss'

export const TABS = [
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
  const assetsRecent = getRecentAssets()
  const assetsWithInfo = assetsRecent.map(asset => ({
    ...allProjects.find(({ slug }) => slug === asset)
  }))
  const [assets, setAssets] = useState(assetsWithInfo)
  const [trends, setTrends] = useState(getRecentTrends())

  console.log(trends, assets, selectedTab)

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
          <Search className={styles.search} selectedTab={selectedTab} />
        </MobileHeader>
      </div>
      <Tabs
        options={TABS}
        defaultSelectedIndex={selectedTab}
        onSelect={onSelectTab}
        className={styles.tabs}
      />
      <div className={styles.recentWrapper}>
        <h3 className={styles.caption}>Recently searched</h3>
        {selectedTab === TABS[0].index &&
          assets.map(({ name, ticker, coinmarketcapId }) => (
            <div key={name} className={styles.recent}>
              <Link to={`/projects/${coinmarketcapId}`} className={styles.link}>
                <Icon type='clock' className={styles.icon} />
                <span className={styles.name}>{name}</span>
                <span className={styles.ticker}>({ticker})</span>
              </Link>
              <Icon
                type='close-medium'
                className={cx(styles.icon, styles.delete)}
                onClick={() => {
                  removeRecentAssets(coinmarketcapId)
                  const filteredAssets = assets.filter(
                    asset => asset.coinmarketcapId !== coinmarketcapId
                  )
                  setAssets(filteredAssets)
                }}
              />
            </div>
          ))}
        {selectedTab === TABS[1].index &&
          trends.map(word => (
            <div key={word} className={styles.recent}>
              <Link to={`/labs/trends/explore/${word}`} className={styles.link}>
                <Icon type='clock' className={styles.icon} />
                <span className={styles.name}>{word}</span>
              </Link>
              <Icon
                type='close-medium'
                className={cx(styles.icon, styles.delete)}
                onClick={() => {
                  removeRecentTrends(word)
                  const filteredTrends = trends.filter(trend => word !== trend)
                  setTrends(filteredTrends)
                }}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default SearchMobilePage
