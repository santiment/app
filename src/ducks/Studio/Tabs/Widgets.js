import React, { useState, useMemo } from 'react'
import StudioHeader from '../Header'
import Sidepanel from '../Chart/Sidepanel'
import { useSyncDateObserver } from '../../Chart/sync'
import { ONE_HOUR_IN_MS } from '../../../utils/dates'
import { usePressedModifier } from '../../../hooks/keyboard'
import styles from './Widgets.module.scss'

const Widget = ({ widget, index, datesRange, ...props }) => (
  <>
    <widget.Widget {...props} widget={widget} index={index} />

    {widget.connectedWidgets.map(connectedWidget => (
      <connectedWidget.Widget
        {...props}
        key={connectedWidget.id}
        widget={connectedWidget}
        parentWidget={widget}
        datesRange={datesRange}
      />
    ))}
  </>
)

const Chart = ({
  settings,
  widgets,
  sidepanel,
  isOverviewOpened,
  setWidgets,
  toggleSidepanel,
  toggleOverview,
  changeTimePeriod,
  onProjectSelect,
  ...props
}) => {
  const [isSelectingRange, setIsSelectingRange] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDatesRange, setSelectedDatesRange] = useState()
  const PressedModifier = usePressedModifier()
  const isSingleWidget = widgets.length === 1
  const onWidgetPointClick = sidepanel ? onPointClick : undefined
  const allMetrics = useMemo(
    () => widgets.map(({ metrics }) => metrics).flat(),
    [widgets]
  )
  const { syncDate, observeSyncDate } = useSyncDateObserver()

  function changeDatesRange (from, to) {
    setSelectedDate()
    setSelectedDatesRange([from, to])
  }

  function onRangeSelect ({ value: leftDate }, { value: rightDate }) {
    setIsSelectingRange(false)
    if (leftDate === rightDate) return

    const dates =
      leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate]
    const from = new Date(dates[0])
    const to = new Date(dates[1])

    if (PressedModifier.cmdKey) {
      return changeDatesRange(from, to)
    }

    if (to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to)
    }
  }

  function onRangeSelectStart () {
    setIsSelectingRange(true)
  }

  function onPointClick ({ value }) {
    setSelectedDate(new Date(value))
    setSelectedDatesRange()
  }

  return (
    <>
      <StudioHeader
        settings={settings}
        widgets={widgets}
        sidepanel={sidepanel}
        metrics={allMetrics}
        isOverviewOpened={isOverviewOpened}
        setWidgets={setWidgets}
        changeTimePeriod={changeTimePeriod}
        toggleSidepanel={toggleSidepanel}
        toggleOverview={toggleOverview}
        onProjectSelect={onProjectSelect}
      />
      <div className={styles.content}>
        <div className={styles.widgets}>
          {widgets.map((widget, index) => (
            <Widget
              {...props}
              key={widget.id}
              index={index}
              widget={widget}
              settings={settings}
              datesRange={selectedDatesRange}
              isSingleWidget={isSingleWidget}
              isSelectingRange={isSelectingRange}
              changeTimePeriod={changeTimePeriod}
              syncTooltips={syncDate}
              observeSyncDate={observeSyncDate}
              onPointClick={onWidgetPointClick}
              onRangeSelect={onRangeSelect}
              onRangeSelectStart={onRangeSelectStart}
            />
          ))}
        </div>

        {sidepanel && (
          <Sidepanel
            className={styles.side}
            project={settings}
            chartSidepane={sidepanel}
            metrics={allMetrics}
            toggleChartSidepane={toggleSidepanel}
            date={selectedDate}
            datesRange={selectedDatesRange}
          />
        )}
      </div>
    </>
  )
}

export default Chart
