import React from 'react'
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import { ProjectsChartTooltip } from '../../../SANCharts/tooltip/CommonChartTooltip'
import ColorsExplanation, { COLOR_MAPS } from './ColorsExplanation'
import NoDataCharts from './NoDataCharts'
import { useProjectRanges, useWithColors } from './hooks'
import { getTooltipLabels, INFOGRAPHICS, tooltipLabelFormatter } from './utils'
import CustomizedTreeMapContent from './CustomizedTreeMapContent'
import {
  InfographicTitleRanges,
  PriceInfographicTitleRanges,
  useInfographicRanges
} from './InfographicTitles'
import styles from './ProjectsChart.module.scss'

export const ProjectsTreeMap = ({
  listId,
  ranges,
  className,
  title,
  settings,
  onChangeSettings,
  sortByMetric,
  type,
  assets
}) => {
  const { currency: defaultCurrency } = settings
  const { currentRanges, currency, setCurrency } = useInfographicRanges({
    onChangeSettings,
    type,
    ranges,
    defaultCurrency
  })

  const isSocialVolume = type === INFOGRAPHICS.SOCIAL_VOLUME_TREE_MAP

  const {
    data,
    loading,
    intervalIndex,
    setIntervalIndex,
    label,
    key
  } = useProjectRanges({
    listId,
    ranges: currentRanges,
    isSocialVolume,
    settings,
    onChangeSettings,
    sortByMetric,
    type,
    assets
  })
  const noData = !loading && data.length === 0
  const colored = useWithColors(data, key)

  return (
    <div className={className}>
      <div className={styles.title}>
        {isSocialVolume ? (
          <InfographicTitleRanges
            type='Treemap'
            setIntervalIndex={setIntervalIndex}
            ranges={currentRanges}
            label={label}
            intervalIndex={intervalIndex}
            title={title}
          />
        ) : (
          <PriceInfographicTitleRanges
            title={title}
            type='Treemap'
            intervalIndex={intervalIndex}
            label={label}
            ranges={currentRanges}
            setIntervalIndex={setIntervalIndex}
            currency={currency}
            setCurrency={setCurrency}
          />
        )}
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
