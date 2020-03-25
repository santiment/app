import React, { useState } from 'react'
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
import { mergeTimeseriesByKey } from './../../utils/utils'
import CommonChartTooltip from '../../ducks/SANCharts/tooltip/CommonChartTooltip'
import { sourcesMeta as chartsMeta } from './trendsUtils'
import SocialDominanceToggle from '../../ducks/SocialTool/Chart/SocialDominanceToggle'
import { getDateFormats } from '../../utils/dates'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './TrendsReChart.module.scss'

const toggleCharts = Object.keys(chartsMeta).filter(key => key !== 'total')

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
  const { DD, MMM } = getDateFormats(new Date(date))
  return `${DD} ${MMM}`
}

const TrendsReChart = ({
  chartSummaryData = [],
  chartData,
  asset,
  isDesktop
}) => {
  const [disabledToggles, setDisabledToggles] = useToggles(toggleCharts)

  const savedToggleState = !!localStorage.getItem('SOCIAL_DOMINANCE_TOGGLE')
  const [showDominance, setShowDominance] = useState(savedToggleState)

  return (
    <div>
      {chartSummaryData
        .filter(({ index }) => !disabledToggles.includes(index))
        .map((entity, key) => (
          <div key={key}>
            <div className={styles.chart}>
              <ResponsiveContainer width='100%' height={isDesktop ? 300 : 250}>
                <ComposedChart
                  data={chartData}
                  syncId='trends'
                  margin={getChartMargins(isDesktop)}
                >
                  <XAxis
                    dataKey='datetime'
                    tickLine={false}
                    tickMargin={5}
                    minTickGap={60}
                    tickFormatter={tickFormatter}
                  />
                  <YAxis />
                  <YAxis
                    yAxisId='axis-price'
                    hide
                    domain={['auto', 'dataMax']}
                  />
                  <YAxis
                    yAxisId='axis-dominance'
                    hide
                    domain={['auto', 'dataMax']}
                  />
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray='4 10'
                    stroke='var(--porcelain)'
                  />
                  <Tooltip
                    isAnimationActive={false}
                    cursor={{ stroke: 'var(--casper)' }}
                    position={{ x: 60, y: 0 }}
                    content={<CommonChartTooltip />}
                  />
                  <Line
                    type='linear'
                    dataKey={entity.index}
                    dot={false}
                    strokeWidth={2}
                    name={entity.name}
                    stroke={`var(--${entity.color})`}
                    isAnimationActive={false}
                  />
                  {showDominance && key === 0 && (
                    <Line
                      type='linear'
                      dot={false}
                      strokeWidth={2}
                      dataKey='dominance'
                      yAxisId='axis-dominance'
                      name={'Social Dominance'}
                      stroke='var(--texas-rose)'
                      isAnimationActive={false}
                    />
                  )}
                  <Line
                    type='linear'
                    yAxisId='axis-price'
                    name={asset + '/USD'}
                    dot={false}
                    strokeWidth={1.5}
                    dataKey='price_usd'
                    stroke='var(--mystic)'
                    isAnimationActive={false}
                  />
                  <Legend
                    verticalAlign='bottom'
                    align='right'
                    wrapperStyle={{
                      padding: '24px 14px',
                      marginBottom: '-24px',
                      right: 0,
                      left: 0,
                      width: 'auto !important',
                      borderTop: '1px solid var(--porcelain)'
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              {key === 0 && (
                <SocialDominanceToggle
                  className={styles.dominance}
                  isActive={showDominance}
                  toggleDominance={() => {
                    const newState = !showDominance
                    setShowDominance(newState)
                    if (newState) {
                      localStorage.setItem('SOCIAL_DOMINANCE_TOGGLE', '+')
                    } else {
                      localStorage.removeItem('SOCIAL_DOMINANCE_TOGGLE')
                    }
                  }}
                />
              )}
            </div>
            {key === 0 && (
              <>
                <div className={styles.toggles}>
                  <h4 className={styles.title}>Detailed charts</h4>
                  {toggleCharts.map(key => {
                    const { index, name, color } = chartsMeta[key]
                    return (
                      <Button
                        key={index}
                        onClick={() => setDisabledToggles(index)}
                        className={cx(
                          styles.toggle,
                          !disabledToggles.includes(index) &&
                            styles.toggle_active
                        )}
                        border={!disabledToggles.includes(index)}
                      >
                        <Label
                          className={styles.label}
                          accent={color}
                          variant='circle'
                        />{' '}
                        {name}
                      </Button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        ))}
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

const addSocialDominance = (wordData, totalData) =>
  wordData.map((item = {}, idx) => {
    const totalItem = totalData[idx] || {}
    const dominance = (item.total * 100) / totalItem.total
    return { dominance: isNaN(dominance) ? 0 : dominance, ...item }
  })

const getTimeseries = (sourceName, trends, key = 'sources') =>
  ((trends[key] || {})[sourceName] || []).map(el => {
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

    const _chartData = addTotal(
      mergeTimeseriesByKey({
        timeseries: [
          items,
          telegram,
          reddit,
          professional_traders_chat,
          discord
        ],
        key: 'datetime'
      })
    )

    const totalMentions = addTotal(
      mergeTimeseriesByKey({
        timeseries: [
          getTimeseries('telegram', trends, 'sourcesTotal'),
          getTimeseries('reddit', trends, 'sourcesTotal'),
          getTimeseries('professional_traders_chat', trends, 'sourcesTotal'),
          getTimeseries('discord', trends, 'sourcesTotal')
        ],
        key: 'datetime'
      })
    )
    const chartData = addSocialDominance(_chartData, totalMentions)

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
