import cx from 'classnames'
import React, { useEffect } from 'react'
import Header from './Header'
import ChartPreview from './ChartPreview'
import { Phase } from '../phases'
import { useKeyDown } from '../hooks'
import { SvgNew } from '../../../components/Watchlists/NewWatchlistCard'
import styles from './Overview.module.scss'

const Overview = ({
  widgets,
  currentPhase,
  children,
  selectedMetrics,
  onClose,
  onWidgetClick,
  onNewChartClick,
  useWidgetMessage,
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
            {widgets.map((widget) => (
              <ChartPreview
                key={widget.id}
                widget={widget}
                selectedMetrics={selectedMetrics}
                onClick={onWidgetClick}
                useWidgetMessage={useWidgetMessage}
              />
            ))}
            {currentPhase === Phase.MAPVIEW_SELECTION && (
              <div
                className={cx(styles.item, styles.item_new, styles.idle)}
                onClick={onNewChartClick}
              >
                <SvgNew className={styles.iconNew} />
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
