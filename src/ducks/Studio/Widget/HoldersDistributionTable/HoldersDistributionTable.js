import React, { useState } from 'react'
import cx from 'classnames'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import Icon from '@santiment-network/ui/Icon'
import { DAY, getTimeIntervalFromToday } from '../../../../utils/dates'
import { COLUMNS } from './utils'
import SmoothDropdown from '../../../../components/SmoothDropdown/SmoothDropdown'
import Table from '../../../Table'
import Calendar from '../../AdvancedView/Calendar'
import { useTableEffects } from '../TopTransactionsTable/hooks'
import { useMaxCountTopHolders, useTopHolders } from './hooks'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import ChartWidget from '../ChartWidget'
import styles from './HoldersDistributionTable.module.scss'
import tableStyles from './../../../../components/Tables/TopTokenTransactions/index.module.scss'
import widgetStyles from '../Widget.module.scss'

const PAGE_SIZE_OPTIONS = [10, 25, 50]

const { from, to } = getTimeIntervalFromToday(-30, DAY)
const DEFAULT_DATES = [from, to]

const Header = ({ dates, onCalendarChange, onCloseClick }) => (
  <div className={styles.header}>
    Top Holders
    <div className={styles.header__right}>
      <Calendar
        className={styles.calendar}
        selectRange
        dates={dates}
        onChange={onCalendarChange}
      />
      <Icon
        type='close-medium'
        className={widgetStyles.close}
        onClick={onCloseClick}
      />
    </div>
  </div>
)

const HoldersDistributionTable = ({ settings: { slug }, ...rest }) => {
  const { dates, onCalendarChange, onCloseClick } = useTableEffects(rest)
  const [from, to] = dates
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const [maxAmount] = useMaxCountTopHolders({
    from,
    to,
    slug
  })
  const [holders, loading] = useTopHolders({
    from,
    to,
    page: page + 1,
    pageSize,
    slug
  })

  return (
    <PanelWithHeader
      header={
        <Header
          dates={dates}
          onCalendarChange={onCalendarChange}
          onCloseClick={onCloseClick}
        />
      }
      className={cx(
        tableStyles.wrapper,
        widgetStyles.widget_secondary,
        styles.container
      )}
      contentClassName={cx(tableStyles.panel)}
      headerClassName={styles.panelHeader}
    >
      <Skeleton show={loading} repeat={1} className={styles.skeleton} />
      {!loading && (
        <SmoothDropdown verticalMotion>
          <Table
            data={holders}
            columns={COLUMNS}
            fetchData={({ pageSize }) => {
              setPageSize(pageSize)
            }}
            options={{
              sortingSettings: {
                defaultSorting: [],
                allowSort: true
              },
              stickySettings: { isStickyHeader: true },
              noDataSettings: {
                title: 'No data!'
              },
              paginationSettings: {
                pageSize: pageSize,
                pageIndex: page,
                onChangePage: pageIndex => {
                  setPage(pageIndex)
                },
                pageSizeOptions: PAGE_SIZE_OPTIONS,
                controlledPageCount: Math.ceil(maxAmount / pageSize),
                manualPagination: true
              }
            }}
            className={widgetStyles.widget_secondary}
            classes={{
              pagination: styles.pagination,
              table: styles.table,
              header: styles.table__header,
              headerColumn: styles.table__header__column
            }}
          />
        </SmoothDropdown>
      )}
    </PanelWithHeader>
  )
}

HoldersDistributionTable.new = props =>
  ChartWidget.new(
    {
      datesRange: DEFAULT_DATES,
      mergedMetrics: [],
      metrics: [],
      ...props
    },
    HoldersDistributionTable
  )

export default HoldersDistributionTable
