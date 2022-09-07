import React, { useState } from 'react'
import cx from 'classnames'
import styles from './MobileTabs.module.scss'

const MobileTabs = ({
  alertsRestrictions: { currentAmount, maxAmount },
  filter,
  explore,
  myAlerts,
}) => {
  const [activeTab, setIsActiveTab] = useState(0)

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
              <div className={cx(styles.btn, 'btn body-2 mrg-s mrg--r')}>
                <span className='c-black'>{currentAmount}</span>/{maxAmount}
              </div>
            )}
            {filter}
          </div>
        )}
      </div>
      <div>{activeTab === 0 ? explore : myAlerts}</div>
    </section>
  )
}

export default MobileTabs
