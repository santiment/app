import React from 'react'
import { CSVLink } from 'react-csv'
import Button from '@santiment-network/ui/Button'
import PropTypes from 'prop-types'
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
  metrics,
  chartData,
  title,
  events,
  eventsData,
  ...props
}) => {
  const date = new Date()
  const { DD, MMM, YYYY } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)
  const filename = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].csv`

  const [eventHeaders, eventsDataWithAnomalies] = getEventsWithAnomaly(
    events,
    eventsData
  )

  const headers = [
    { label: 'Date', key: 'datetime' },
    ...metrics.concat(eventHeaders).map(({ label, key, dataKey = key }) => ({
      label,
      key: dataKey
    }))
  ]

  return (
    <Button
      filename={filename}
      headers={headers}
      data={mergeTimeseriesByKey({
        timeseries: [chartData, eventsDataWithAnomalies]
      })}
      {...props}
      as={CSVLink}
    />
  )
}

DownloadCSVBtn.defaultProps = {
  title: '',
  metrics: [],
  events: [],
  chartData: [],
  eventsData: []
}

DownloadCSVBtn.propTypes = {
  title: PropTypes.string,
  metrics: PropTypes.array,
  chartData: PropTypes.array
}

export default DownloadCSVBtn
