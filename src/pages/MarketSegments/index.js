import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Tabs from '@santiment-network/ui/Tabs'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import AssetsTable from '../assets/AssetsTable'
import { MARKET_SEGMENT_COLUMNS } from '../assets/asset-columns'
import { getMarketSegment } from '../../ducks/SANCharts/utils'
import { MARKET_SEGMENTS_FETCH } from './actions'
import styles from './index.module.scss'

const hideSettings = {
  header: true,
  metricSelector: true,
  sidecar: true
}

const SEGMENTS = [
  getMarketSegment('Ethereum'),
  getMarketSegment('DeFi'),
  getMarketSegment('EOS')
]

const TABS = ['Ethereum', 'DeFi', 'EOS']
const PROJECT_LINK_PROPS = {
  projectLink: {
    state: {
      from: {
        to: '/labs/buidl-heroes',
        children: 'Buidl heroes'
      }
    }
  }
}

const MarketSegmentsPage = ({
  assets,
  loading,
  isLoggedIn,
  location,
  history,
  fetchAssets,
  timestamp = Date.now()
}) => {
  const [segment, setSegment] = useState('DeFi')

  function changeSegment (segment) {
    setSegment(segment)
  }

  function refetchAssets () {
    fetchAssets({ segment, forced: true })
  }

  useEffect(
    () => {
      fetchAssets({ segment })
    },
    [segment]
  )

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content + ' page'}>
          <h2 className={styles.title}>Buidl heroes</h2>
          <ChartWidget
            enabledViewOnlySharing={false}
            adjustNightMode={false}
            showToggleAnomalies={false}
            metrics={[]}
            marketSegments={SEGMENTS}
            interval='1d'
            classes={styles}
            isLoggedIn={isLoggedIn}
            isControlled
            hideSettings={hideSettings}
            hasPremium={true}
            isPRO={true}
            leftBoundaryDate={false}
            rightBoundaryDate={false}
            intervals={['30d', '3m', '6m', '1y', 'all']}
            timeRange='30d'
          />
          <Tabs
            options={TABS}
            defaultSelectedIndex={segment}
            onSelect={changeSegment}
            className={styles.tabs}
          />
          <AssetsTable
            items={assets}
            Assets={{ typeInfo: '', isLoading: loading, timestamp }}
            listName='Market Segments'
            showCollumnsToggle={false}
            refetchAssets={refetchAssets}
            className={styles.table}
            columnProps={PROJECT_LINK_PROPS}
            allColumns={MARKET_SEGMENT_COLUMNS}
          />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  ...state.marketSegments
})

const mapDispatchToProps = dispatch => ({
  fetchAssets: payload =>
    dispatch({
      type: MARKET_SEGMENTS_FETCH,
      payload
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketSegmentsPage)
