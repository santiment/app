import React, { useMemo } from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import SmoothDropdown from '../../SmoothDropdown/SmoothDropdown'
import Table from '../../../ducks/Table'
import { COLUMNS, DEFAULT_SORTING } from './columns'
import styles from './index.module.scss'

const TransactionTable = ({
  header,
  data,
  slug,
  className,
  tableClassName,
  loading
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
          data={data}
          columns={availableColumns}
          options={{
            sortingSettings: {
              defaultSorting: DEFAULT_SORTING,
              allowSort: true
            },
            stickySettings: { isStickyHeader: true },
            loadingSettings: { isLoading: loading, repeatLoading: 6 }
          }}
          className={cx(className, tableClassName)}
        />
      </SmoothDropdown>
    </El>
  )
}

export default TransactionTable
