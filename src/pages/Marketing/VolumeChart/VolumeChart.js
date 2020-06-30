import React, { useRef, useState } from 'react'
import { Query } from 'react-apollo'
import { ALL_PROJECTS_AGGREGATED_QUERY } from '../../Projects/allProjectsGQL'
import { addDays } from '../../../utils/dates'
import PageLoader from '../../../components/Loader/PageLoader'
import ChartProvider from './ChartProvider'
import styles from './VolumeChart.module.scss'
import {metricsToPlotCategories} from "../../../ducks/Chart/Synchronizer";
import Chart from "../../../ducks/SocialTool/Chart/Detailed/Chart";
import {useChartColors} from "../../../ducks/Chart/colors";
import {connect} from "react-redux";
import {updateTooltipSettings} from "../../../ducks/dataHub/tooltipSettings";

const NOW = new Date()

const fakeMetrics = [{
  dataKey: 'aggregatedTimeseriesData',
  key: 'aggregatedTimeseriesData',
  node: 'bar',
  label: 'Price/volume',
}]

const MetricColor = {
  aggregatedTimeseriesData: '#5275ff'
}

updateTooltipSettings(fakeMetrics)

const VolumeChart = ({isNightModeEnabled}) => {
  const [interval, setInterval] = useState(30)

  const variables = {
    from: addDays(NOW, -1 * interval).toISOString(),
    to: NOW.toISOString(),
    metric: 'volume_usd_change_30d'
  }

  const chartRef = useRef(null)

  return <div className={styles.container}>
    <Query query={ALL_PROJECTS_AGGREGATED_QUERY} variables={variables}>
      {(props) => {
        const { data: { allProjects: data = [] } = {}, loading } = props

          const mapped = data.map(item => {
            return {
              ...item,
              index: item.slug
            }
          })

          return (
            <ChartProvider
              data={mapped}
              chartHeight={270}
              resizeDependencies={[]}
              domainGroups={[]}
              chartRef={chartRef}
              tooltipKey='aggregatedTimeseriesData'
              {...categories}
              MetricColor={MetricColor}
              className={styles.chart}
              isCartesianGridActive
            />
          )
        }}
      </Query>
    </div>
  )
}

const mapStateToProps = ({ rootUi: { isNightModeEnabled } }) => ({
  isNightModeEnabled
})

export default connect(mapStateToProps)(VolumeChart)
