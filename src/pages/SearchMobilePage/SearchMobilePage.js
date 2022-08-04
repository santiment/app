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
import { getItems, addItem, removeItem, ASSETS_KEY, TRENDS_KEY, INSIGHTS_KEY } from './cacheResult'
import styles from './SearchMobilePage.module.scss'

const LinkHOC = ({ link, onClick, children }) => {
  if (link.toLowerCase().startsWith("http")) {
    return <a href={link} target="_blank" className={styles.link} onClick={onClick}>{children}</a>
  }
  return <Link to={link} className={styles.link} onClick={onClick}>{children}</Link>
}

const SearchMobilePage = ({ history, ...props }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState('')
  const [result, setResult] = useState([])

  const getFromTo = () => {
    const from = new Date()
    const to = new Date()
    to.setHours(to.getHours(), 0, 0, 0)
    from.setHours(from.getHours() - 1, 0, 0, 0)
    return [from, to]
  }

  const tabActions = useMemo(() => {
    switch (selectedTab) {
      case TABS[0].index:
        return [
          TABS[0],
          () => getItems(ASSETS_KEY),
          (item) => addItem(ASSETS_KEY, item),
          (item) => removeItem(ASSETS_KEY, item),
          { minVolume: 0 }
        ]
      case TABS[1].index:
        const [from, to] = getFromTo()
        return [
          TABS[1],
          () => getItems(TRENDS_KEY),
          (item) => addItem(TRENDS_KEY, item),
          (item) => removeItem(TRENDS_KEY, item),
          { from, to }
        ]
      case TABS[2].index:
        return [
          TABS[2],
          () => getItems(INSIGHTS_KEY),
          (item) => addItem(INSIGHTS_KEY, item),
          (item) => removeItem(INSIGHTS_KEY, item),
          { searchTerm: term }
        ]
    }
  }, [selectedTab, result])

  const [TAB, getTabItems, addTabItem, removeTabItem, variables] = tabActions

  function processResult(data) {
    let result = data[TAB.responseKey]
    if (selectedTab === TABS[1].index) {
      result = result[0].topWords
    }
    let processedResult = []
    const normalizedTerm = term.toLowerCase()
    switch (selectedTab) {
      case TABS[0].index:
        processedResult = result.filter(({ name, ticker }) => name.toLowerCase().includes(normalizedTerm) || ticker.toLowerCase().includes(normalizedTerm))
        break
      case TABS[1].index:
        processedResult = result.filter(({ word }) => word.toLowerCase().includes(normalizedTerm))
        break
      case TABS[2].index:
        processedResult = result.filter(({ title }) => title.toLowerCase().includes(normalizedTerm))
        break;
    }
    setResult(processedResult)
  }

  useEffect(() => {
    setItems(getTabItems())
  }, [selectedTab])

  useEffect(() => {
    if (loading) return
    if (!term || term === "") {
      setResult([])
      return;
    }
    setLoading(true)
    client.query({
      query: TAB.query,
      variables,
    }).then(({ data }) => {
      processResult(data)
    }).finally(() => {
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
          <SearchBar onChange={term => {
            setResult([])
            setTerm(term)
          }} />
        </MobileHeader>
      </div>
      <Tabs
        options={TABS}
        defaultSelectedIndex={selectedTab}
        onSelect={tab => selectTab(tab)}
        className={styles.tabs}
      />
      <div className={styles.recentWrapper}>
        {!loading &&
          <>
            {result.length < 1 &&
              <h3 className={styles.caption}>Recently searched</h3>
            }
            <div className={styles.scrollable}>
              {result.length > 0 && result.map((keys) => (
                <div key={keys.id} className={styles.recent}>
                  <LinkHOC link={TAB.getLinkURL(keys)} onClick={() => addTabItem(keys)}>
                    {selectedTab === TABS[0].index &&
                      <div className={styles.iconholder}>
                        <img src={keys.logoUrl} alt={keys.name} title={keys.name} className={styles.assetIcon} />
                      </div>
                    }
                    {selectedTab !== TABS[0].index &&
                      <div className={styles.iconholder} style={{ fill: TAB.fill, backgroundColor: TAB.bgcolor }}>
                        <Svg id={TAB.icon} w={11} h={13} />
                      </div>
                    }
                    <span className={styles.name}>{TAB.getLinkLabel(keys)}</span>
                  </LinkHOC>
                </div>
              ))}
              {result.length < 1 && items.map((keys, index) => (
                <div key={index} className={styles.recent}>
                  <LinkHOC link={TAB.getLinkURL(keys)}>
                    {selectedTab === TABS[0].index &&
                      <div className={styles.iconholder}>
                        <img src={keys.logoUrl} alt={keys.name} title={keys.name} className={styles.assetIcon} />
                      </div>
                    }
                    {selectedTab !== TABS[0].index &&
                      <div className={styles.iconholder} style={{ fill: TAB.fill, backgroundColor: TAB.bgcolor }}>
                        <Svg id={TAB.icon} w={11} h={13} />
                      </div>
                    }
                    <span className={styles.name}>{TAB.getLinkLabel(keys)}</span>
                  </LinkHOC>
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
        }
      </div>
    </>
  )
}

export default SearchMobilePage
