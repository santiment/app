import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Tabs from '@santiment-network/ui/Tabs'
import Icon from '@santiment-network/ui/Icon'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import Search from '../../components/Search/SearchContainer'
import { TABS } from '../../components/Search/tabs'
import {
  getRecentAssets,
  getRecentTrends,
  removeRecentTrends,
  removeRecentAssets
} from '../../utils/recent'
import { safeDecode } from '../../utils/utils'
import styles from './SearchMobilePage.module.scss'

const SearchMobilePage = ({ history }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const onSelectTab = selected => selectTab(selected)
  const [assets, setAssets] = useState(getRecentAssets().filter(Boolean))
  const [trends, setTrends] = useState(getRecentTrends().filter(Boolean))

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
          <Search
            isMobile
            className={styles.search}
            selectedTab={selectedTab}
            autocomplete='off'
            inputProps={{ autoFocus: true }}
          />
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
          assets.map(slug => (
            <div key={slug} className={styles.recent}>
              <Link to={`/projects/${slug}`} className={styles.link}>
                <Icon type='clock' className={styles.icon} />
                <span className={styles.name}>{slug}</span>
              </Link>
              <Icon
                type='close-medium'
                className={cx(styles.icon, styles.delete)}
                onClick={() => {
                  removeRecentAssets(slug)
                  const filteredAssets = assets.filter(asset => asset !== slug)
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
                <span className={styles.name}>{safeDecode(word)}</span>
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
