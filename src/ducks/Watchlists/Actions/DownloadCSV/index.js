import React from 'react'
import { CSVLink } from 'react-csv'
import Button from '@santiment-network/ui/Button'
import { normalizeCSV } from '../../utils'
import { isNotSafari } from '../../../../utils/utils'

const DownloadCSV = ({ items, name, ...props }) => {
  const hasCSV = isNotSafari && items && items.length > 0

  if (!hasCSV) {
    return null
  }

  return (
    <Button
      filename={`${name}.csv`}
      target='_blank'
      data={normalizeCSV(items)}
      {...props}
      as={CSVLink}
    />
  )
}

export default DownloadCSV
