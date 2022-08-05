import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Svg from 'webkit/ui/Svg/react'
import { Icon } from '@santiment-network/ui'
import Tabs from '@santiment-network/ui/Tabs'
import { client } from '../../apollo'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import SearchBar from './SearchBar'
import { TABS } from '../../components/Search/tabs'
import { useTabOptions } from './utils'
import styles from './SearchMobilePage.module.scss'
import PageLoader from '../../components/Loader/PageLoader'

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

const SearchResultRow = ({ keys, selectedTab, activeTab, onClick, onClose }) => (
  <div className={cx(styles.recent, 'mrg--b mrg-xl')} onClick={onClick}>
    <AlternativeLink link={activeTab.getLinkURL(keys)}>
      {selectedTab === TABS[0].index && (
        <div className={cx(styles.iconholder, 'row hv-center')}>
          <img src={keys.logoUrl} alt={keys.name} title={keys.name} className={styles.asset} />
        </div>
      )}
      {selectedTab !== TABS[0].index && (
        <div className={cx(styles.iconholder, styles[activeTab.styleKey], 'row hv-center')}>
          <Svg id={activeTab.icon} w={11} h={13} />
        </div>
      )}
      <span className={cx(styles.name, 'body-2')}>{activeTab.getLinkLabel(keys)}</span>
    </AlternativeLink>
    {onClose && (
      <Icon type='close-medium' className={cx(styles.icon, styles.delete)} onClick={onClose} />
    )}
  </div>
)

const SearchMobilePage = ({ history }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState('')
  const [result, setResult] = useState([])

  const tabActions = useTabOptions(selectedTab, term)

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
        {loading ? (
          <PageLoader className={styles.loader} />
        ) : (
          <>
            {result.length < 1 && (
              <h3 className={cx(styles.caption, 'mrg--b mrg-xl')}>Recently searched</h3>
            )}
            <div className={styles.scrollable}>
              {result.length > 0
                ? result.map((keys) => (
                    <SearchResultRow
                      key={keys.id}
                      activeTab={activeTab}
                      keys={keys}
                      selectedTab={selectedTab}
                      onClick={() => addTabItem(keys)}
                    />
                  ))
                : items.map((keys, index) => (
                    <SearchResultRow
                      key={index}
                      activeTab={activeTab}
                      keys={keys}
                      selectedTab={selectedTab}
                      onClose={() => {
                        removeTabItem(index)
                        setItems(getTabItems())
                      }}
                    />
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SearchMobilePage
