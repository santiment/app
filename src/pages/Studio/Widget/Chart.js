import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useStore } from '../stores'
import Insights from '../Insights'
import Signals from '../../../ducks/Chart/Signals'
import Calendar from '../../../components/Calendar/Calendar'

const Settings = () => {
  const [target, setTarget] = useState()
  const [dates, setDates] = useState()
  const [maxDate, setMaxDate] = useState()

  useEffect(() => {
    window.mountSettingsCalendar = (target, dates, maxDate) => {
      setTarget(target)
      setDates(dates)
      setMaxDate(maxDate)
    }
    return () => delete window.mountSettingsCalendar
  }, [])

  return target
    ? ReactDOM.createPortal(
        <Calendar
          selectRange
          value={dates}
          maxDate={maxDate}
          onChange={dates => window.setSettingsCalendarDate(dates)}
        />,
        target
      )
    : null
}

const metricsImmute = metrics => metrics.slice()
function useWidgetMetrics (widget) {
  return useStore(widget.Metrics, metricsImmute)
}

const drawerImmute = v => Object.assign({}, v)
const ChartWidget = ({ widget, target, settings, InsightsStore }) => {
  const { isDrawing } = useStore(widget.ChartDrawer, drawerImmute)
  const metrics = useWidgetMetrics(widget)
  const chartContainer = widget.chart && widget.chart.canvas.parentNode

  return (
    <>
      <Insights widget={widget} InsightsStore={InsightsStore} />

      {!isDrawing &&
        chartContainer &&
        ReactDOM.createPortal(
          <Signals
            {...settings}
            metrics={metrics}
            data={[{}]}
            chart={widget.chart}
          />,
          chartContainer
        )}

      <Settings />
    </>
  )
}

export default ChartWidget
