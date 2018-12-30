import React, { Component } from 'react'
import moment from 'moment'
import cx from 'classnames'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import PercentChanges from '../PercentChanges'
import Widget from '../Widget/Widget'
import {
  getTop3Area,
  combineDataset,
  generateWidgetData
} from './totalMarketcapWidgetUtils'
import { formatNumber, millify } from '../../utils/formatting'

import './TotalMarketcapWidget.scss'

const WidgetMarketView = {
  TOTAL: 'Total',
  LIST: 'List'
}

const MarketView = ({ currentView, toggleMarketView }) => (
  <div
    className={cx({
      TotalMarketcapWidget__btns: true,
      switched: currentView === WidgetMarketView.LIST
    })}
    onClick={toggleMarketView}
  >
    {Object.values(WidgetMarketView).map(view => (
      <button key={view} className='TotalMarketcapWidget__view-btn'>
        {view}
      </button>
    ))}
  </div>
)

class TotalMarketcapWidget extends Component {
  state = {
    view: WidgetMarketView.TOTAL
  }

  toggleMarketView = () => {
    this.setState({
      view:
        this.state.view === WidgetMarketView.LIST
          ? WidgetMarketView.TOTAL
          : WidgetMarketView.LIST
    })
  }

  render () {
    const {
      historyPrices: { TOTAL_MARKET, TOTAL_LIST_MARKET, ...restProjects },
      loading,
      listName
    } = this.props

    const { view } = this.state
    const isListView = view === WidgetMarketView.LIST

    let {
      totalmarketCapPrice = '.',
      volumeAmplitudePrice = '.',
      volume24PercentChange,
      marketcapDataset = []
    } = generateWidgetData(
      TOTAL_LIST_MARKET && isListView ? TOTAL_LIST_MARKET : TOTAL_MARKET
    )

    let restAreas = null
    let listDomainUpperBoundary = 0

    if (!loading && Object.keys(restProjects).length > 0) {
      const target = isListView
        ? restProjects
        : { [listName]: TOTAL_LIST_MARKET }
      console.log(
        Math.max(0, ...TOTAL_LIST_MARKET.map(({ marketcap }) => marketcap))
      )
      marketcapDataset = combineDataset(marketcapDataset, target)
      restAreas = getTop3Area(target, !isListView)
    }

    if (!isListView) {
      const listMaxValue = Math.max(
        0,
        ...TOTAL_LIST_MARKET.map(({ marketcap }) => marketcap)
      )
      listDomainUpperBoundary = listMaxValue + listMaxValue * 0.1
    }

    const valueClassNames = `TotalMarketcapWidget__value ${
      totalmarketCapPrice === '.' ? 'TotalMarketcapWidget__value_loading' : ''
    }`

    return (
      <div className='TotalMarketcapWidget'>
        <div className='TotalMarketcapWidget__upper'>
          <div className='TotalMarketcapWidget__info'>
            <div className='TotalMarketcapWidget__left'>
              <h3 className='TotalMarketcapWidget__label'>{`${
                TOTAL_LIST_MARKET && isListView ? 'List' : 'Total'
              } marketcap`}</h3>
              <h4 className={valueClassNames}>{totalmarketCapPrice}</h4>
            </div>
            <div className='TotalMarketcapWidget__right'>
              <h3 className='TotalMarketcapWidget__label'>Volume, 24h</h3>
              <h4 className={valueClassNames}>
                {volumeAmplitudePrice}
                <PercentChanges
                  changes={volume24PercentChange}
                  className='TotalMarketcapWidget__change'
                />
              </h4>
            </div>
          </div>

          {TOTAL_LIST_MARKET && (
            <MarketView
              currentView={view}
              toggleMarketView={this.toggleMarketView}
            />
          )}
        </div>
        <ResponsiveContainer
          // width='100%'
          height={430}
          className={cx({
            TotalMarketcapWidget__chart: true,
            list: !!TOTAL_LIST_MARKET
          })}
        >
          <AreaChart
            data={marketcapDataset}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Area
              yAxisId='1'
              dataKey='marketcap'
              type='monotone'
              strokeWidth={1}
              stroke='#2d5e39'
              fill='rgba(214, 235, 219, .8)'
              isAnimationActive={false}
              name={'Total Marketcap'}
            />
            {restAreas}
            <XAxis
              dataKey='datetime'
              tickFormatter={date => moment(date).format('DD MMM  YYYY')}
              minTickGap={30}
            />
            <YAxis
              yAxisId='1'
              dataKey='marketcap'
              // domain={[0, 250000000000]}
              // allowDataOverflow
              orientation='right'
              tickFormatter={marketcap => millify(marketcap)}
            />
            {!isListView && (
              <YAxis
                domain={[0, listDomainUpperBoundary]}
                allowDataOverflow
                yAxisId='2'
                dataKey='marketcap'
                orientation='left'
                tickFormatter={marketcap => millify(marketcap)}
              />
            )}
            <Tooltip
              labelFormatter={date => moment(date).format('dddd, MMM DD YYYY')}
              formatter={value => formatNumber(value, { currency: 'USD' })}
              itemSorter={({ value }) => value}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default TotalMarketcapWidget
