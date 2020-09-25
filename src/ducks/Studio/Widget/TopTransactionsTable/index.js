import React, { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Icon from '@santiment-network/ui/Icon'
import { TRANSACTIONS_QUERY } from './gql'
import { newWidget } from '../utils'
import Calendar from '../../AdvancedView/Calendar'
import { DAY, getTimeIntervalFromToday } from '../../../../utils/dates'
import HelpPopup from '../../../../components/HelpPopup/HelpPopup'
import TransactionTable from '../../../../pages/Detailed/transactionsInfo/TransactionTable'
import { normalizeTransactionData } from '../../../../pages/Detailed/transactionsInfo/utils'
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

const TopTransactionsTable = ({
  widget,
  parentWidget,
  settings: { slug },
  datesRange,
  rerenderWidgets,
  deleteConnectedWidget
}) => {
  const [dates, setDates] = useState(widget.datesRange)
  const [from, to] = dates
  const [transactions, loading] = useProjectTopTransactions(slug, from, to)
  const normalizedData = useMemo(
    () => transactions.map(trx => normalizeTransactionData(slug, trx)),
    [transactions]
  )

  useEffect(
    () => {
      if (datesRange) {
        const newRange = [new Date(datesRange[0]), new Date(datesRange[1])]
        newRange[0].setHours(0, 0, 0, 0)
        newRange[1].setHours(23, 59, 59, 999)
        onCalendarChange(newRange)
      }
    },
    [datesRange]
  )

  function onCalendarChange (newDates) {
    widget.datesRange = newDates
    setDates(newDates)
    rerenderWidgets()
  }

  function onCloseClick () {
    deleteConnectedWidget(widget, parentWidget)
  }

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
