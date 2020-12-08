import React, { useMemo } from 'react'
import cx from 'classnames'
import ReactTable from 'react-table-6'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import Panel from '@santiment-network/ui/Panel'
import SmoothDropdown from '../../../components/SmoothDropdown/SmoothDropdown'
import { columns } from './columns'
import styles from './DetailedTransactionsTable.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'time',
    desc: true
  }
]

const TransactionTable = ({ header, data, slug, className, ...props }) => {
  const El = useMemo(
    () => {
      return header ? PanelWithHeader : Panel
    },
    [header]
  )

  const availableColumns = useMemo(
    () => {
      if (slug === 'bitcoin') {
        return columns.filter(({ accessor }) => accessor !== 'fromAddress')
      }

      return columns
    },
    [data, slug]
  )

  return (
    <El
      header={header}
      className={cx(styles.wrapper, className)}
      contentClassName={styles.panel}
      headerClassName={styles.header}
    >
      <SmoothDropdown verticalMotion>
        <ReactTable
          minRows={1}
          className={styles.transactionsTable}
          defaultSorted={DEFAULT_SORTED}
          showPagination={false}
          resizable={false}
          loadingText='Loading...'
          {...props}
          data={data}
          columns={availableColumns}
        />
      </SmoothDropdown>
    </El>
  )
}

export default TransactionTable
