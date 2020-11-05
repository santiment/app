import React from 'react'
import { CSVLink } from 'react-csv'
import Button from '@santiment-network/ui/Button'
import { normalizeCSV } from '../../utils'

const DownloadCSV = ({ items = [], name, isLoading, ...props }) => (
  <Button
    filename={`${name}.csv`}
    target='_blank'
    data={normalizeCSV(items)}
    {...props}
    disabled={items.length === 0 && !isLoading}
    as={CSVLink}
  />
)

export default DownloadCSV
