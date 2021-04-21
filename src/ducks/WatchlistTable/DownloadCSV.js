import React, { useState, useRef } from 'react'
import cx from 'classnames'
import { CSVLink } from 'react-csv'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export const DownloadCSVButton = () => (
  <ExplanationTooltip
    text='Download .csv'
    offsetY={10}
    className={styles.explanation}
  >
    <Icon type='save' />
  </ExplanationTooltip>
)

const AsyncButton = ({ watchlist, downloadData, ...props }) => {
  const csvEl = useRef(null)
  const [data, setData] = useState([])

  const fetchData = () => {
    downloadData().then(data => {
      setData(data.assets)
      csvEl.current.link.click()
    })
  }

  return (
    <>
      <Button
        className={cx(styles.action, styles.action_csv)}
        onClick={fetchData}
        {...props}
      />
      <CSVLink filename={`${watchlist.name}.csv`} data={data} ref={csvEl} />
    </>
  )
}

export const DownloadCSV = ({ watchlist, data, downloadData, ...props }) =>
  downloadData ? (
    <AsyncButton watchlist={watchlist} downloadData={downloadData} {...props} />
  ) : (
    <Button
      filename={`${watchlist.name}.csv`}
      target='_blank'
      data={data}
      className={cx(styles.action, styles.action_csv)}
      {...props}
      disabled={data.length === 0}
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
