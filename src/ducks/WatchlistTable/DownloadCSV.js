import React, { useState, useRef } from 'react'
import cx from 'classnames'
import { CSVLink } from 'react-csv'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import ProPopupWrapper from '../../components/ProPopup/Wrapper'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

const cb = () => {}

export const DownloadCSVButton = () => (
  <ExplanationTooltip
    text='Download .csv'
    offsetY={10}
    className={styles.explanation}
  >
    <Icon type='save' />
  </ExplanationTooltip>
)

function renameFields (assets, activeColumns) {
  const labels = {}
  activeColumns.forEach(column => (labels[column.key] = column.label))
  assets.forEach((asset, index) => {
    const keys = Object.keys(asset)
    keys.forEach(key => {
      const label = labels[key]
      if (label) {
        const value = assets[index][key]
        delete assets[index][key]
        assets[index][label] = value
      }
    })
  })
}

const AsyncButton = ({ watchlist, downloadData, activeColumns, ...props }) => {
  const csvEl = useRef(null)
  const [data, setData] = useState([])

  const fetchData = () => {
    downloadData().then(data => {
      renameFields(data.assets, activeColumns)
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

export const DownloadCSV = ({ watchlist, data, downloadData, ...props }) => {
  const { isPro } = useUserSubscriptionStatus()

  if (!isPro) {
    return (
      <Button
        className={cx(styles.action, styles.action_csv)}
        {...props}
        onClick={cb}
      />
    )
  } else {
    return downloadData ? (
      <AsyncButton
        watchlist={watchlist}
        downloadData={downloadData}
        {...props}
      />
    ) : (
      <Button
        filename={`${watchlist.name}.csv`}
        target='_blank'
        data={data}
        className={cx(styles.action, styles.action_csv)}
        {...props}
        disabled={!isPro}
        as={CSVLink}
      />
    )
  }
}

DownloadCSV.defaultProps = {
  data: []
}

const DownloadCSVTrigger = ({ type, ...props }) => (
  <ProPopupWrapper type={type} className={styles.proWrapper}>
    <DownloadCSV {...props}>
      <DownloadCSVButton />
    </DownloadCSV>
  </ProPopupWrapper>
)

export default DownloadCSVTrigger
