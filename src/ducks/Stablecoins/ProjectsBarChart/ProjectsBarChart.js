import React, { useCallback, useMemo } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import { millify } from '../../../utils/formatting'
import { useChartColors } from '../../Chart/colors'
import styles from './ProjectsBarChart.module.scss'

const renderCustomizedLabel = props => {
  const { x, y, width, value, fill } = props

  const fontSize = width < 20 ? 7 : 14
  const position = +value >= 0 ? -1 * (fontSize / 2) : fontSize

  return (
    <g>
      <text
        x={x + width / 2}
        y={y + position}
        fill={fill}
        textAnchor='middle'
        fontSize={fontSize}
        fontWeight={500}
      >
        {millify(+value)}
      </text>
    </g>
  )
}

const PREDEFINED_COLORS = {
  tether: '#50AF95',
  'gemini-dollar': '#00DCFA',
  'binance-usd': '#F0B90B'
}

const ProjectsBarChart = ({ data, dataKey, redirect }) => {
  const onProjectClick = useCallback(
    data => {
      const { value } = data
      return redirect(`/projects/${value}`)
    },
    [redirect]
  )

  const fakeMetrics = useMemo(
    () => {
      return data.map(item => ({
        key: item.slug
      }))
    },
    [data]
  )

  const MetricColor = useChartColors(fakeMetrics, PREDEFINED_COLORS)

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          cursor='pointer'
          data={data}
          margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke='var(--porcelain)' />

          <YAxis
            dataKey={dataKey}
            fontSize={10}
            fontWeight={500}
            stroke={'var(--casper)'}
            tickCount={6}
            tickFormatter={val => `${millify(val)} %`}
          />

          <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
            <LabelList dataKey={dataKey} content={renderCustomizedLabel} />
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={MetricColor[entry.slug]}
                  onClick={() => onProjectClick({ value: entry.slug })}
                />
              )
            })}
          </Bar>

          <XAxis
            dataKey={'slug'}
            tick={CategoryTick}
            minTickGap={0}
            interval={0}
            domain={['auto', 'auto']}
            tickLine={false}
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

const CategoryTick = props => {
  const {
    x,
    y,
    payload: { value }
  } = props
  return (
    <foreignObject x={x - 15} y={y} width={30} height={30}>
      <ProjectIcon slug={value} size={30} />
    </foreignObject>
  )
}

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ProjectsBarChart)
