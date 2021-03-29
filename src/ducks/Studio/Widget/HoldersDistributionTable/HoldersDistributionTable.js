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
import { useTopHolders } from './hooks'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import ChartWidget from '../ChartWidget'
import styles from './HoldersDistributionTable.module.scss'
import tableStyles from './../../../../components/Tables/TopTokenTransactions/index.module.scss'
import widgetStyles from '../Widget.module.scss'

const { from, to } = getTimeIntervalFromToday(-30, DAY)
const DEFAULT_DATES = [from, to]
const DEFAULT_COUNT = 100

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
  const [holders, loading] = useTopHolders({
    from,
    to,
    count: DEFAULT_COUNT,
    slug
  })

  const [pageSize] = useState(10)

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
            options={{
              sortingSettings: {
                allowSort: true
              },
              stickySettings: { isStickyHeader: true },
              noDataSettings: {
                title: 'No data!'
              },
              paginationSettings: {
                pageSize: pageSize,
                onChangePage: () => {}
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
