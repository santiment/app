import React from 'react'
import { graphql } from 'react-apollo'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Panel } from '@santiment-network/ui'
import moment from 'moment'
import { millify } from '../../utils/formatting'
import { SOCIAL_VOLUME_QUERY } from '../../components/SocialVolumeWidget/socialVolumeGQL'
import { mergeTimeseriesByKey } from '../../utils/utils'
import styles from './TotalSocialVolume.module.scss'

const RoundBar = ({ x, y, height }) => (
  <rect x={x} y={y} width='6px' height={height} rx='3' className={styles.bar} />
)

const TotalSocialVolume = ({ className, data }) => {
  return (
    <Panel className={styles.wrapper}>
      <div className={styles.header}>Total social volume</div>
      <div className={styles.content}>
        <ResponsiveContainer width='100%' className={styles.chart}>
          <BarChart
            data={data}
            margin={{ top: 20, right: -31, left: -23, bottom: -10 }}
          >
            <XAxis
              dataKey='datetime'
              interval='preserveStartEnd'
              axisLine={false}
              tickLine={false}
              tickFormatter={date => {
                return moment(date).format('MMM DD')
              }}
              minTickGap={150}
            />
            <YAxis
              orientation='left'
              axisLine={false}
              tickLine={false}
              tickFormatter={count => millify(count, 0)}
            />

            <Bar
              isAnimationActive={false}
              dataKey='mentionsCount'
              shape={<RoundBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}

const defaultTS = {
  chartData: []
}

export default graphql(SOCIAL_VOLUME_QUERY, {
  props: ({
    data: {
      discord = defaultTS,
      reddit = defaultTS,
      telegram = defaultTS,
      professional_traders_chat: ptc = defaultTS
    },
    loading
  }) => {
    return {
      data: mergeTimeseriesByKey({
        timeseries: [
          telegram.chartData,
          reddit.chartData,
          discord.chartData,
          ptc.chartData
        ],
        mergeData: (longestTSData, timeserieData) => {
          return {
            mentionsCount:
              longestTSData.mentionsCount + timeserieData.mentionsCount,
            datetime: longestTSData.datetime
          }
        }
      }),
      loading
    }
  },
  options: () => {
    const toDate = new Date()
    toDate.setHours(24, 0, 0, 0)
    const fromDate = new Date()
    fromDate.setHours(0, 0, 0, 0)
    fromDate.setMonth(fromDate.getMonth() - 2)

    return {
      variables: {
        word: '*',
        from: fromDate.toISOString(),
        to: toDate.toISOString()
      }
    }
  }
})(TotalSocialVolume)
