import React, { useState } from 'react'
import cx from 'classnames'
import debounce from 'lodash.debounce'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import { newWidget } from '../utils'
import { DAY, getTimeIntervalFromToday } from '../../../../utils/dates'
import { COLUMNS } from './utils'
import SmoothDropdown from '../../../../components/SmoothDropdown/SmoothDropdown'
import Table from '../../../Table'
import Calendar from '../../AdvancedView/Calendar'
import { useTableEffects } from '../TopTransactionsTable/hooks'
import { useTopHolders } from './hooks'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import styles from './HoldersDistributionTable.module.scss'
import tableStyles from './../../../../components/Tables/TopTokenTransactions/index.module.scss'
import widgetStyles from '../Widget.module.scss'

const { from, to } = getTimeIntervalFromToday(-30, DAY)
const DEFAULT_DATES = [from, to]
const DEFAULT_COUNT = 10

const Header = ({ dates, onCalendarChange, onCloseClick, count, setCount }) => (
  <div className={styles.header}>
    Top Holders
    <Calendar
      className={styles.calendar}
      selectRange
      dates={dates}
      onChange={onCalendarChange}
    />
    <Input
      type='number'
      onChange={e => {
        setCount(+e.target.value)
      }}
      defaultValue={count}
      className={styles.count}
    />
    <Icon
      type='close-medium'
      className={widgetStyles.close}
      onClick={onCloseClick}
    />
  </div>
)

const HoldersDistributionTable = ({ settings: { slug }, ...rest }) => {
  const [count, setCount] = useState(DEFAULT_COUNT)
  const { dates, onCalendarChange, onCloseClick } = useTableEffects(rest)
  const [from, to] = dates
  const [holders, loading] = useTopHolders({ from, to, count, slug })

  const setCountDebounced = debounce(value => {
    setCount(value)
  }, 500)

  return (
    <PanelWithHeader
      header={
        <Header
          dates={dates}
          onCalendarChange={onCalendarChange}
          onCloseClick={onCloseClick}
          count={count}
          setCount={setCountDebounced}
        />
      }
      className={cx(
        tableStyles.wrapper,
        widgetStyles.widget_secondary,
        styles.container
      )}
      contentClassName={tableStyles.panel}
    >
      <Skeleton show={loading} repeat={1} className={styles.skeleton} />
      {!loading && (
        <SmoothDropdown verticalMotion>
          <Table
            data={holders}
            columns={COLUMNS}
            options={{
              sortingSettings: {
                allowSort: false
              },
              stickySettings: { isStickyHeader: true }
            }}
            className={widgetStyles.widget_secondary}
          />
        </SmoothDropdown>
      )}
    </PanelWithHeader>
  )
}

HoldersDistributionTable.new = props =>
  newWidget(HoldersDistributionTable, {
    datesRange: DEFAULT_DATES,
    ...props
  })

export default HoldersDistributionTable
