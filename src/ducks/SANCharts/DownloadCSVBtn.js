import React from 'react'
import { CSVLink } from 'react-csv'
import Button from '@santiment-network/ui/Button'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import { mergeTimeseries } from '../Studio/timeseries/utils'

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

  const headers = [
    { label: 'Date', key: 'datetime' },
    ...activeMetrics
      .concat(activeEvents)
      .map(({ label, key, dataKey = key }) => ({
        label,
        key: dataKey
      }))
  ]

  const mergedData = mergeTimeseries([data, events]).map(item => ({
    ...item,
    datetime: new Date(item.datetime).toISOString()
  }))

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
