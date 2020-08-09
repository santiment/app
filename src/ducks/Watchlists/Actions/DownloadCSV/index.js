import React from 'react'
import { CSVLink } from 'react-csv'
import { normalizeCSV } from '../../utils'
import { isNotSafari } from '../../../../utils/utils'

const DownloadCSV = ({ items, name, trigger }) => {
  const hasCSV = isNotSafari && items && items.length > 0

  if (!hasCSV) {
    return null
  }

  return (
    <CSVLink
      data={normalizeCSV(items)}
      filename={`${name}.csv`}
      target='_blank'
    >
      {trigger}
    </CSVLink>
  )
}

export default DownloadCSV
