import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import cx from 'classnames'
import Sidebar from '../Studio/Sidebar'
import { Metric } from '../dataHub/metrics'
import styles from './index.module.scss'
import ChartWidget from './ChartWidget'
import Overview from './Overview'

const defaultSettings = {
  from: '2019-12-13T21:00:00.000Z',
  interval: '4h',
  projectId: '101605',
  slug: 'santiment',
  ticker: 'SAN',
  timeRange: '6m',
  title: 'Santiment (SAN)',
  to: '2020-06-14T20:59:59.999Z',
}

const Studio = ({ ...props }) => {
  const [widgets, setWidgets] = useState([
    {
      id: Date.now(),
      type: 'CHART',
      Widget: ChartWidget,
      metrics: [Metric.price_usd],
      chartRef: { current: null },
    },
  ])
  const [settings, setSettings] = useState(defaultSettings)
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [widgetMsgMap, setWidgetMsgMap] = useState(new WeakMap())

  function useWidgetMessage(widget, hook) {
    widgetMsgMap.set(widget, hook)
  }

  function sendWidgetMessage(widget, message) {
    /* widgetMsgMap.set(widget, hook) */
    const hook = widgetMsgMap.get(widget)
    if (hook) {
      hook(message)
    }
  }

  function toggleMetric(metric) {
    const newMetrics = new Set(selectedMetrics)

    if (newMetrics.has(metric)) {
      newMetrics.delete(metric)
    } else {
      newMetrics.add(metric)
    }

    setSelectedMetrics([...newMetrics])
  }

  function onClearClick() {
    setSelectedMetrics([])
  }

  function onWidgetClick(widget) {
    const newMetrics = new Set([...widget.metrics, ...selectedMetrics])

    widget.metrics = [...newMetrics]

    setWidgets([...widgets])
  }

  function onNewChartClick() {
    setWidgets([
      ...widgets,
      {
        id: Date.now(),
        type: 'CHART',
        Widget: ChartWidget,
        metrics: [...selectedMetrics],
        chartRef: { current: null },
      },
    ])
  }

  function onOverviewClose() {
    setSelectedMetrics([])
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
          {widgets.map((widget) => (
            <widget.Widget
              key={widget.id}
              settings={settings}
              widget={widget}
              sendWidgetMessage={sendWidgetMessage}
            />
          ))}
        </div>
        {selectedMetrics.length ? (
          <Overview
            widgets={widgets}
            onClose={onOverviewClose}
            onWidgetClick={onWidgetClick}
            onNewChartClick={onNewChartClick}
            useWidgetMessage={useWidgetMessage}
          >
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
          </Overview>
        ) : null}
      </main>
    </div>
  )
}

export default Studio
