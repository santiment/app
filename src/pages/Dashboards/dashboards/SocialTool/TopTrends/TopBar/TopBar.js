import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Calendar from '../../../shared/Calendar/Calendar'
import Share from '../../../shared/Share/Share'
import { useSocialDominanceTrendingWords } from '../../hooks'
import styles from './TopBar.module.scss'

const TopBar = ({ setTrendPeriod }) => {
  const { data } = useSocialDominanceTrendingWords()

  return (
    <div className={cx(styles.topBar, 'row v-center justify')}>
      <p className={styles.socDominance}>
        Social dominance SUM:
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
        <Calendar setTrendPeriod={setTrendPeriod} />
        <div className={cx(styles.divider, 'mrg-l mrg--l mrg--r')} />
        <Share id='top_trends_table_share_link' />
      </div>
    </div>
  )
}

export default TopBar
