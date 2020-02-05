import React from 'react'
import { CSVLink } from 'react-csv'
import Button from '@santiment-network/ui/Button'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import { mergeTimeseriesByKey } from '../../utils/utils'
import { Metrics } from './data'

const getEventsWithAnomaly = (headers, data) => {
  const anomaly = data.find(({ metricAnomalyKey }) => metricAnomalyKey)

  if (!anomaly) {
    return [headers, data]
  }

  const newHeaders = headers.slice()

  newHeaders.push({
    label: `${Metrics[anomaly.metricAnomalyKey].label} Anomaly`,
    key: 'metricAnomalyKey'
  })

  const newData = data.map(event =>
    event.metricAnomalyKey
      ? {
        ...event,
        metricAnomalyKey: true
      }
      : event
  )
  return [newHeaders, newData]
}

const DownloadCSVBtn = ({
  title,
  data,
  events,
  activeMetrics,
  activeEvents,
  ...props
}) => {
  const date = new Date()
  const { DD, MMM, YYYY } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)
  const filename = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].csv`

  let headers = []
  let mergedData = []

  try {
    const [eventHeaders, eventsDataWithAnomalies] = getEventsWithAnomaly(
      events,
      activeEvents
    )

    headers = [
      { label: 'Date', key: 'datetime' },
      ...activeMetrics
        .concat(eventHeaders)
        .map(({ label, key, dataKey = key }) => ({
          label,
          key: dataKey
        }))
    ]

    mergedData = mergeTimeseriesByKey({
      timeseries: [data, eventsDataWithAnomalies]
    })
  } catch (e) {
    return null
  }

  return (
    <Button
      filename={filename}
      headers={headers}
      data={mergedData}
      {...props}
      as={CSVLink}
    />
  )
}

DownloadCSVBtn.defaultProps = {
  title: '',
  activeMetrics: [],
  activeEvents: [],
  data: [],
  events: []
}

export default DownloadCSVBtn
