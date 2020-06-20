import React, { useState, useRef } from 'react'
import cx from 'classnames'
import StudioHeader from '../../Studio/Header'
import Sidepanel from '../../Studio/Chart/Sidepane'
import { SPENT_COIN_COST } from '../../Studio/Chart/Sidepane/panes'
import { ONE_HOUR_IN_MS } from '../../../utils/dates'
import styles from '../index.module.scss'

const Chart = ({
  eventsData,
  onProjectSelect,
  widgets,
  sidepanel,
  toggleSidepanel,
  ...props
}) => {
  const { settings, changeTimePeriod } = props
  const [syncedTooltipDate, syncTooltips] = useState()
  const [isSelectingRange, setIsSelectingRange] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDatesRange, setSelectedDatesRange] = useState()
  const chartRef = useRef(null)

  const isSingleWidget = widgets.length === 1
  const onWidgetPointClick = sidepanel ? onPointClick : undefined

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

    if (sidepanel === SPENT_COIN_COST) {
      return changeDatesRange(from, to)
    }

    if (to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to)
    }
  }

  function onRangeSelectStart() {
    setIsSelectingRange(true)
  }

  function onPointClick({ value }) {
    setSelectedDate(new Date(value))
    setSelectedDatesRange()
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
              isSelectingRange={isSelectingRange}
              syncedTooltipDate={syncedTooltipDate}
              syncTooltips={syncTooltips}
              onPointClick={onWidgetPointClick}
              onRangeSelect={onRangeSelect}
              onRangeSelectStart={onRangeSelectStart}
            />
          ))}
        </div>

        {/* <div className={styles.side}>123</div> */}
        {sidepanel && (
          <Sidepanel
            className={styles.side}
            chartSidepane={sidepanel}
            metrics={widgets.reduce(
              (acc, widget) => [...acc, ...widget.metrics],
              [],
            )}
            toggleChartSidepane={toggleSidepanel}
            date={selectedDate}
            datesRange={selectedDatesRange}
          />
        )}
        {/* </div>
            </div> */}

        {/* {advancedView && (
          <div className={cx(styles.canvas, styles.advanced)}>
            <StudioAdvancedView
              {...props}
              {...settings}
              date={selectedDate}
              datesRange={selectedDatesRange}
            />
          </div>
        )}
      */}
      </div>
    </>
  )
}

export default Chart
