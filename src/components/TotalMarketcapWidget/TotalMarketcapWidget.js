import React, { Component } from 'react'
import moment from 'moment'
import cx from 'classnames'
import { Selector } from '@santiment-network/ui'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'
import PercentChanges from '../PercentChanges'
import {
  getTop3Area,
  combineDataset,
  generateWidgetData
} from './totalMarketcapWidgetUtils'
import { formatNumber, millify } from '../../utils/formatting'

import './TotalMarketcapWidget.scss'

const WidgetMarketView = {
  TOTAL: 'Assets',
  LIST: 'List'
}

class TotalMarketcapWidget extends Component {
  state = {
    view:
      this.props.listName === 'All Assets'
        ? WidgetMarketView.TOTAL
        : WidgetMarketView.LIST
  }

  toggleMarketView = view => {
    this.setState({
      view
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
    let listYAxis = null

    if (!loading && Object.keys(restProjects).length > 0) {
      const target = isListView
        ? restProjects
        : { [`${listName} Marketcap`]: TOTAL_LIST_MARKET }

      marketcapDataset = combineDataset(marketcapDataset, target)
      restAreas = getTop3Area(target, !isListView)
    }

    if (TOTAL_LIST_MARKET && !isListView) {
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
              <h3 className='TotalMarketcapWidget__label'>{`${
                TOTAL_LIST_MARKET && isListView ? listName : 'All Crypto'
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
            <Selector
              variant='border'
              options={[WidgetMarketView.LIST, WidgetMarketView.TOTAL]}
              defaultSelected={WidgetMarketView.LIST}
              onSelectOption={this.toggleMarketView}
              style={{ width: 122 }}
            />
          )}
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
              name={`${isListView ? listName : 'All Crypto'} Marketcap`}
              fill='url(#total)'
            />
            {restAreas}
            <XAxis
              dataKey='datetime'
              tickFormatter={date => moment(date).format('DD MMM  YYYY')}
              minTickGap={30}
              hide
            />
            <YAxis
              yAxisId='total'
              dataKey='marketcap'
              hide
              tickLine={false}
              orientation='right'
              tickFormatter={marketcap => millify(marketcap)}
            />

            {listYAxis}
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
