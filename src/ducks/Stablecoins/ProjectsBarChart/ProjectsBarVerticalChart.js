import React from 'react'
import cx from 'classnames'
import {
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import { SanWatermark } from './resources'
import {
  getProjectsMarkup,
  renderVerticalLabel,
  VerticalCategoryTick
} from './utils'
import styles from './ProjectsBarChart.module.scss'

const DESKTOP_MARGIN = { top: 20, right: 34, left: 44, bottom: 0 }
const MOBILE_MARGIN = { top: 0, right: 56, left: 44, bottom: 0 }

const ProjectsBarVerticalChart = ({
  isDesktop,
  data,
  dataKey = 'value',
  onProjectClick,
  MetricColor,
  settings: { valueFormatter = v => v } = {}
}) => {
  const markup = getProjectsMarkup({
    MetricColor,
    data,
    dataKey,
    onProjectClick,
    radius: [0, 8, 8, 0],
    labelRenderer: renderVerticalLabel,
    barSize: 40,
    maxBarSize: 40,
    isDesktop
  })

  return (
    <div
      className={cx(styles.chart, styles.verticalChart)}
      style={{
        height: `${data.length * 40}px`
      }}
    >
      <div className={styles.watermark}>{SanWatermark}</div>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          cursor='pointer'
          data={data}
          layout='vertical'
          margin={isDesktop ? DESKTOP_MARGIN : MOBILE_MARGIN}
        >
          {isDesktop && (
            <CartesianGrid horizontal={false} stroke='var(--porcelain)' />
          )}

          <XAxis
            type='number'
            dataKey={dataKey}
            fontSize={10}
            fontWeight={500}
            stroke={'var(--casper)'}
            tickCount={12}
            minTickGap={8}
            interval={0}
            domain={['auto', 'auto']}
            tickLine={false}
            axisLine={isDesktop}
            height={40}
            textAnchor='end'
            verticalAnchor='end'
            tickFormatter={valueFormatter}
          />

          <YAxis
            dataKey='slug'
            type='category'
            domain={['auto', 'auto']}
            tickLine={false}
            axisLine={isDesktop}
            textAnchor='end'
            verticalAnchor='end'
            onClick={onProjectClick}
            tick={props => <VerticalCategoryTick {...props} data={data} />}
          />

          {markup}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProjectsBarVerticalChart
