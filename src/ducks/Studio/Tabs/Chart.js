import React, { useState, useRef } from 'react'
import cx from 'classnames'
import StudioHeader from '../Header'
import StudioChart from '../Chart'
import StudioAdvancedView from '../AdvancedView'
import styles from '../index.module.scss'

const Chart = ({ eventsData, onProjectSelect, ...props }) => {
  const { settings, advancedView } = props

  const chartRef = useRef(null)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDatesRange, setSelectedDatesRange] = useState()

  function changeSelectedDate ({ value }) {
    setSelectedDate(new Date(value))
    setSelectedDatesRange()
  }

  function changeDatesRange ({ value: leftDate }, { value: rightDate }) {
    if (leftDate === rightDate) return

    const [from, to] =
      leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate]

    setSelectedDate()
    setSelectedDatesRange([new Date(from), new Date(to)])
  }

  return (
    <>
      <StudioHeader
        {...props}
        chartRef={chartRef}
        events={eventsData}
        onProjectSelect={onProjectSelect}
      />
      <div className={styles.data}>
        <div className={styles.chart}>
          <StudioChart
            {...props}
            className={styles.canvas}
            chartRef={chartRef}
            events={eventsData}
            changeHoveredDate={changeSelectedDate}
            changeDatesRange={changeDatesRange}
          />
        </div>
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
