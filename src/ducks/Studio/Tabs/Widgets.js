import React, { useState, useMemo } from 'react'
import StudioHeader from '../Header'
import Sidepanel from '../Chart/Sidepanel'
import { useSyncDateObserver } from '../../Chart/sync'
import { newRenderQueue, withRenderQueueProvider } from '../../renderQueue/sized'
import { ONE_HOUR_IN_MS } from '../../../utils/dates'
import { usePressedModifier } from '../../../hooks/keyboard'
import styles from './Widgets.module.scss'

const RANGE_SELECT_SENSITIVITY = 7

const Widget = ({ widget, index, datesRange, ...props }) => {
  return (
    <>
      <widget.Widget {...props} widget={widget} index={index} />

      {widget.connectedWidgets.map((connectedWidget) => (
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
}

const Widgets = ({
  settings,
  widgets,
  sidepanel,
  shortUrlHashState,
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
  const onWidgetPointClick = sidepanel ? onPointMouseUp : undefined
  const allMetrics = useMemo(() => widgets.map(({ metrics }) => metrics).flat(), [widgets])
  const { syncDate, observeSyncDate } = useSyncDateObserver()

  function changeDatesRange (from, to) {
    setSelectedDate()
    setSelectedDatesRange([from, to])
  }

  function onRangeSelected ({ x: x1, value: leftDate }, { x: x2, value: rightDate }) {
    setIsSelectingRange(false)
    if (leftDate === rightDate) return

    const dates = leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate]
    const from = new Date(dates[0])
    const to = new Date(dates[1])

    if (PressedModifier.cmdKey) {
      return changeDatesRange(from, to)
    }

    if (Math.abs(x2 - x1) > RANGE_SELECT_SENSITIVITY && to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to)
    }
  }

  function onRangeSelecting () {
    setIsSelectingRange(true)
  }

  function onPointMouseUp ({ value }) {
    if (isSelectingRange) return

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
        shortUrlHash={shortUrlHashState && shortUrlHashState[0]}
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
              onPointMouseUp={onWidgetPointClick}
              onRangeSelected={onRangeSelected}
              onRangeSelecting={onRangeSelecting}
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

export default withRenderQueueProvider(Widgets, newRenderQueue(2))
