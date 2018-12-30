import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import { connect } from 'react-redux'
import styles from './SocialVolumeScore.module.scss'

const data = [
  {
    datetime: '2018-10-28T00:00:00Z',
    mentionsCount: 1352
  },
  {
    datetime: '2018-10-29T00:00:00Z',
    mentionsCount: 1744
  },
  {
    datetime: '2018-10-30T00:00:00Z',
    mentionsCount: 1649
  },
  {
    datetime: '2018-10-31T00:00:00Z',
    mentionsCount: 1947
  },
  {
    datetime: '2018-11-01T00:00:00Z',
    mentionsCount: 1555
  },
  {
    datetime: '2018-11-02T00:00:00Z',
    mentionsCount: 1333
  },
  {
    datetime: '2018-11-03T00:00:00Z',
    mentionsCount: 1181
  },
  {
    datetime: '2018-11-04T00:00:00Z',
    mentionsCount: 1668
  },
  {
    datetime: '2018-11-05T00:00:00Z',
    mentionsCount: 1261
  },
  {
    datetime: '2018-11-06T00:00:00Z',
    mentionsCount: 1832
  },
  {
    datetime: '2018-11-07T00:00:00Z',
    mentionsCount: 1408
  },
  {
    datetime: '2018-11-08T00:00:00Z',
    mentionsCount: 1338
  },
  {
    datetime: '2018-11-09T00:00:00Z',
    mentionsCount: 1606
  },
  {
    datetime: '2018-11-10T00:00:00Z',
    mentionsCount: 1167
  },
  {
    datetime: '2018-11-11T00:00:00Z',
    mentionsCount: 1240
  },
  {
    datetime: '2018-11-12T00:00:00Z',
    mentionsCount: 1194
  },
  {
    datetime: '2018-11-13T00:00:00Z',
    mentionsCount: 1319
  },
  {
    datetime: '2018-11-14T00:00:00Z',
    mentionsCount: 4056
  },
  {
    datetime: '2018-11-15T00:00:00Z',
    mentionsCount: 3531
  },
  {
    datetime: '2018-11-16T00:00:00Z',
    mentionsCount: 2526
  },
  {
    datetime: '2018-11-17T00:00:00Z',
    mentionsCount: 1906
  },
  {
    datetime: '2018-11-18T00:00:00Z',
    mentionsCount: 969
  },
  {
    datetime: '2018-11-19T00:00:00Z',
    mentionsCount: 4241
  },
  {
    datetime: '2018-11-20T00:00:00Z',
    mentionsCount: 6775
  },
  {
    datetime: '2018-11-21T00:00:00Z',
    mentionsCount: 3307
  },
  {
    datetime: '2018-11-22T00:00:00Z',
    mentionsCount: 2317
  },
  {
    datetime: '2018-11-23T00:00:00Z',
    mentionsCount: 2771
  },
  {
    datetime: '2018-11-24T00:00:00Z',
    mentionsCount: 2991
  },
  {
    datetime: '2018-11-25T00:00:00Z',
    mentionsCount: 4287
  },
  {
    datetime: '2018-11-26T00:00:00Z',
    mentionsCount: 2883
  },
  {
    datetime: '2018-11-27T00:00:00Z',
    mentionsCount: 2716
  },
  {
    datetime: '2018-11-28T00:00:00Z',
    mentionsCount: 3751
  },
  {
    datetime: '2018-11-29T00:00:00Z',
    mentionsCount: 2296
  },
  {
    datetime: '2018-11-30T00:00:00Z',
    mentionsCount: 1895
  },
  {
    datetime: '2018-12-01T00:00:00Z',
    mentionsCount: 1546
  },
  {
    datetime: '2018-12-02T00:00:00Z',
    mentionsCount: 1321
  },
  {
    datetime: '2018-12-03T00:00:00Z',
    mentionsCount: 1804
  },
  {
    datetime: '2018-12-04T00:00:00Z',
    mentionsCount: 1946
  },
  {
    datetime: '2018-12-05T00:00:00Z',
    mentionsCount: 2159
  },
  {
    datetime: '2018-12-06T00:00:00Z',
    mentionsCount: 2846
  },
  {
    datetime: '2018-12-07T00:00:00Z',
    mentionsCount: 4369
  },
  {
    datetime: '2018-12-08T00:00:00Z',
    mentionsCount: 2373
  },
  {
    datetime: '2018-12-09T00:00:00Z',
    mentionsCount: 2075
  },
  {
    datetime: '2018-12-10T00:00:00Z',
    mentionsCount: 2307
  },
  {
    datetime: '2018-12-11T00:00:00Z',
    mentionsCount: 1965
  },
  {
    datetime: '2018-12-12T00:00:00Z',
    mentionsCount: 1343
  },
  {
    datetime: '2018-12-13T00:00:00Z',
    mentionsCount: 1907
  },
  {
    datetime: '2018-12-14T00:00:00Z',
    mentionsCount: 2351
  },
  {
    datetime: '2018-12-15T00:00:00Z',
    mentionsCount: 1640
  },
  {
    datetime: '2018-12-16T00:00:00Z',
    mentionsCount: 1248
  },
  {
    datetime: '2018-12-17T00:00:00Z',
    mentionsCount: 2246
  },
  {
    datetime: '2018-12-18T00:00:00Z',
    mentionsCount: 1790
  },
  {
    datetime: '2018-12-19T00:00:00Z',
    mentionsCount: 2214
  },
  {
    datetime: '2018-12-20T00:00:00Z',
    mentionsCount: 2066
  },
  {
    datetime: '2018-12-21T00:00:00Z',
    mentionsCount: 1697
  },
  {
    datetime: '2018-12-22T00:00:00Z',
    mentionsCount: 1442
  },
  {
    datetime: '2018-12-23T00:00:00Z',
    mentionsCount: 1435
  },
  {
    datetime: '2018-12-24T00:00:00Z',
    mentionsCount: 1519
  },
  {
    datetime: '2018-12-25T00:00:00Z',
    mentionsCount: 1670
  }
]

const RoundBar = props => {
  const { fill, x, y, width, height } = props

  /* return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} /> */
  return <rect x={x} y={y} width='6px' height={height} rx='3' fill='#E0E4EE' />
}

const SocialVolumeScoreChart = ({ socialVolumeData, slug = 'bitcoin' }) => (
  <div className={styles.chart}>
    <div className={styles.info}>
      <span className={styles.slug}>{slug}</span> social volume score
    </div>
    <ResponsiveContainer width='100%' height={170}>
      <BarChart
        data={socialVolumeData}
        margin={{ top: 0, right: -25, left: 0, bottom: -10 }}
      >
        <XAxis
          dataKey='datetime'
          interval='preserveStartEnd'
          axisLine={false}
          tickLine={false}
          tickFormatter={date => {
            const tickDate = moment(date)
            console.log(tickDate.isSame(Date.now(), 'year'))
            return tickDate.isSame(Date.now(), 'year')
              ? tickDate.format('MMM DD')
              : tickDate.format('MMM DD YYYY')
          }}
          minTickGap={20}
        />
        <YAxis orientation='right' axisLine={false} tickLine={false} />

        <Bar dataKey='mentionsCount' shape={<RoundBar />} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

const mapStateToProps = state => ({
  slug: state.socialVolume.slug,
  socialVolumeData: state.socialVolume.data
})

export default connect(mapStateToProps)(SocialVolumeScoreChart)
