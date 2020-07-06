import React from 'react'
import cx from 'classnames'
import ReactTable from 'react-table'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { formatNumber } from '../../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../../utils/dates'
import SmoothDropdown from '../../../components/SmoothDropdown/SmoothDropdown'
import { columns } from './columns'
import styles from './DetailedTransactionsTable.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'time',
    desc: true
  }
]

export function normalizeTransactionData (
  slug,
  { datetime, trxValue, trxHash, fromAddress, toAddress }
) {
  const targetDate = new Date(datetime)
  const { YYYY, MM, DD } = getDateFormats(targetDate)
  const { HH, mm, ss } = getTimeFormats(targetDate)

  return {
    trxHash,
    fromAddress: {
      ...fromAddress,
      assets: [slug, 'ethereum']
    },
    toAddress: {
      ...toAddress,
      assets: [slug, 'ethereum']
    },
    trxValue: formatNumber(trxValue),
    datetime: `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`
  }
}

export const TransactionTable = ({ header, data, className, ...props }) => (
  <PanelWithHeader
    header={header}
    className={cx(styles.wrapper, className)}
    contentClassName={styles.panel}
    headerClassName={styles.header}
  >
    <SmoothDropdown verticalMotion>
      <ReactTable
        {...props}
        data={data}
        columns={columns}
        className={styles.transactionsTable}
        defaultSorted={DEFAULT_SORTED}
        minRows={1}
        showPagination={false}
        resizable={false}
      />
    </SmoothDropdown>
  </PanelWithHeader>
)

const DetailedTopTransactions = ({
  project,
  show = 'ethTopTransactions',
  title = 'Top ETH transactions'
}) => {
  const slug = project.slug || ''
  const data = project[show]
    ? project[show].slice(0, 10).map(trx => normalizeTransactionData(slug, trx))
    : []

  return <TransactionTable header={title} data={data} />
}

export default DetailedTopTransactions
