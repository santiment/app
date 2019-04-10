import React from 'react'
import { Label, Panel, Icon } from '@santiment-network/ui'
import styles from './DashboardPageOnboard.module.scss'

const DashboardPageOnboard = () => {
  return (
    <Panel className={styles.wrapper}>
      <Label className={styles.skip} accent='casper'>
        Skip for now
      </Label>
      <div className={styles.text}>
        <div className={styles.title}>Great to have you on board!</div>
        <div className={styles.subtitle}>
          You are on your way to better crypto analysis.
          <br />
          Feel free to explore and test our features
        </div>
      </div>
      <div className={styles.tasks}>
        <Panel className={styles.task}>
          <div className={styles.task__icon}>
            <Icon type='eye' />
          </div>
          <div className={styles.task__title}>Create your first watchlist</div>
          <div className={styles.task__text}>
            You can track your selected assets in one place and check the
            information
          </div>
        </Panel>
        <Panel className={styles.task}>
          <div className={styles.task__icon}>
            <Icon type='eye' />
          </div>
          <div className={styles.task__title}>Create your first watchlist</div>
          <div className={styles.task__text}>
            You can track your selected assets in one place and check the
            information
          </div>
        </Panel>
        <Panel className={styles.task}>
          <div className={styles.task__icon}>
            <Icon type='eye' />
          </div>
          <div className={styles.task__title}>Create your first watchlist</div>
          <div className={styles.task__text}>
            You can track your selected assets in one place and check the
            information
          </div>
        </Panel>
        <Panel className={styles.task}>
          <div className={styles.task__icon}>
            <Icon type='eye' />
          </div>
          <div className={styles.task__title}>Create your first watchlist</div>
          <div className={styles.task__text}>
            You can track your selected assets in one place and check the
            information
          </div>
        </Panel>
      </div>
    </Panel>
  )
}

export default DashboardPageOnboard
