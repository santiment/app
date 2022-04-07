import React from 'react'
import Button from '@santiment-network/ui/Button'
import ChartSettingsContextMenu, { Icon } from '../../SANCharts/ChartSettingsContextMenu'
import ChartDownloadBtn from '../../SANCharts/ChartDownloadBtn'
import { saveToggle } from '../../../utils/localStorage'
import styles from './ContextMenu.module.scss'

export default ({ MetricNode, setOptions, onDeleteChartClick, ...props }) => {
  const { activeMetrics, data, title, chartRef } = props
<<<<<<< HEAD
  function toggleScale () {
=======
  function toggleScale() {
>>>>>>> master
    setOptions((state) => ({
      ...state,
      isLogScale: !state.isLogScale,
    }))
  }

<<<<<<< HEAD
  function toggleCartesianGrid () {
=======
  function toggleCartesianGrid() {
>>>>>>> master
    setOptions((state) => ({
      ...state,
      isCartesianGridActive: saveToggle('isCartesianGridActive', !state.isCartesianGridActive),
    }))
  }

<<<<<<< HEAD
  function toggleClosestData () {
=======
  function toggleClosestData() {
>>>>>>> master
    setOptions((state) => ({
      ...state,
      isClosestDataActive: saveToggle('isClosestDataActive', !state.isClosestDataActive),
    }))
  }

<<<<<<< HEAD
  function toggleWatermarkLighter () {
=======
  function toggleWatermarkLighter() {
>>>>>>> master
    setOptions((state) => ({
      ...state,
      isWatermarkLighter: saveToggle('isWatermarkLighter', !state.isWatermarkLighter),
    }))
  }

<<<<<<< HEAD
  function toggleWatermarkVisibility () {
=======
  function toggleWatermarkVisibility() {
>>>>>>> master
    setOptions((state) => ({
      ...state,
      isWatermarkVisible: saveToggle('isWatermarkVisible', !state.isWatermarkVisible),
    }))
  }

  return (
    <ChartSettingsContextMenu
      {...props}
      onScaleChange={toggleScale}
      onCartesianGridChange={toggleCartesianGrid}
      onClosestDataChange={toggleClosestData}
      onWatermarkLighterChange={toggleWatermarkLighter}
      onWatermarkVisibilityChange={toggleWatermarkVisibility}
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
        <Button fluid variant='ghost' onClick={onDeleteChartClick} className={styles.delete}>
          <Icon type='remove-small' className={styles.icon} />
          Delete chart
        </Button>
      )}
    </ChartSettingsContextMenu>
  )
}
