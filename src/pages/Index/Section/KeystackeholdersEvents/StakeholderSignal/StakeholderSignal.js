import React from 'react'
import cx from 'classnames'
import { READABLE_NAMES } from '../hooks'
import { getDateFormats, getTimeFormats } from '../../../../../utils/dates'
import { millify } from '../../../../../utils/formatting'
import { useProject } from '../../../../../hooks/project'
import styles from './StakeholderSignal.module.scss'
import { TxLinkTo } from '../../../../../components/Tables/TopTokenTransactions/columns'
import WalletLink from '../../../../../components/WalletLink/WalletLink'

function formatDate (date) {
  const { DD, MM, YYYY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)
  return `${DD}.${MM}.${YYYY} ${HH}:${mm}`
}

const MAX_TX_LENGTH = 40

const getShortTx = value => {
  if (value.length < MAX_TX_LENGTH) {
    return value
  }

  return value.slice(0, MAX_TX_LENGTH) + '...'
}
const LINK_SETTINGS = { linkSymbolsCount: 42 }

const StakeholderSignal = ({ data }) => {
  const {
    datetime,
    metadata: { from, to, txHash },
    value,
    signal,
    slug
  } = data

  const [project] = useProject(slug)

  const { ticker } = project || {}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>{READABLE_NAMES[signal] || signal}</div>

        <div className={styles.date}>{formatDate(new Date(datetime))}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          {value && (
            <div className={styles.row}>
              <div className={styles.label}>Token transfer:</div>
              <div className={cx(styles.value, styles.amount)}>
                {millify(value)} {ticker}
              </div>
            </div>
          )}
          {from && (
            <div className={styles.row}>
              <div className={styles.label}>from:</div>
              <div className={styles.value}>
                <WalletLink
                  address={from}
                  assets={[slug]}
                  className={styles.address}
                  settings={LINK_SETTINGS}
                />
              </div>
            </div>
          )}
          {to && (
            <div className={styles.row}>
              <div className={styles.label}>to:</div>
              <div className={styles.value}>
                <WalletLink
                  address={to}
                  assets={[slug]}
                  className={styles.address}
                  settings={LINK_SETTINGS}
                />
              </div>
            </div>
          )}
          {txHash && (
            <div className={styles.row}>
              <div className={styles.label}>Tx hash:</div>
              <div className={styles.value}>
                <TxLinkTo value={txHash} formatter={getShortTx} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.chart} />
      </div>
    </div>
  )
}

export default StakeholderSignal
