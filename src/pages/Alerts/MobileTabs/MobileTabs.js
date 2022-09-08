import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import AlertRestrictionMessage from '../AlertRestrictionMessage/AlertRestrictionMessage'
import styles from './MobileTabs.module.scss'

const MobileTabs = ({
  alertsRestrictions: { currentAmount, maxAmount, shouldHideRestrictionMessage },
  filter,
  explore,
  myAlerts,
}) => {
  const [activeTab, setIsActiveTab] = useState(0)
  const [isOpen, setOpen] = useState(false)

  function handleChangeActiveTab(tab) {
    setIsActiveTab(tab)
  }

  return (
    <section className={cx(styles.wrapper, 'relative')}>
      <div className={cx(styles.toolbar, 'row v-center justify fluid')}>
        <div className='row v-center'>
          <button
            className={cx(styles.btn, 'btn body-2 mrg-m mrg--r', activeTab === 0 && styles.active)}
            onClick={() => handleChangeActiveTab(0)}
          >
            Explore
          </button>
          <button
            className={cx(styles.btn, 'btn body-2', activeTab === 1 && styles.active)}
            onClick={() => handleChangeActiveTab(1)}
          >
            My Alerts
          </button>
        </div>
        {activeTab === 1 && (
          <div className='row v-center'>
            {maxAmount <= 20 && (
              <Dialog
                open={isOpen}
                title='My Alerts'
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                trigger={
                  <button className={cx(styles.btn, 'btn body-2 mrg-s mrg--r')}>
                    <span className='c-black'>{currentAmount}</span>/{maxAmount}
                  </button>
                }
                classes={{
                  title: cx(styles.title, 'txt-m'),
                }}
              >
                <div className={cx(styles.upgradeWrapper, 'column justify')}>
                  <p className='body-2'>
                    <span className='txt-b'>{currentAmount} alerts</span> created out of {maxAmount}{' '}
                    available. To unlock more alerts please upgrade your plan!
                  </p>
                  <Link
                    to='/pricing'
                    className={cx(
                      styles.link,
                      'btn-1 btn--orange row hv-center fluid body-2 txt-m',
                    )}
                  >
                    Upgrade the plan
                  </Link>
                </div>
              </Dialog>
            )}
            {filter}
          </div>
        )}
      </div>
      {!shouldHideRestrictionMessage && activeTab === 1 && <AlertRestrictionMessage />}
      <div>{activeTab === 0 ? explore : myAlerts}</div>
    </section>
  )
}

export default MobileTabs
