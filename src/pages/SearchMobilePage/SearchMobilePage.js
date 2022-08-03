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
import styles from './SearchMobilePage.module.scss'

const SearchMobilePage = ({ history }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const onSelectTab = selectTab
  const [assets, setAssets] = useState(getRecentAssets().filter(Boolean))
  const [trends, setTrends] = useState(getRecentTrends().filter(Boolean))
  const [insights, setInsights] = useState(getRecentInsights().filter(Boolean))

  const tabActions = useMemo(() => {
    switch(selectedTab) {
      case TABS[0].index:
        return [TABS[0], assets, setAssets, removeRecentAssets]
      case TABS[1].index:
        return [TABS[1], trends, setTrends, removeRecentTrends]
      case TABS[2].index:
        return [TABS[2], insights, setInsights, remvoveRecentInsights]
    }
  }, [selectedTab, assets, trends, insights])

  const [TAB, items, setItems, removeItem] = tabActions

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
        {items.map((slug) => (
          <div key={slug} className={styles.recent}>
            <Link to={TAB.getLinkURL(slug)} className={styles.link}>
              <Icon type='clock' className={styles.icon} />
              <span className={styles.name}>{TAB.getLinkLabel(slug)}</span>
            </Link>
            <Icon
              type='close-medium'
              className={cx(styles.icon, styles.delete)}
              onClick={() => {
                removeItem(slug)
                const filteredAssets = items.filter((asset) => asset !== slug)
                setItems(filteredAssets)
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchMobilePage
