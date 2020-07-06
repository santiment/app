import React, { useState, useEffect } from 'react'
import { Query } from 'react-apollo'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { ALL_PROJECTS_PRICE_CHANGES_QUERY } from '../../Projects/allProjectsGQL'
import PageLoader from '../../../components/Loader/PageLoader'
import ChartTooltip from '../../../ducks/SANCharts/tooltip/CommonChartTooltip'
import Range from '../../../components/WatchlistOverview/Range'
import styles from './ProjectsChart.module.scss'

const RANGES = [
  {
    label: '1h',
    key: 'percentChange1h'
  },
  {
    label: '24h',
    key: 'percentChange24h'
  },
  {
    label: '7d',
    key: 'percentChange7d'
  }
]

const ProjectsChart = ({ assets }) => {
  const [mapAssets, setMapAssets] = useState({})

  useEffect(
    () => {
      const newMap = {}

      assets.forEach(({ slug }) => {
        newMap[slug] = true
      })

      setMapAssets(newMap)
    },
    [assets]
  )

  const [intervalIndex, setIntervalIndex] = useState(1)

  const { label, key } = RANGES[intervalIndex]

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>Bar chart: Price changes, %</div>
        <div className={styles.selector}>
          <Range
            range={label}
            changeRange={() => {
              setIntervalIndex((intervalIndex + 1) % RANGES.length)
            }}
          />
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <Query query={ALL_PROJECTS_PRICE_CHANGES_QUERY}>
          {props => {
            const { data: { allProjects: data = [] } = {}, loading } = props

            if (loading) {
              return <PageLoader />
            }

            const mapped = data
              .filter(({ slug }) => {
                return mapAssets[slug]
              })
              .map(item => ({
                ...item,
                [key]: +item[key]
              }))

            return (
              <div className={styles.chart}>
                <ResponsiveContainer width='100%' height='100%'>
                  <ComposedChart
                    data={mapped}
                    margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid vertical={false} stroke='var(--athens)' />

                    <YAxis
                      dataKey={key}
                      axisLine={false}
                      tickLine={false}
                      fontSize={10}
                      stroke={'var(--casper)'}
                    />

                    <Bar dataKey={key} fill='var(--dodger-blue)' />

                    <XAxis
                      dataKey='slug'
                      minTickGap={0}
                      interval={mapped.length > 100 ? 'preserveStartEnd' : 0}
                      domain={['auto', 'auto']}
                      axisLine={false}
                      tickLine={false}
                      angle={-90}
                      height={135}
                      fontSize={12}
                      textAnchor='end'
                      verticalAnchor='end'
                      stroke={'var(--fiord)'}
                    />

                    <Tooltip
                      content={
                        <ChartTooltip
                          className={styles.tooltip}
                          labelFormatter={data => {
                            return data
                          }}
                          valueFormatter={({ value }) => {
                            return value + ' %'
                          }}
                          showValueLabel={false}
                        />
                      }
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )
          }}
        </Query>
      </div>
    </div>
  )
}

export default ProjectsChart
