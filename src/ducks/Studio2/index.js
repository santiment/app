import React, { useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Sidebar from '../Studio/Sidebar'
import { Metric } from '../dataHub/metrics'
import styles from './index.module.scss'
import ChartWidget from './ChartWidget'
import ChartPreview from './ChartPreview'
import { SvgNew } from '../../components/Watchlists/NewWatchlistCard'
import { useKeyDown } from './hooks'

const defaultSettings = {
  from: '2019-12-13T21:00:00.000Z',
  interval: '4h',
  projectId: '101605',
  slug: 'santiment',
  ticker: 'SAN',
  timeRange: '6m',
  title: 'Santiment (SAN)',
  to: '2020-06-14T20:59:59.999Z'
}

const Studio = ({ ...props }) => {
  const [widgets, setWidgets] = useState([
    {
      type: 'CHART',
      Widget: ChartWidget,
      metrics: [Metric.price_usd],
      chartRef: { current: null }
    }
  ])
  const [settings, setSettings] = useState(defaultSettings)
  const [selectedMetrics, setSelectedMetrics] = useState([])

  useKeyDown(() => setSelectedMetrics([]), 'Escape')

  function toggleMetric (metric) {
    const newMetrics = new Set(selectedMetrics)

    if (newMetrics.has(metric)) {
      newMetrics.delete(metric)
    } else {
      newMetrics.add(metric)
    }

    setSelectedMetrics([...newMetrics])
  }

  function onClearClick () {
    setSelectedMetrics([])
  }

  function onWidgetClick (widget) {
    const newMetrics = new Set([...widget.metrics, ...selectedMetrics])

    widget.metrics = [...newMetrics]

    setWidgets([...widgets])
  }

  function onNewChartClick () {
    setWidgets([
      ...widgets,
      {
        type: 'CHART',
        Widget: ChartWidget,
        metrics: [...selectedMetrics],
        chartRef: { current: null }
      }
    ])
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar
        slug='bitcoin'
        options={{}}
        activeMetrics={selectedMetrics}
        toggleMetric={toggleMetric}
      />
      <main className={styles.main}>
        <div className={styles.tab}>
          <div className={styles.widget}>
            {widgets.map(({ Widget, metrics, chartRef }) => (
              <Widget
                activeMetrics={metrics}
                settings={settings}
                chartRef={chartRef}
              />
            ))}
          </div>
        </div>
        {selectedMetrics.length ? (
          <div className={styles.overview}>
            <div className={styles.test}>
              {widgets.map((widget, i) => {
                return <ChartPreview widget={widget} onClick={onWidgetClick} />
              })}
              <div
                className={cx(styles.overview__item, styles.overview__item_new)}
                onClick={onNewChartClick}
              >
                <SvgNew />
              </div>

              <div className={styles.selection}>
                You have selected {selectedMetrics.length} metrics
                <Button
                  variant='fill'
                  accent='negative'
                  className={styles.clear}
                  onClick={onClearClick}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default Studio
