import React, { useState, useRef } from 'react'
import cx from 'classnames'
import StudioHeader from '../../Studio/Header'
import StudioAdvancedView from '../../Studio/AdvancedView'
import { ONE_HOUR_IN_MS } from '../../../utils/dates'
import styles from '../index.module.scss'
import MetricExplanation from './MetricExplanation'
import Sidepanel from '../../Studio/Chart/Sidepane'

const Chart = ({
  eventsData,
  onProjectSelect,
  widgets,
  sidepanel,
  toggleSidepanel,
  ...props
}) => {
  const { settings, options, advancedView, changeTimePeriod } = props

  const [syncedTooltipDate, syncTooltips] = useState()
  const [isSelectingRange, setIsSelectingRange] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDatesRange, setSelectedDatesRange] = useState()
  const [isMetricExplanationOpened] = useState(false)
  const chartRef = useRef(null)

  const isSingleWidget = widgets.length === 1

  function changeSelectedDate({ value }) {
    setSelectedDate(new Date(value))
    setSelectedDatesRange()
  }

  function changeDatesRange(from, to) {
    setSelectedDate()
    setSelectedDatesRange([from, to])
  }

  function onRangeSelect({ value: leftDate }, { value: rightDate }) {
    setIsSelectingRange(false)
    if (leftDate === rightDate) return

    const dates =
      leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate]
    const from = new Date(dates[0])
    const to = new Date(dates[1])

    if (advancedView === 'Spent Coin Cost') {
      return changeDatesRange(from, to)
    }

    if (to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to)
    }
  }

  function onRangeSelectStart() {
    setIsSelectingRange(true)
  }

  return (
    <>
      <StudioHeader
        {...props}
        chartRef={chartRef}
        events={eventsData}
        sidepanel={sidepanel}
        toggleSidepanel={toggleSidepanel}
        onProjectSelect={onProjectSelect}
      />
      {/* <div
          className={cx(
          styles.data,
          options.isMultiChartsActive && styles.data_multicharts,
          )}
          > */}
      <div className={styles.content}>
        <div className={styles.widgets}>
          {/* <div className={styles.chart}>
            <div className={styles.tab}> */}
          {widgets.map((widget) => (
            <widget.Widget
              {...props}
              key={widget.id}
              settings={settings}
              widget={widget}
              isSingleWidget={isSingleWidget}
              syncedTooltipDate={syncedTooltipDate}
              syncTooltips={syncTooltips}
            />
          ))}
        </div>

        {/* <div className={styles.side}>123</div> */}
        {sidepanel && (
          <Sidepanel
            className={styles.side}
            chartSidepane={sidepanel}
            MetricColor={{}}
            metrics={widgets.reduce(
              (acc, widget) => [...acc, ...widget.metrics],
              [],
            )}
            toggleChartSidepane={toggleSidepanel}
            //setMetrics={() => {}}
          />
        )}
        {/* </div>
            </div> */}
        {advancedView && (
          <div className={cx(styles.canvas, styles.advanced)}>
            <StudioAdvancedView
              {...props}
              {...settings}
              date={selectedDate}
              datesRange={selectedDatesRange}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Chart
