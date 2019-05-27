import React, { Component } from 'react'
import cx from 'classnames'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import PercentChanges from '../PercentChanges'
import {
  combineDataset,
  generateWidgetData,
  getTop3Area
} from './totalMarketcapWidgetUtils'
import { getDateFormats } from '../../utils/dates'
import { formatNumber, millify } from '../../utils/formatting'

import './TotalMarketcapWidget.scss'

// NOTE(vanguard): Linear gradient should use css vars?

const labelFormatter = date => {
  const { dddd, MMM, DD, YYYY } = getDateFormats(new Date(date))
  return `${dddd}, ${MMM} ${DD} ${YYYY}`
}

const tickFormatter = date => {
  const { DD, MMM, YYYY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YYYY}`
}

class TotalMarketcapWidget extends Component {
  render () {
    const {
      historyPrices: { TOTAL_MARKET, TOTAL_LIST_MARKET },
      loading,
      listName
    } = this.props

    let {
      totalmarketCapPrice = '.',
      marketcap24PercentChange,
      marketcapDataset = []
    } = generateWidgetData(TOTAL_MARKET)

    const {
      totalmarketCapPrice: totalmarketCapPriceList = '.',
      marketcap24PercentChange: marketcap24PercentChangeList
    } = generateWidgetData(TOTAL_LIST_MARKET)

    let restAreas = null
    let listYAxis = null

    if (!loading && TOTAL_LIST_MARKET) {
      const target = { [`${listName} Marketcap`]: TOTAL_LIST_MARKET }
      marketcapDataset = combineDataset(marketcapDataset, target)
      restAreas = getTop3Area(target)
    }

    if (TOTAL_LIST_MARKET) {
      const listMaxValue = Math.max(
        0,
        ...TOTAL_LIST_MARKET.map(({ marketcap }) => marketcap)
      )
      listYAxis = (
        <YAxis
          domain={[0, listMaxValue + listMaxValue * 0.1]}
          hide
          allowDataOverflow
          yAxisId='list'
          dataKey='marketcap'
          tickLine={false}
          orientation='left'
        />
      )
    }

    const valueClassNames = cx({
      TotalMarketcapWidget__value: true,
      TotalMarketcapWidget__value_loading: totalmarketCapPrice === '.'
    })

    return (
      <div className='TotalMarketcapWidget'>
        <div className='TotalMarketcapWidget__upper'>
          <div className='TotalMarketcapWidget__info'>
            <div className='TotalMarketcapWidget__left'>
              <h3 className='TotalMarketcapWidget__label'>
                All Crypto marketcap, 24h
              </h3>
              <h4 className={valueClassNames}>
                {totalmarketCapPrice}
                <PercentChanges
                  changes={marketcap24PercentChange}
                  className='TotalMarketcapWidget__change'
                />
              </h4>
            </div>
            {TOTAL_LIST_MARKET && (
              <div className='TotalMarketcapWidget__right'>
                <h3 className='TotalMarketcapWidget__label'>
                  {listName} marketcap, 24h
                </h3>
                <h4 className={valueClassNames}>
                  {totalmarketCapPriceList}
                  <PercentChanges
                    changes={marketcap24PercentChangeList}
                    className='TotalMarketcapWidget__change'
                  />
                </h4>
              </div>
            )}
          </div>
        </div>
        <ResponsiveContainer
          height={235}
          className={cx({
            TotalMarketcapWidget__chart: true,
            list: !!TOTAL_LIST_MARKET
          })}
        >
          <AreaChart
            data={marketcapDataset}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='total' x1='0' x2='0' y1='0' y2='100%'>
                <stop offset='0%' stopColor='#5275FF' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#fff' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='mc-0' x1='0' x2='0' y1='0' y2='100%'>
                <stop offset='0%' stopColor='#14C393' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#fff' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='mc-1' x1='0' x2='0' y1='0' y2='100%'>
                <stop offset='0%' stopColor='#FFAD4D' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#fff' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='mc-2' x1='0' x2='0' y1='0' y2='100%'>
                <stop offset='0%' stopColor='#8358FF' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#fff' stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              yAxisId='total'
              dataKey='marketcap'
              type='monotone'
              strokeWidth={1.5}
              stroke='#5275FF'
              isAnimationActive={false}
              name='All Crypto Marketcap'
              fill='url(#total)'
            />
            {restAreas}
            <XAxis
              dataKey='datetime'
              tickFormatter={tickFormatter}
              minTickGap={30}
              hide
            />
            {listYAxis}
            <YAxis
              yAxisId='total'
              dataKey='marketcap'
              hide
              tickLine={false}
              orientation='right'
              tickFormatter={marketcap => millify(marketcap)}
            />

            <Tooltip
              labelFormatter={labelFormatter}
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
