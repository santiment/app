import React from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'
import Range from '../WatchlistOverview/WatchlistAnomalies/Range'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import { ProjectsChartTooltip } from '../../../SANCharts/tooltip/CommonChartTooltip'
import ColorsExplanation, { COLOR_MAPS } from './ColorsExplanation'
import NoDataCharts from './NoDataCharts'
import ScreenerChartTitle from './ScreenerChartTitle'
import { useProjectRanges, useWithColors } from './hooks'
import {
  getTooltipLabels,
  PRICE_CHANGE_RANGES,
  tooltipLabelFormatter
} from './utils'
import CustomizedTreeMapContent from './CustomizedTreeMapContent'
import styles from './ProjectsChart.module.scss'

export const ProjectsMapWrapper = ({
  listId,
  ranges,
  className,
  title,
  isSocialVolume = false,
  settings,
  onChangeInterval,
  sortByMetric
}) => {
  const {
    data,
    loading,
    intervalIndex,
    setIntervalIndex,
    label,
    key
  } = useProjectRanges({
    listId,
    ranges,
    isSocialVolume,
    settings,
    onChangeInterval,
    sortByMetric
  })

  return (
    <ProjectsTreeMap
      ranges={ranges}
      className={className}
      title={title}
      data={data}
      loading={loading}
      intervalIndex={intervalIndex}
      setIntervalIndex={setIntervalIndex}
      label={label}
      dataKey={key}
    />
  )
}

const ProjectsTreeMap = ({
  ranges,
  className,
  title,
  data,
  loading,
  intervalIndex,
  setIntervalIndex,
  label,
  dataKey: key
}) => {
  const noData = !loading && data.length === 0

  const colored = useWithColors(data, key)

  return (
    <div className={className}>
      <div className={styles.title}>
        <ScreenerChartTitle type='Treemap' title={`${title}, %`} />
        <Range
          className={styles.selector}
          range={label}
          changeRange={() => {
            setIntervalIndex(
              ranges.length === 1
                ? 0
                : (intervalIndex + 1) % PRICE_CHANGE_RANGES.length
            )
          }}
        />
      </div>

      {/* NOTE(@haritonasty) 14.12.2020: check on loading because of firefox bug with skeleton in block */}
      {loading && (
        <>
          <Skeleton
            className={styles.treeMap__skeletonTop}
            show={loading}
            repeat={1}
          />
          <Skeleton
            className={styles.treeMap__skeletonBottom}
            show={loading}
            repeat={1}
          />
        </>
      )}
      {noData ? (
        <div className={styles.noDataTreeMap}>
          <NoDataCharts />
        </div>
      ) : !loading ? (
        <div className={styles.treeMap}>
          <ResponsiveContainer width='100%' height='100%'>
            <Treemap
              data={colored}
              dataKey={'marketcapUsd'}
              fill='var(--jungle-green)'
              isAnimationActive={false}
              content={<CustomizedTreeMapContent dataKey={key} />}
            >
              <Tooltip
                offset={5}
                allowEscapeViewBox={{
                  x: false,
                  y: true
                }}
                content={
                  <ProjectsChartTooltip
                    className={styles.treemapTooltip}
                    labelFormatter={tooltipLabelFormatter}
                    payloadLabels={getTooltipLabels({ key, label: title })}
                  />
                }
              />
            </Treemap>
          </ResponsiveContainer>

          <ColorsExplanation colorMaps={COLOR_MAPS} range={label} />
        </div>
      ) : null}
    </div>
  )
}
