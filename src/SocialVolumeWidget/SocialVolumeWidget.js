import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import { connect } from 'react-redux'
import styles from './SocialVolumeWidget.module.scss'

const RoundBar = props => {
  const { fill, x, y, width, height } = props

  return <rect x={x} y={y} width='6px' height={height} rx='3' fill='#E0E4EE' />
}

const SocialVolumeWidget = ({ socialVolumeData, slug = 'bitcoin' }) => (
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

export default connect(mapStateToProps)(SocialVolumeWidget)
