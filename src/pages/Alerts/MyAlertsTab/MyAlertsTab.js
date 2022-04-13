import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './MyAlertsTab.module.scss'

const Trigger = ({ currentAmount, maxAmount, forwardedRef, isActive, ...props }) => (
  <div
    ref={forwardedRef}
    {...props}
    className={cx(
      styles.badge,
      'btn body-3 row hv-center c-waterloo',
      isActive && styles.badgeHover,
    )}
  >
    <span className={cx(styles.currentAmount, 'c-black')}>{currentAmount}</span>/{maxAmount}
  </div>
)

const MyAlertsTab = ({ alertsRestrictions: { currentAmount, maxAmount } }) => (
  <div className='row hv-center'>
    <div className={cx(styles.tab, 'btn c-casper h4 txt-m')}>My Alerts</div>
    {maxAmount <= 20 && (
      <Tooltip
        passOpenStateAs='isActive'
        trigger={<Trigger currentAmount={currentAmount} maxAmount={maxAmount} />}
        position='bottom'
        className={cx(styles.tooltip, 'border box')}
      >
        <div className='relative column body-3'>
          <span>
            <span className='txt-m'>{currentAmount} alerts</span> created out of {maxAmount}{' '}
            available. To unlock more alerts please
          </span>
          <Link to='/pricing' className={cx(styles.link, 'txt-m')}>
            Update your Plan!
          </Link>
        </div>
      </Tooltip>
    )}
  </div>
)

export default MyAlertsTab
