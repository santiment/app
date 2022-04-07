import React from 'react'
import { prepareColumns } from '../../_Table'
import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import { ProjectIcon } from '../../../components/ProjectIcon/ProjectIcon'
import Labels from '../../WatchlistAddressesTable/Labels'
import styles from './index.module.scss'

const trxValueFormatter = new Intl.NumberFormat('en')

function formatValue (value, ticker, isSending) {
  const formattedValue = trxValueFormatter.format(
    +(value < 1 ? value.toFixed(6) : value.toFixed(2)),
  )
  return `${isSending ? '-' : '+'} ${formattedValue} ${ticker || 'unknown asset'}`
}

function getDatetime (datetime) {
  const date = new Date(datetime)
  const { YYYY, MMM, DD } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)

  return `${YYYY}, ${MMM} ${DD}, ${HH}:${mm}:${ss}`
}

const checkIsSending = (address, fromAddress) => address === fromAddress.address

const Values = ({ address, project, toAddress, fromAddress, trxValue, asset }) => {
  const { logoUrl, darkLogoUrl, ticker } = asset || project || {}
  const isSending = checkIsSending(address, fromAddress)
  const anotherAddress = isSending ? toAddress.address : fromAddress.address

  return (
    <>
      <div className={styles.asset}>
        <ProjectIcon darkLogoUrl={darkLogoUrl} logoUrl={logoUrl} className={styles.logo} />{' '}
        {formatValue(trxValue, ticker, isSending)}
      </div>
      <div className={styles.actor}>
        {isSending ? 'to' : 'from'}
        <a
          className={styles.address}
          href={`/labs/balance?address=${anotherAddress}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {anotherAddress}
        </a>
      </div>
    </>
  )
}

const AddressLabels = ({ address, toAddress, fromAddress }) => {
  const isSending = checkIsSending(address, fromAddress)
  const anotherAddressLabels = isSending ? toAddress.labels : fromAddress.labels

  return <Labels labels={anotherAddressLabels} />
}

export const COLUMNS = prepareColumns([
  {
    title: 'Time',
    render: ({ datetime }) => getDatetime(datetime),
  },
  {
    title: 'Kind of TX',
    render: ({ fromAddress }, { address }) =>
      checkIsSending(address, fromAddress) ? 'Send' : 'Receive',
  },
  {
    title: 'Values',
    className: styles.values,
    render: (transaction, { address, asset }) => (
      <Values {...transaction} address={address} asset={asset} />
    ),
  },
  {
    title: 'Labels',
    className: styles.values,
    render: (transaction, { address }) => <AddressLabels {...transaction} address={address} />,
  },
  {
    title: 'Tx hash',
    className: styles.hash,
    render: ({ trxHash }) => (
      <a
        href={`https://etherscan.io/tx/${trxHash}`}
        rel='noopener noreferrer'
        target='_blank'
        className={styles.link}
      >
        {trxHash}
      </a>
    ),
  },
])
