import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { connect } from 'react-redux'
import { SOCIALVOLUME_DATA_FETCH, TOTAL_SOCIALVOLUME_SECRET } from './actions'
import { getDateFormats } from '../../utils/dates'
import { millify } from '../../utils/formatting'
import WidgetTrend from '../Widget/WidgetTrend'
import styles from './SocialVolumeWidget.module.scss'

const RoundBar = ({ x, y, height }) => (
  <rect x={x} y={y} width='6px' height={height} rx='3' />
)

const tickFormatter = date => {
  const { MMM, DD } = getDateFormats(new Date(date))
  return `${MMM} ${DD}`
}

export class SocialVolumeWidget extends React.Component {
  componentDidMount () {
    this.props.requestTotalSocialVolume()
  }

  render () {
    const { data = [], word, isLoading, error } = this.props
    return (
      <WidgetTrend
        className={styles.wrapper}
        trendWord={word}
        description='social value & score'
        isLoading={isLoading}
        error={error}
        hasData={data.length > 0}
      >
        <ResponsiveContainer width='100%'>
          <BarChart
            data={data}
            margin={{ top: 0, right: -35, left: 0, bottom: -7 }}
          >
            <XAxis
              dataKey='datetime'
              interval='preserveStartEnd'
              axisLine={false}
              tickLine={false}
              tickFormatter={tickFormatter}
              minTickGap={20}
            />
            <YAxis
              domain={[0, dataMax => dataMax + parseInt(0.35 * dataMax)]}
              orientation='right'
              axisLine={false}
              tickLine={false}
              tickFormatter={count => millify(count, 0)}
            />

            <Bar dataKey='mentionsCount' shape={<RoundBar />} />
          </BarChart>
        </ResponsiveContainer>
      </WidgetTrend>
    )
  }
}

const mapStateToProps = state => ({
  data: state.socialVolume.data,
  isLoading: state.socialVolume.isLoading,
  error: state.socialVolume.error
})

const mapDispatchToProps = dispatch => ({
  requestTotalSocialVolume: () =>
    dispatch({
      type: SOCIALVOLUME_DATA_FETCH,
      payload: TOTAL_SOCIALVOLUME_SECRET
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialVolumeWidget)
