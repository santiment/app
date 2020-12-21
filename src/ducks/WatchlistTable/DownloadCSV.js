import React from 'react'
import { CSVLink } from 'react-csv'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export const DownloadCSVButton = () => (
  <ExplanationTooltip
    text='Download .csv'
    offsetY={10}
    className={styles.action}
  >
    <Icon type='save' />
  </ExplanationTooltip>
)

export const DownloadCSV = ({ data, name, isLoading, ...props }) => (
  <Button
    filename={`${name}.csv`}
    target='_blank'
    data={data}
    className={styles.csv}
    {...props}
    disabled={data.length === 0 && !isLoading}
    as={CSVLink}
  />
)
DownloadCSV.defaultProps = {
  data: []
}

const DownloadCSVTrigger = props => (
  <DownloadCSV {...props}>
    <DownloadCSVButton />
  </DownloadCSV>
)

export default DownloadCSVTrigger
