import React from 'react'
import { useRecentTransactions, useTransactionProject } from '../hooks'
import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import { FluidSkeleton as Skeleton } from '../../../components/Skeleton'
import styles from './index.module.scss'

function formatValue (value, ticker, isSending) {
  const formattedValue = +(value < 1 ? value.toFixed(6) : value.toFixed(2))
  return `${isSending ? '-' : '+'} ${formattedValue} ${ticker}`
}

function getDatetime (datetime) {
  const date = new Date(datetime)
  const { YYYY, MMM, DD } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)

  return `${YYYY}, ${MMM} ${DD}, ${HH}:${mm}:${ss}`
}

const Row = ({
  address,
  datetime,
  trxHash,
  slug,
  trxValue,
  toAddress,
  fromAddress
}) => {
  const { logoUrl, ticker } = useTransactionProject(slug)
  const isSending = address === fromAddress.address
  const anotherAddress = isSending ? toAddress.address : fromAddress.address

  return (
    <tr>
      <td>{getDatetime(datetime)}</td>
      <td>{isSending ? 'Send' : 'Receive'}</td>
      <td className={styles.values}>
        <div className={styles.asset}>
          <img alt={ticker} src={logoUrl} className={styles.logo} />{' '}
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
      </td>
      <td className={styles.hash}>
        <a
          href={`https://etherscan.io/tx/${address}`}
          rel='noopener noreferrer'
          target='_blank'
          className={styles.link}
        >
          {trxHash}
        </a>
      </td>
    </tr>
  )
}

const LatestTransactions = ({ settings }) => {
  const { address } = settings
  const { recentTransactions, isLoading } = useRecentTransactions(settings)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.header}>
              <th>Time</th>
              <th>Kind of TX</th>
              <th>Values</th>
              <th>Tx hash</th>
            </tr>
            {recentTransactions.map(trx => (
              <Row key={trx.trxHash} {...trx} address={address} />
            ))}
          </tbody>
        </table>
        <Skeleton show={isLoading} className={styles.skeleton} />
      </div>
    </div>
  )
}

export default LatestTransactions
