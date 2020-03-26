import React, { useState, useRef } from 'react'
import cx from 'classnames'
import StudioHeader from './Header'
import StudioChart from './Chart'
import StudioAdvancedView from './AdvancedView'
import StudioInfo from '../SANCharts/Header'
import styles from './index.module.scss'

const Main = ({ topSlot, bottomSlot, eventsData, onSlugChange, ...props }) => {
  const { settings, advancedView, setSettings, setIsICOPriceDisabled } = props
  const chartRef = useRef(null)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDatesRange, setSelectedDatesRange] = useState()

  function onProjectSelect (project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings(state => ({ ...state, slug, title, projectId, ticker }))
    setIsICOPriceDisabled(false)
    onSlugChange(slug)
  }

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
      <div className={styles.header}>
        {topSlot}
        <StudioInfo
          slug={settings.slug}
          isLoading={false}
          isLoggedIn={false}
          onSlugSelect={onProjectSelect}
        />
      </div>
      <div className={cx(styles.container, styles.content)}>
        <StudioHeader {...props} chartRef={chartRef} events={eventsData} />
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
      </div>
      {bottomSlot}
    </>
  )
}

export default Main
