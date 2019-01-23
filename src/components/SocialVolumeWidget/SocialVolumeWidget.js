import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { FadeIn } from 'animate-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { SOCIALVOLUME_DATA_FETCH } from './actions'
import { millify } from '../../utils/formatting'
import styles from './SocialVolumeWidget.module.scss'

const RoundBar = props => {
  const { fill, x, y, width, height } = props
  return (
    <rect
      x={x}
      y={height < 0 ? y + height : y}
      width='6px'
      height={Math.abs(height)}
      rx='3'
      fill='#E0E4EE'
    />
  )
}

export class SocialVolumeWidget extends React.Component {
  componentDidMount () {
    this.props.requestTotalSocialVolume()
  }

  render () {
    const { data = [], slug, isLoading, isScoreOverTime, error } = this.props
    if (isLoading) {
      return (
        <div className={styles.wrapper + ' ' + styles.WordCloudLoading}>
          <FadeIn duration='2s' timingFunction='ease-out'>
            <h3>Loading...</h3>
          </FadeIn>
        </div>
      )
    }

    if (error) {
      return (
        <div className={styles.wrapper + ' ' + styles.WordCloudLoading}>
          <FadeIn duration='2s' timingFunction='ease-out'>
            <h3>Can't find anything about this trend...</h3>
          </FadeIn>
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className={styles.wrapper + ' ' + styles.WordCloudLoading}>
          <FadeIn duration='2s' timingFunction='ease-out'>
            <h3>Choose any word below to see its social context</h3>
          </FadeIn>
        </div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <span className={styles.slug}>{slug}</span> social volume score
        </div>
        <ResponsiveContainer width='100%' height={170}>
          <BarChart
            data={data}
            margin={{ top: 0, right: -25, left: 0, bottom: -10 }}
          >
            <XAxis
              dataKey='datetime'
              interval='preserveStartEnd'
              axisLine={false}
              tickLine={false}
              tickFormatter={date => {
                const tickDate = moment(date)

                return tickDate.isSame(Date.now(), 'year')
                  ? tickDate.format('MMM DD')
                  : tickDate.format('MMM DD YYYY')
              }}
              minTickGap={20}
            />
            <YAxis
              domain={[0, dataMax => dataMax + parseInt(0.35 * dataMax)]}
              orientation='right'
              axisLine={false}
              tickLine={false}
              tickFormatter={count => millify(count, 0)}
            />

            <Bar
              dataKey={isScoreOverTime ? 'score' : 'mentionsCount'}
              shape={<RoundBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  slug: state.socialVolume.slug,
  data: state.socialVolume.data,
  isLoading: state.socialVolume.isLoading,
  isScoreOverTime: state.socialVolume.isScoreOverTime,
  error: state.socialVolume.error
})

const mapDispatchToProps = dispatch => ({
  requestTotalSocialVolume: () =>
    dispatch({
      type: SOCIALVOLUME_DATA_FETCH,
      payload: '__TOTAL_SOCIAL_VOLUME__'
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialVolumeWidget)
