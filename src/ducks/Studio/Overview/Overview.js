import cx from 'classnames'
import React, { useEffect } from 'react'
import Header from './Header'
import ChartPreview from './ChartPreview'
import { Phase } from '../phases'
import { useKeyDown } from '../hooks'
import { Plus } from '../../../components/Illustrations/Plus'
import styles from './Overview.module.scss'

const Overview = ({
  widgets,
  currentPhase,
  children,
  selectedMetrics,
  onClose,
  onWidgetClick,
  onNewChartClick,
  useWidgetMessage
}) => {
  useKeyDown(onClose, 'Escape')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = null
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.sticky}>
        <Header />
        <div className={styles.visible}>
          <div className={styles.grid}>
            {widgets.map(widget => (
              <ChartPreview
                key={widget.id}
                widget={widget}
                currentPhase={currentPhase}
                selectedMetrics={selectedMetrics}
                onClick={onWidgetClick}
                useWidgetMessage={useWidgetMessage}
              />
            ))}
            {currentPhase === Phase.MAPVIEW_SELECTION && (
              <div
                className={cx(styles.item, styles.item_new, styles.idle)}
                onClick={() => onNewChartClick()}
                // NOTE: Not passing `onNewChartClick` as a reference since arguments will be mapped incorrectly [@vanguard | Aug  5, 2020]
              >
                <Plus className={styles.iconNew} />
                Add new chart
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Overview
