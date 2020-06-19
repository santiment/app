import React from 'react'
import Button from '@santiment-network/ui/Button'
import ChartSettingsContextMenu, {
  Icon,
} from '../../SANCharts/ChartSettingsContextMenu'
import { saveToggle } from '../../../utils/localStorage'
import styles from './ContextMenu.module.scss'

export default ({ setOptions, onDeleteChartClick, ...props }) => {
  function toggleMultichart() {
    setOptions((state) => ({
      ...state,
      isMultiChartsActive: saveToggle(
        'isMultiChartsActive',
        !state.isMultiChartsActive,
      ),
    }))
  }

  function toggleScale() {
    setOptions((state) => ({
      ...state,
      isLogScale: !state.isLogScale,
    }))
  }

  function toggleCartesianGrid() {
    setOptions((state) => ({
      ...state,
      isCartesianGridActive: saveToggle(
        'isCartesianGridActive',
        !state.isCartesianGridActive,
      ),
    }))
  }

  function toggleClosestData() {
    setOptions((state) => ({
      ...state,
      isClosestDataActive: saveToggle(
        'isClosestDataActive',
        !state.isClosestDataActive,
      ),
    }))
  }

  return (
    <ChartSettingsContextMenu
      onCartesianGridChange={toggleCartesianGrid}
      onScaleChange={toggleScale}
      onMultiChartsChange={toggleMultichart}
      onClosestDataChange={toggleClosestData}
      {...props}
    >
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
