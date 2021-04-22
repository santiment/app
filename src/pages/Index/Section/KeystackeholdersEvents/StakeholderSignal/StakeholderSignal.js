import React from 'react'
import cx from 'classnames'
import { READABLE_EXCHANGE_NAMES, READABLE_NAMES } from '../hooks'
import { getDateFormats, getTimeFormats } from '../../../../../utils/dates'
import { formatNumber, millify } from '../../../../../utils/formatting'
import { useProject } from '../../../../../hooks/project'
import { TxLinkTo } from '../../../../../components/Tables/TopTokenTransactions/columns'
import WalletLink from '../../../../../components/WalletLink/WalletLink'
import StakeholderChartPreview from '../StakeholderChartPreview/StakeholderChartPreview'
import { HARDCODED_EXCHANGE_LINKS } from '../../../../../components/WalletLink/TransactionTableLabels'
import { usdFormatter } from '../../../../../ducks/dataHub/metrics/formatters'
import styles from './StakeholderSignal.module.scss'

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

const ExchangeLink = ({ exchange_name }) => {
  const link = HARDCODED_EXCHANGE_LINKS[exchange_name]
  const label =
    READABLE_EXCHANGE_NAMES[exchange_name] || exchange_name.toLowerCase()

  if (link) {
    return (
      <a
        className={styles.link}
        target='_blank'
        rel='noopener noreferrer'
        href={link}
      >
        {label}
      </a>
    )
  } else {
    return label
  }
}

const StakeholderSignal = ({ data, settings }) => {
  const {
    datetime,
    metadata: {
      exchange_name,
      from,
      to,
      txHash,
      tokenTransferred,
      daysDestroyed,
      prev_ath,
      prev_ath_dt,
      value_usd
    },
    value,
    signal,
    slug,
    project: targetProject
  } = data

  const [project = targetProject] = useProject(!targetProject && slug)
  const { ticker } = project || {}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>{READABLE_NAMES[signal] || signal}</div>

        <div className={styles.date}>{formatDate(new Date(datetime))}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          {exchange_name && (
            <div className={styles.row}>
              <div className={styles.label}>Exchange:</div>
              <div className={styles.value}>
                <ExchangeLink exchange_name={exchange_name} />
              </div>
            </div>
          )}

          {prev_ath && (
            <div className={styles.row}>
              <div className={styles.label}>Previous ATH:</div>
              <div className={styles.value}>
                {formatNumber(prev_ath)}

                {formatDate(new Date(prev_ath_dt))}
              </div>
            </div>
          )}

          {value && (
            <div className={styles.row}>
              <div className={styles.label}>
                {value_usd ? 'Value:' : 'Value USD:'}
              </div>
              {!value_usd ? (
                <div className={styles.value}>{usdFormatter(value)}</div>
              ) : (
                <div className={styles.value}>
                  {millify(value)} {ticker}
                </div>
              )}
            </div>
          )}

          {value_usd && (
            <div className={styles.row}>
              <div className={styles.label}>Value USD:</div>
              <div className={styles.value}>{usdFormatter(value_usd)}</div>
            </div>
          )}

          {daysDestroyed && (
            <div className={styles.row}>
              <div className={styles.label}>Amount of destroyed days:</div>
              <div className={styles.value}>{daysDestroyed}</div>
            </div>
          )}
          {tokenTransferred && (
            <div className={styles.row}>
              <div className={styles.label}>Token transfer:</div>
              <div className={cx(styles.value, styles.amount)}>
                {millify(tokenTransferred)} {ticker}
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
                  priceMetrics={[slug]}
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
                  priceMetrics={[slug]}
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
        <div className={styles.chart}>
          <StakeholderChartPreview
            data={data}
            project={project}
            settings={settings}
          />
        </div>
      </div>
    </div>
  )
}

export default StakeholderSignal
