import React from 'react'
import {
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import { SanWatermark } from './resources'
import { HorizontalCategoryTick, getProjectsMarkup } from './utils'
import styles from './ProjectsBarChart.module.scss'

const DESKTOP_MARGIN = { top: 20, right: 0, left: -20, bottom: 50 }
const MOBILE_MARGIN = { top: 0, right: 16, left: 0, bottom: 50 }

const ProjectsBarHorizontalChart = ({
  isDesktop,
  data,
  dataKey = 'value',
  onProjectClick,
  MetricColor,
  settings: { valueFormatter = v => v } = {}
}) => {
  const markup = getProjectsMarkup({
    MetricColor,
    data: data,
    dataKey,
    onProjectClick,
    barSize: 40,
    maxBarSize: 40
  })

  return (
    <div className={styles.chart}>
      <div className={styles.watermark}>{SanWatermark}</div>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          cursor='pointer'
          data={data}
          margin={isDesktop ? DESKTOP_MARGIN : MOBILE_MARGIN}
        >
          {isDesktop && (
            <CartesianGrid vertical={false} stroke='var(--porcelain)' />
          )}

          <YAxis
            dataKey={dataKey}
            fontSize={10}
            fontWeight={500}
            stroke={'var(--casper)'}
            tickCount={6}
            tickFormatter={valueFormatter}
            hide={!isDesktop}
          />

          {markup}

          <XAxis
            dataKey={'slug'}
            tick={props => <HorizontalCategoryTick {...props} data={data} />}
            minTickGap={8}
            interval={0}
            domain={['auto', 'auto']}
            tickLine={false}
            axisLine={isDesktop}
            height={40}
            textAnchor='end'
            verticalAnchor='end'
            onClick={onProjectClick}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProjectsBarHorizontalChart
