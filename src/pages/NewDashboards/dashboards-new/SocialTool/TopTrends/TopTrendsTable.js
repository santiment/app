import React, { useState } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Table from '../../../../../ducks/_Table'
import Share from '../../shared/Share/Share'
import { useTrendingWords } from '../../../../../ducks/TrendsTable/hooks'
import { useColumns } from '../../../../../ducks/_Table/hooks'
import { useSocialDominanceTrendingWords } from '../hooks'
import { COLUMNS } from './TopTrendsColumns'
import styles from './TopTrends.module.scss'
import Calendar from '../../../../../ducks/Studio/AdvancedView/Calendar'
import { checkIsToday } from '../../../../../utils/dates'
import { getTimePeriod } from '../../../../TrendsExplore/utils'

const LINK_SELECTOR = `.${styles.word}`
const MAX_DATE = new Date()

const TopTrendsTable = () => {
  const [trendDate, setTrendDate] = useState([MAX_DATE])
  const [period, setTrendPeriod] = useState()

  const { trendingWords, words, isLoading } = useTrendingWords(period)
  const { data } = useSocialDominanceTrendingWords()
  const columns = useColumns(COLUMNS)

  function onRowClick(_, { target, currentTarget }) {
    if (!target.closest('a')) {
      currentTarget.querySelector(LINK_SELECTOR).click()
    }
  }

  function onTrendCalendarChange(date) {
    setTrendDate([date])
    let period
    if (!checkIsToday(date)) {
      period = getTimePeriod(date)
      period.interval = '1d'
    }
    setTrendPeriod(period)
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.topBar, 'row v-center justify')}>
        <p className={styles.socDominance}>
          Social dominance SUM:{' '}
          <Tooltip
            trigger={
              <span className={cx(styles.sum, 'btn mrg-m mrg--l')}>
                {data ? `${data.toFixed(1)}%` : 0}
              </span>
            }
            position='top'
            className={cx(styles.tooltip, 'border box body-3')}
          >
            <div className='relative row body-3'>
              This metric calculates the social volume for a list of words, and measures what its
              discussion rate is vs. all other topics
            </div>
          </Tooltip>
        </p>
        <div className='row'>
          <Calendar
            dates={trendDate}
            onChange={onTrendCalendarChange}
            className={styles.calendar}
            maxDate={MAX_DATE}
            isFullDate
          />
          <div className={cx(styles.divider, 'mrg-l mrg--l mrg--r')} />
          <Share id='top_trends_table_share_link' />
        </div>
      </div>
      <Table
        className={cx(styles.table)}
        items={trendingWords}
        columns={columns}
        itemKeyProperty='word'
        itemProps={{ words }}
        minRows={10}
        isLoading={isLoading}
        onRowClick={onRowClick}
      />
    </div>
  )
}

export default TopTrendsTable
