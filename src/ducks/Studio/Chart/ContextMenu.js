import React from 'react'
import Button from '@santiment-network/ui/Button'
import ChartSettingsContextMenu, {
  Icon
} from '../../SANCharts/ChartSettingsContextMenu'
import ChartDownloadBtn from '../../SANCharts/ChartDownloadBtn'
import { saveToggle } from '../../../utils/localStorage'
import styles from './ContextMenu.module.scss'

export default ({ MetricNode, setOptions, onDeleteChartClick, ...props }) => {
  const { activeMetrics, data, title, chartRef } = props
  function toggleScale () {
    setOptions(state => ({
      ...state,
      isLogScale: !state.isLogScale
    }))
  }

  function toggleCartesianGrid () {
    setOptions(state => ({
      ...state,
      isCartesianGridActive: saveToggle(
        'isCartesianGridActive',
        !state.isCartesianGridActive
      )
    }))
  }

  function toggleClosestData () {
    setOptions(state => ({
      ...state,
      isClosestDataActive: saveToggle(
        'isClosestDataActive',
        !state.isClosestDataActive
      )
    }))
  }

  function toggleWatermarkLighter () {
    setOptions(state => ({
      ...state,
      isWatermarkLighter: saveToggle(
        'isWatermarkLighter',
        !state.isWatermarkLighter
      )
    }))
  }

  return (
    <ChartSettingsContextMenu
      {...props}
      showNightModeToggle={false}
      showMulti={false}
      onScaleChange={toggleScale}
      onCartesianGridChange={toggleCartesianGrid}
      onClosestDataChange={toggleClosestData}
      onWatermarkLighterChange={toggleWatermarkLighter}
    >
      <ChartDownloadBtn
        fluid
        variant='ghost'
        metrics={activeMetrics}
        data={data}
        title={title}
        chartRef={chartRef}
        MetricNode={MetricNode}
      >
        <Icon type='save' />
        Download as PNG
      </ChartDownloadBtn>

      {onDeleteChartClick && (
        <Button
          fluid
          variant='ghost'
          onClick={onDeleteChartClick}
          className={styles.delete}
        >
          <Icon type='remove-small' className={styles.icon} />
          Delete chart
        </Button>
      )}
    </ChartSettingsContextMenu>
  )
}
