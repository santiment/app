import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Calendar from '../../../shared/Calendar/Calendar'
import Share from '../../../shared/Share/Share'
import { getSocialDominanceSum } from '../../../../../../ducks/TrendsTable/utils'
import styles from './TopBar.module.scss'

const TopBar = ({ setTrendPeriod, dominance }) => {
  const dominanceSum = dominance && getSocialDominanceSum(dominance)

  return (
    <div className={cx(styles.topBar, 'row v-center justify')}>
      <p className={styles.socDominance}>
        Social dominance SUM:
        <Tooltip
          trigger={
            <span className={cx(styles.sum, 'btn mrg-m mrg--l')}>
              {dominanceSum ? `${dominanceSum.toFixed(1)}%` : 0}
            </span>
          }
          position='top'
          className={cx(styles.tooltip, 'border box body-3')}
        >
          <div className='relative row body-3'>
            Current discussion percentage of top 10 keywords compared to all keywords on crypto
            platforms.
          </div>
        </Tooltip>
      </p>
      <div className='row'>
        <Calendar setTrendPeriod={setTrendPeriod} />
        <div className={cx(styles.divider, 'mrg-l mrg--l mrg--r')} />
        <Share id='top_trends_table_share_link' feature='dashboard' source='dashboards' />
      </div>
    </div>
  )
}

export default TopBar
