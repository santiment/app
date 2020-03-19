import React from 'react'
import withSizes from 'react-sizes'
import { compose, withProps, branch, renderComponent } from 'recompose'
import {
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { formatNumber } from './../../utils/formatting'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { sourcesMeta as chartsMeta } from './trendsUtils'
import { getDateFormats } from '../../utils/dates'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './TrendsReChart.module.scss'

const toggleCharts = Object.keys(chartsMeta).filter(key => key !== 'total')

const ASSET_PRICE_COLOR = '#A4ACB7'

const Loading = () => <Loader className={styles.loader} />

const Empty = () => (
  <h2 style={{ marginLeft: 30 }}>
    We can't find any data{' '}
    <span aria-label='sadly' role='img'>
      😞
    </span>
  </h2>
)

const displayLoadingState = branch(
  props => props.isLoading,
  renderComponent(Loading)
)

const getChartMargins = isDesktop => {
  if (isDesktop) {
    return {
      top: 15,
      right: 36,
      left: 0,
      bottom: 5
    }
  }
  return {
    left: -20,
    right: 30,
    top: 15,
    bottom: 15
  }
}

const displayEmptyState = branch(props => props.isEmpty, renderComponent(Empty))

const useToggles = (defaultState = []) => {
  const [state, setState] = React.useState(defaultState)

  const setToggles = toggle => {
    setState(prevState => {
      if (prevState.includes(toggle)) {
        return prevState.filter(tog => tog !== toggle)
      }
      return [...prevState, toggle]
    })
  }

  return [state, setToggles]
}

const tickFormatter = date => {
  const { DD, MMM, YYYY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YYYY}`
}

const labelFormatter = date => {
  const { dddd, MMM, DD, YYYY } = getDateFormats(new Date(date))
  return `${dddd}, ${MMM} ${DD} ${YYYY}`
}

const TrendsReChart = ({
  chartSummaryData = [],
  chartData,
  asset,
  isDesktop
}) => {
  const [disabledToggles, setDisabledToggles] = useToggles(toggleCharts)

  return (
    <div>
      {chartSummaryData
        .filter(({ index }) => !disabledToggles.includes(index))
        .map((entity, key) => (
          <ResponsiveContainer
            width='100%'
            height={isDesktop ? 300 : 250}
            key={key}
          >
            <ComposedChart
              data={chartData}
              syncId='trends'
              margin={getChartMargins(isDesktop)}
            >
              <XAxis
                dataKey='datetime'
                tickLine={false}
                tickMargin={5}
                minTickGap={100}
                tickFormatter={tickFormatter}
              />
              <YAxis />
              <YAxis
                yAxisId='axis-price'
                hide
                tickFormatter={priceUsd =>
                  formatNumber(priceUsd, { currency: 'USD' })
                }
                domain={['auto', 'dataMax']}
              />
              <CartesianGrid
                vertical={false}
                strokeDasharray='4 10'
                stroke='#ebeef5'
              />
              <Tooltip
                labelFormatter={labelFormatter}
                formatter={(value, name) => {
                  if (name === `${asset}/USD`) {
                    return formatNumber(value, { currency: 'USD' })
                  }
                  return value
                }}
              />
              <Line
                type='linear'
                dataKey={entity.index}
                dot={false}
                strokeWidth={entity.index === 'merged' ? 1.5 : 2}
                name={entity.name}
                stroke={`var(--${entity.color})`}
              />
              <Line
                type='linear'
                yAxisId='axis-price'
                name={asset + '/USD'}
                dot={false}
                strokeWidth={1.5}
                dataKey='price_usd'
                stroke={ASSET_PRICE_COLOR}
              />
              <Legend />
            </ComposedChart>
          </ResponsiveContainer>
        ))}
      <div className={styles.toggles}>
        {toggleCharts.map(key => {
          const { index, name, color } = chartsMeta[key]
          return (
            <Button
              key={index}
              onClick={() => setDisabledToggles(index)}
              className={cx(
                styles.toggle,
                !disabledToggles.includes(index) && styles.toggle_active
              )}
              border={!disabledToggles.includes(index)}
            >
              <Label className={styles.label} accent={color} variant='circle' />{' '}
              {name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

TrendsReChart.defaultProps = {
  data: {},
  isLoading: true
}

export const addTotal = (
  chartData,
  channels = ['reddit', 'telegram', 'discord', 'professional_traders_chat']
) => {
  return chartData.reduce((acc, item) => {
    const total = channels.reduce((acc, channelName) => {
      acc += item[channelName] ? item[channelName] : 0
      return acc
    }, 0)
    acc.push({ total, ...item })
    return acc
  }, [])
}

const getTimeseries = (sourceName, trends) =>
  ((trends.sources || {})[sourceName] || []).map(el => {
    return {
      datetime: el.datetime,
      [sourceName]: el.mentionsCount
    }
  })

export const calcSumOfMentions = chartsMeta => data => {
  const channels = [
    'reddit',
    'telegram',
    'discord',
    'professional_traders_chat',
    'total'
  ]
  return data.reduce(
    (acc, val) => {
      channels.forEach(channelName => {
        if (val[channelName]) {
          acc[channelName] = {
            ...acc[channelName],
            value: acc[channelName].value + val[channelName]
          }
        }
      })
      return acc
    },
    { ...chartsMeta }
  )
}

const cleanAllZeroSources = data => data.filter(source => source.value > 0)

const objToArr = data => {
  return Object.keys(data).map(key => data[key])
}

export default compose(
  withProps(({ data: items, isLoading = true, trends }) => {
    const telegram = getTimeseries('telegram', trends)
    const reddit = getTimeseries('reddit', trends)
    const professional_traders_chat = getTimeseries(
      'professional_traders_chat',
      trends
    )
    const discord = getTimeseries('discord', trends)

    if (trends.isLoading || isLoading) {
      return { isLoading: true }
    }

    const _chartData = mergeTimeseriesByKey({
      timeseries: [items, telegram, reddit, professional_traders_chat, discord],
      key: 'datetime'
    })
    const chartData = addTotal(_chartData)

    if (
      telegram.length === 0 &&
      reddit.length === 0 &&
      professional_traders_chat.length === 0 &&
      discord.length === 0
    ) {
      return {
        isEmpty: true
      }
    }

    const chartSummaryData = compose(
      cleanAllZeroSources,
      objToArr,
      calcSumOfMentions(chartsMeta)
    )(chartData)

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    chartSummaryData.forEach(({ index }) => {
      chartData.forEach(data => {
        if (new Date(data.datetime) < currentDate) {
          if (data[index] === undefined) {
            data[index] = 0
          }
        }
      })
    })
    return {
      chartData,
      chartSummaryData,
      isLoading: false
    }
  }),
  withSizes(mapSizesToProps),
  displayLoadingState,
  displayEmptyState
)(TrendsReChart)
