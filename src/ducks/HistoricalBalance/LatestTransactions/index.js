import React from 'react'
import { useRecentTransactions, useTransactionProject } from '../hooks'
import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import styles from './index.module.scss'

function formatValue(value, ticker, isSending) {
  const formattedValue = +(value < 1 ? value.toFixed(6) : value.toFixed(2))
  return `${isSending ? '-' : '+'} ${formattedValue} ${ticker}`
}

function getDatetime(datetime) {
  const date = new Date(datetime)
  const { YYYY, MMM, DD } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)

  return `${YYYY}, ${MMM} ${DD}, ${HH}:${mm}:${ss}`
}

const Values = ({ address, slug, value, isSending }) => {
  const { logoUrl, ticker } = useTransactionProject(slug)

  return (
    <>
      <div className={styles.asset}>
        <img alt={ticker} src={logoUrl} className={styles.logo} />{' '}
        {formatValue(value, ticker, isSending)}
      </div>
      <div className={styles.actor}>
        {isSending ? 'to' : 'from'}
        <a className={styles.address} href='/'>
          {address}
        </a>
      </div>
    </>
  )
}

const Row = ({
  address,
  datetime,
  trxHash,
  slug,
  trxValue,
  toAddress,
  fromAddress,
}) => {
  const isSending = address === fromAddress.address
  const anotherAddress = isSending ? toAddress.address : fromAddress.address

  return (
    <tr>
      <td>{getDatetime(datetime)}</td>
      <td>{isSending ? 'Send' : 'Receive'}</td>
      <td>
        <Values
          address={anotherAddress}
          slug={slug}
          value={trxValue}
          isSending={isSending}
        />
      </td>
      <td className={styles.hash}>{trxHash}</td>
    </tr>
  )
}

const LatestTransactions = ({ settings }) => {
  const { address } = settings
  const recentTransactions = useRecentTransactions(settings)

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.header}>
            <th>Time</th>
            <th>Kind of TX</th>
            <th>Values</th>
            <th>Tx hash</th>
          </tr>
          {recentTransactions.map((trx) => (
            <Row key={trx.trxHash} {...trx} address={address} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LatestTransactions
