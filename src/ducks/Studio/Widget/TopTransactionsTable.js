import React, { useState, useEffect, useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Icon from '@santiment-network/ui/Icon'
import { newWidget } from './utils'
import Calendar from '../AdvancedView/Calendar'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import {
  TransactionTable,
  normalizeTransactionData
} from '../../../pages/Detailed/transactionsInfo/DetailedTransactionsTable'
import styles from './TopTransactionsTable.module.scss'
import widgetStyles from './Widget.module.scss'

const { from, to } = getTimeIntervalFromToday(-30, DAY)
const DEFAULT_DATES = [from, to]

export const TRANSACTIONS_QUERY = gql`
  query projectBySlug($slug: String!, $from: DateTime!, $to: DateTime!) {
    projectBySlug(slug: $slug) {
      id
      tokenTopTransactions(from: $from, to: $to, limit: 50) {
        datetime
        trxValue
        trxHash
        fromAddress {
          address
          isExchange
        }
        toAddress {
          address
          isExchange
        }
      }
    }
  }
`

function useProjectTopTransactions (slug, from, to) {
  const { data, loading } = useQuery(TRANSACTIONS_QUERY, {
    variables: {
      slug,
      from,
      to
    }
  })

  return [data ? data.projectBySlug.tokenTopTransactions : [], loading]
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
      Hold "Shift", click and move mouse on the chart to select a time range
    </HelpPopup>
    <Icon type='close' className={widgetStyles.close} onClick={onCloseClick} />
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
      header={
        <Header
          dates={dates}
          onCalendarChange={onCalendarChange}
          onCloseClick={onCloseClick}
        />
      }
      data={normalizedData}
      loading={loading}
    />
  )
}

TopTransactionsTable.new = props =>
  newWidget(TopTransactionsTable, {
    datesRange: DEFAULT_DATES,
    ...props
  })

export default TopTransactionsTable
