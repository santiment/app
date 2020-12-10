import React, { useMemo } from 'react'
import cx from 'classnames'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import Panel from '@santiment-network/ui/Panel'
import SmoothDropdown from '../../../components/SmoothDropdown/SmoothDropdown'
import { COLUMNS, DEFAULT_SORTING } from './columns'
import Table from '../../../ducks/Table'
import styles from './DetailedTransactionsTable.module.scss'

const TransactionTable = ({
  header,
  data,
  slug,
  className,
  tableClassName,
  ...props
}) => {
  const El = useMemo(
    () => {
      return header ? PanelWithHeader : Panel
    },
    [header]
  )

  const availableColumns = useMemo(
    () => {
      if (slug === 'bitcoin') {
        return COLUMNS.filter(({ accessor }) => accessor !== 'fromAddress')
      }

      return COLUMNS
    },
    [data, slug]
  )

  return (
    <El
      header={header}
      className={cx(styles.wrapper, className)}
      contentClassName={styles.panel}
    >
      <SmoothDropdown verticalMotion>
        <Table
          className={cx(className, tableClassName)}
          data={data}
          columns={availableColumns}
          options={{
            withSorting: true,
            initialState: { sortBy: DEFAULT_SORTING },
            isStickyHeader: true
          }}
        />
      </SmoothDropdown>
    </El>
  )
}

export default TransactionTable
