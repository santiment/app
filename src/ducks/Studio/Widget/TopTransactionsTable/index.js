import React, { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Icon from '@santiment-network/ui/Icon'
import { newWidget } from '../utils'
import Calendar from '../../AdvancedView/Calendar'
import { DAY, getTimeIntervalFromToday } from '../../../../utils/dates'
import HelpPopup from '../../../../components/HelpPopup/HelpPopup'
import TransactionTable from '../../../../components/Tables/TopTokenTransactions'
import { TRANSACTIONS_QUERY } from '../../../../components/Tables/TopTokenTransactions/gql'
import { normalizeTransactionData } from '../../../../pages/Detailed/transactionsInfo/utils'
import { useTableEffects } from './hooks'
import styles from './index.module.scss'
import widgetStyles from '../Widget.module.scss'

const { from, to } = getTimeIntervalFromToday(-30, DAY)
const DEFAULT_DATES = [from, to]
const DEFAULT_SORTED = [
  {
    id: 'value',
    desc: true
  }
]

export function useProjectTopTransactions (slug, from, to) {
  const { data, loading } = useQuery(TRANSACTIONS_QUERY, {
    variables: {
      slug,
      from,
      to
    }
  })

  let result
  if (data) {
    const { tokenTopTransactions, ethTopTransactions } = data.projectBySlug
    result = slug === 'ethereum' ? ethTopTransactions : tokenTopTransactions
  }

  return [result || [], loading]
}

const Header = ({ dates, onCalendarChange, onCloseClick }) => (
  <div className={styles.header}>
    Top Token Transactions
    <Calendar
      className={styles.calendar}
      selectRange
      dates={dates}
      onChange={onCalendarChange}
    />
    <HelpPopup>
      Hold "CTRL" or "CMD", click and move mouse on the chart to select a time
      range
    </HelpPopup>
    <Icon
      type='close-medium'
      className={widgetStyles.close}
      onClick={onCloseClick}
    />
  </div>
)

const TopTransactionsTable = ({ settings: { slug }, ...rest }) => {
  const { onCloseClick, onCalendarChange, dates } = useTableEffects(rest)
  const [from, to] = dates

  const [transactions, loading] = useProjectTopTransactions(slug, from, to)
  const normalizedData = useMemo(
    () => transactions.map(trx => normalizeTransactionData(slug, trx)),
    [transactions]
  )

  return (
    <TransactionTable
      className={widgetStyles.widget_secondary}
      defaultPageSize={50}
      defaultSorted={DEFAULT_SORTED}
      header={
        <Header
          dates={dates}
          onCalendarChange={onCalendarChange}
          onCloseClick={onCloseClick}
        />
      }
      data={normalizedData}
      loading={loading}
      slug={slug}
    />
  )
}

TopTransactionsTable.new = props =>
  newWidget(TopTransactionsTable, {
    datesRange: DEFAULT_DATES,
    ...props
  })

export default TopTransactionsTable
