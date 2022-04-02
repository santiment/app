import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './MyAlertsTab.module.scss'

const MyAlertsTab = ({ alertsRestrictions: { currentAmount, maxAmount } }) => (
  <div className='row hv-center'>
    <div className={cx(styles.tab, 'btn c-casper')}>My Alerts</div>
    {maxAmount <= 20 && (
      <Tooltip
        trigger={
          <div
            className={cx(styles.badge, 'btn body-3 row hv-center c-waterloo')}
          >
            <span className={cx(styles.currentAmount, 'c-black')}>
              {currentAmount}
            </span>
            /{maxAmount}
          </div>
        }
        position='bottom'
        className={styles.tooltip}
      >
        <div className={cx(styles.tooltip__content, 'column body-3')}>
          <span>
            <span className='txt-m'>{currentAmount} alerts</span> created out of{' '}
            {maxAmount} available. To unlock more alerts please
          </span>
          <Link to='/pricing' className={cx(styles.link, 'txt-m')}>
            Update your Plan.
          </Link>
        </div>
      </Tooltip>
    )}
  </div>
)

export default MyAlertsTab
