import React, { useMemo, useState } from 'react'
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
  getRecentInsights,
  removeRecentTrends,
  removeRecentAssets,
  remvoveRecentInsights,
} from '../../utils/recent'
import { safeDecode } from '../../utils/utils'
import styles from './SearchMobilePage.module.scss'

const SearchMobilePage = ({ history }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const onSelectTab = selectTab
  const [assets, setAssets] = useState(getRecentAssets().filter(Boolean))
  const [trends, setTrends] = useState(getRecentTrends().filter(Boolean))
  const [insights, setInsights] = useState(getRecentInsights().filter(Boolean))

  const tabRecentValues = useMemo(() => {
    switch(selectedTab) {
      case TABS[0].index:
        return assets
      case TABS[1].index:
        return trends
      case TABS[2].index:
        return insights
    }
  }, [selectedTab, assets, trends, insights])

  return (
    <>
      <div>
        <MobileHeader
          goBack={history.goBack}
          backRoute={'/'}
          classes={{
            wrapper: styles.wrapper,
            right: styles.hidden,
            title: styles.hidden,
          }}
          title='Search'
        >
          <Search
            isMobile
            className={styles.search}
            selectedTab={selectedTab}
            autocomplete='off'
            inputProps={{ autoFocus: true, placeholder: "Search for assets, trends..." }}
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
        {/* {tabRecentValues.map(() => (
          <div key={slug} className={styles.recent}>
            <Link to={selectedTab.getLinkURL(slug)} className={styles.link}>
              <Icon type='clock' className={styles.icon} />
              <span className={styles.name}>{selectedTab.getLinkLabel(slug)}</span>
            </Link>
            <Icon
              type='close-medium'
              className={cx(styles.icon, styles.delete)}
              onClick={() => {
                removeRecentAssets(slug)
                const filteredAssets = assets.filter((asset) => asset !== slug)
                setAssets(filteredAssets)
              }}
            />
          </div>
        ))} */}
        {selectedTab === TABS[0].index &&
          assets.map((slug) => (
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
                  const filteredAssets = assets.filter((asset) => asset !== slug)
                  setAssets(filteredAssets)
                }}
              />
            </div>
          ))}
        {selectedTab === TABS[1].index &&
          trends.map((word) => (
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
                  const filteredTrends = trends.filter((trend) => word !== trend)
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
