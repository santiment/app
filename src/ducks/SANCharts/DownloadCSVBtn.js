import React from 'react'
import { CSVLink } from 'react-csv'
import Button from '@santiment-network/ui/Button'
import PropTypes from 'prop-types'
import { getDateFormats, getTimeFormats } from '../../utils/dates'

const DownloadCSVBtn = ({ metrics, chartData, title, ...props }) => {
  const date = new Date()
  const { DD, MMM, YYYY } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)
  const filename = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].csv`

  const headers = [
    { label: 'Date', key: 'datetime' },
    ...metrics.map(({ label, key, dataKey = key }) => ({
      label,
      key: dataKey
    }))
  ]

  return (
    <Button
      filename={filename}
      headers={headers}
      data={chartData}
      {...props}
      as={CSVLink}
    />
  )
}

DownloadCSVBtn.defaultProps = {
  title: '',
  metrics: [],
  chartData: []
}

DownloadCSVBtn.propTypes = {
  title: PropTypes.string,
  metrics: PropTypes.array,
  chartData: PropTypes.array
}

export default DownloadCSVBtn
