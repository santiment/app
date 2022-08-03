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
  getRecentAssets,
  getRecentTrends,
  getRecentInsights,
  addRecentAssets,
  addRecentTrends,
  addRecentInsights,
  removeRecentTrends,
  removeRecentAssets,
  remvoveRecentInsights,
} from '../../utils/recent'
import styles from './SearchMobilePage.module.scss'

const SearchMobilePage = ({ history, ...props }) => {
  const [selectedTab, selectTab] = useState(TABS[0].index)
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState('')
  const [result, setResult] = useState([])

  const [assets, setAssets] = useState(getRecentAssets().filter(Boolean))
  const [trends, setTrends] = useState(getRecentTrends().filter(Boolean))
  const [insights, setInsights] = useState(getRecentInsights().filter(Boolean))

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
          assets,
          setAssets,
          getRecentAssets,
          addRecentAssets,
          removeRecentAssets,
          { minVolume: 0 }
        ]
      case TABS[1].index:
        const [from, to] = getFromTo()
        return [
          TABS[1],
          trends,
          setTrends,
          getRecentTrends,
          addRecentTrends,
          removeRecentTrends,
          { from, to }
        ]
      case TABS[2].index:
        return [
          TABS[2],
          insights,
          setInsights,
          getRecentInsights,
          addRecentInsights,
          remvoveRecentInsights,
          { searchTerm: term }
        ]
    }
  }, [selectedTab, assets, trends, insights, result])

  const [TAB, items, setItems, getItems, addItem, removeItem, variables] = tabActions

  function processResult(data) {
    let result = data[TAB.responseKey]
    if (selectedTab === TABS[1].index) {
      result = result[0].topWords
    }
    console.log(result)
    let processedResult = []
    const normalizedTerm = term.toLowerCase()
    switch(selectedTab) {
      case TABS[0].index:
        processedResult = result.filter(({name, ticker}) => name.toLowerCase().includes(normalizedTerm) || ticker.toLowerCase().includes(normalizedTerm))
      break
      case TABS[1].index:
        processedResult = result.filter(({word}) => word.toLowerCase().includes(normalizedTerm))
      break
      case TABS[2].index:
        processedResult = result.filter(({title}) => title.toLowerCase().includes(normalizedTerm))
      break;
    }
    setResult(processedResult)
  }

  useEffect(() => {
    if (loading) return
    if (!term) {
      setResult([])
      return;
    }
    setLoading(true)
    client.query({
      query: TAB.query,
      variables,
    }).then(({ data }) => {
      processResult(data)
      addItem(term)
      setItems(getItems().filter(Boolean))
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
                  <Link to={TAB.getLinkURL(keys)} className={styles.link}>
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
                  </Link>
                </div>
              ))}
              {result.length < 1 && items.map((slug) => (
                <div key={slug} className={styles.recent}>
                  <Link to={TAB.getLinkURL({slug})} className={styles.link}>
                    <div className={styles.iconholder} style={{ fill: TAB.fill, backgroundColor: TAB.bgcolor }}>
                      <Svg id={TAB.icon} w={11} h={13} />
                    </div>
                    <span className={styles.name}>{TAB.getLinkLabel({id: slug, name: slug, word: slug, title: slug})}</span>
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
        }
      </div>
    </>
  )
}

export default SearchMobilePage
