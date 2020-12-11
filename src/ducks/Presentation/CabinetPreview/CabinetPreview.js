import React, { useState } from 'react'
import cx from 'classnames'
import { ProLabel } from '../../../components/ProLabel'
import Toggle from '../../../components/VisibilityIndicator/Toggle'
import Guide from '../Guide/Guide'
import Cabinet from '../Cabinet/Cabinet'
import styles from './CabinetPreview.module.scss'

const TABS = {
  GUIDE: 0,
  CABINET: 1
}

const TOGGLE_KEY = 'CABINET-TOGGLE-KEY'

const updateState = () => localStorage.getItem(TOGGLE_KEY) === 'true'

const CabinetPreview = () => {
  const [tab, setTab] = useState(TABS.CABINET)

  const [hidden, setHidden] = useState(updateState)

  function toggle () {
    const newValue = !hidden
    setHidden(newValue)

    localStorage.setItem(TOGGLE_KEY, newValue)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={cx(styles.tab, tab === TABS.CABINET && styles.active)}
          onClick={() => setTab(TABS.CABINET)}
        >
          Cabinet
          <ProLabel className={styles.pro} />
        </div>

        <Toggle isActive={!hidden} className={styles.toggle} onClick={toggle} />
      </div>

      {!hidden && (
        <div className={styles.content}>
          {tab === TABS.GUIDE && <Guide />}
          {tab === TABS.CABINET && <Cabinet />}
        </div>
      )}
    </div>
  )
}

export default CabinetPreview
