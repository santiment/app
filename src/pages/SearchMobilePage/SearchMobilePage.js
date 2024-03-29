import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import Svg from 'webkit/ui/Svg/react'
import { Icon } from '@santiment-network/ui'
import Tabs from '@santiment-network/ui/Tabs'
import { client } from '../../apollo'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import PageLoader from '../../components/Loader/PageLoader'
import SearchBar from './SearchBar'
import NotFound from './NotFound'
import { TABS } from '../../components/Search/tabs'
import { useTabOptions, getItemControllers } from './utils'
import styles from './SearchMobilePage.module.scss'

const Link = ({ link, onClick, children }) => {
  if (link.toLowerCase().startsWith('http')) {
    return (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  return (
    <RouterLink to={link} className={styles.link} onClick={onClick}>
      {children}
    </RouterLink>
  )
}

const SearchResultRow = ({ keys, selectedTab, activeTab, onClick, onClose }) => (
  <div className={cx(styles.recent, 'mrg--b mrg-xl')} onClick={onClick}>
    <Link link={activeTab.getLinkURL(keys)}>
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
    </Link>
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
  const [result, setResult] = useState()
  const tabActions = useTabOptions(selectedTab, term)
  const [activeTab, KEY, variables] = tabActions
  const { getTabItems, addTabItem, removeTabItem } = getItemControllers(KEY)

  function processResult(data) {
    let result = data[activeTab.responseKey]
    if (selectedTab === TABS[1].index) {
      result = result.length > 0 ? result[0].topWords : []
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
      default:
        throw new Error('Invalid selectedTab')
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
      <MobileHeader
        goBack={history.goBack}
        backRoute='/'
        classes={{
          wrapper: cx(styles.wrapper, 'row v-center'),
          right: styles.hidden,
          title: styles.hidden,
        }}
      >
        <SearchBar onChange={setTerm} />
      </MobileHeader>
      <Tabs
        options={TABS}
        defaultSelectedIndex={selectedTab}
        onSelect={(tab) => selectTab(tab)}
        className={cx(styles.tabs, 'row justify')}
        classes={{
          tab: styles.tab,
        }}
      />
      <div className={styles.recentWrapper}>
        {loading ? (
          <PageLoader className={styles.loader} />
        ) : (
          <>
            {!term && items.length > 0 && (
              <h3 className={cx(styles.caption, 'mrg--b mrg-xl')}>Recently searched</h3>
            )}
            <div className={styles.scrollable}>
              {term && term.length > 0 && result ? (
                <>
                  {result.length > 0 &&
                    result.map((keys) => (
                      <SearchResultRow
                        key={keys.id}
                        activeTab={activeTab}
                        keys={keys}
                        selectedTab={selectedTab}
                        onClick={() => addTabItem(keys)}
                      />
                    ))}
                  {result.length === 0 && <NotFound />}
                </>
              ) : (
                items.map((keys, index) => (
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
                ))
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SearchMobilePage
