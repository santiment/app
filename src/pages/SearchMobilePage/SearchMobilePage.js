import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Svg from 'webkit/ui/Svg/react'
import { Icon } from '@santiment-network/ui'
import Tabs from '@santiment-network/ui/Tabs'
import { client } from '../../apollo'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import SearchBar from './SearchBar'
import { TABS } from '../../components/Search/tabs'
import {
  getItems,
  addItem,
  removeItem,
  ASSETS_KEY,
  TRENDS_KEY,
  INSIGHTS_KEY,
  getFromTo,
} from './utils'
import styles from './SearchMobilePage.module.scss'

const AlternativeLink = ({ link, onClick, children }) => {
  if (link.toLowerCase().startsWith('http')) {
    return (
      <a href={link} target='_blank' className={styles.link} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={link} className={styles.link} onClick={onClick}>
      {children}
    </Link>
  )
}

const SearchMobilePage = ({ history }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState('')
  const [result, setResult] = useState([])

  const tabActions = useMemo(() => {
    switch (selectedTab) {
      case TABS[0].index:
        return [
          TABS[0],
          () => getItems(ASSETS_KEY),
          (item) => addItem(ASSETS_KEY, item),
          (item) => removeItem(ASSETS_KEY, item),
          { minVolume: 0 },
        ]
      case TABS[1].index:
        const [from, to] = getFromTo()
        return [
          TABS[1],
          () => getItems(TRENDS_KEY),
          (item) => addItem(TRENDS_KEY, item),
          (item) => removeItem(TRENDS_KEY, item),
          { from, to },
        ]
      case TABS[2].index:
        return [
          TABS[2],
          () => getItems(INSIGHTS_KEY),
          (item) => addItem(INSIGHTS_KEY, item),
          (item) => removeItem(INSIGHTS_KEY, item),
          { searchTerm: term },
        ]
    }
  }, [selectedTab])

  const [activeTab, getTabItems, addTabItem, removeTabItem, variables] = tabActions

  function processResult(data) {
    let result = data[activeTab.responseKey]
    if (selectedTab === TABS[1].index) {
      result = result[0].topWords
    }
    let processedResult = []
    const normalizedTerm = term.toLowerCase()
    switch (selectedTab) {
      case TABS[0].index:
        processedResult = result.filter(
          ({ name, ticker }) =>
            name.toLowerCase().includes(normalizedTerm) ||
            ticker.toLowerCase().includes(normalizedTerm),
        )
        break
      case TABS[1].index:
        processedResult = result.filter(({ word }) => word.toLowerCase().includes(normalizedTerm))
        break
      case TABS[2].index:
        processedResult = result.filter(({ title }) => title.toLowerCase().includes(normalizedTerm))
        break
    }
    setResult(processedResult)
  }

  useEffect(() => {
    setItems(getTabItems())
  }, [selectedTab])

  useEffect(() => {
    if (loading) return
    if (!term) {
      setResult([])
      return
    }
    setLoading(true)
    client
      .query({
        query: activeTab.query,
        variables,
      })
      .then(({ data }) => {
        processResult(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [term, selectedTab])

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
          <SearchBar
            onChange={(term) => {
              setResult([])
              setTerm(term)
            }}
          />
        </MobileHeader>
      </div>
      <Tabs
        options={TABS}
        defaultSelectedIndex={selectedTab}
        onSelect={(tab) => selectTab(tab)}
        className={styles.tabs}
      />
      <div className={styles.recentWrapper}>
        {!loading && (
          <>
            {result.length < 1 && (
              <h3 className={cx(styles.caption, 'mrg--b mrg-xl')}>Recently searched</h3>
            )}
            <div className={styles.scrollable}>
              {result.length > 0 &&
                result.map((keys) => (
                  <div key={keys.id} className={cx(styles.recent, 'mrg--b mrg-xl')}>
                    <AlternativeLink
                      link={activeTab.getLinkURL(keys)}
                      onClick={() => addTabItem(keys)}
                    >
                      {selectedTab === TABS[0].index && (
                        <div className={cx(styles.iconholder, 'row hv-center')}>
                          <img
                            src={keys.logoUrl}
                            alt={keys.name}
                            title={keys.name}
                            className={styles.asset}
                          />
                        </div>
                      )}
                      {selectedTab !== TABS[0].index && (
                        <div
                          className={cx(styles.iconholder, 'row hv-center')}
                          style={{ fill: activeTab.fill, backgroundColor: activeTab.bgcolor }}
                        >
                          <Svg id={activeTab.icon} w={11} h={13} />
                        </div>
                      )}
                      <span className={cx(styles.name, 'body-2')}>
                        {activeTab.getLinkLabel(keys)}
                      </span>
                    </AlternativeLink>
                  </div>
                ))}
              {result.length < 1 &&
                items.map((keys, index) => (
                  <div key={index} className={cx(styles.recent, 'mrg--b mrg-xl')}>
                    <AlternativeLink link={activeTab.getLinkURL(keys)}>
                      {selectedTab === TABS[0].index && (
                        <div className={cx(styles.iconholder, 'row hv-center')}>
                          <img
                            src={keys.logoUrl}
                            alt={keys.name}
                            title={keys.name}
                            className={styles.asset}
                          />
                        </div>
                      )}
                      {selectedTab !== TABS[0].index && (
                        <div
                          className={cx(styles.iconholder, 'row hv-center')}
                          style={{ fill: activeTab.fill, backgroundColor: activeTab.bgcolor }}
                        >
                          <Svg id={activeTab.icon} w={11} h={13} />
                        </div>
                      )}
                      <span className={cx(styles.name, 'body-2')}>
                        {activeTab.getLinkLabel(keys)}
                      </span>
                    </AlternativeLink>
                    <Icon
                      type='close-medium'
                      className={cx(styles.icon, styles.delete)}
                      onClick={() => {
                        removeTabItem(keys)
                        setItems(getTabItems())
                      }}
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SearchMobilePage
