import React from 'react'
import { Label, Panel, Icon } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './DashboardPageOnboard.module.scss'

const useShown = () => {
  const [state, setState] = React.useState(
    !localStorage.getItem('isOnboardingHidden')
  )
  if (!state) {
    localStorage.setItem('isOnboardingHidden', '+')
  }

  return [state, () => setState(false)]
}

const Task = ({ title, text, icon, iconClassName, isCompleted }) => (
  <Panel className={styles.task}>
    <div className={styles.task__icon}>
      <Icon type={icon} className={iconClassName} />
    </div>
    <div className={styles.task__title}>{title}</div>
    <div className={styles.task__text}>{text}</div>
    <div
      className={cx(
        styles.task__state,
        isCompleted && styles.task__state_completed
      )}
    >
      <Icon type='checkmark' />
    </div>
  </Panel>
)

const DashboardPageOnboard = () => {
  const [isShown, setShown] = useShown()
  return (
    isShown && (
      <Panel className={styles.wrapper}>
        <Label onClick={setShown} className={styles.skip} accent='casper'>
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
          <Task
            icon='eye'
            title='Create your first watchlist'
            text='You can track your selected assets in one place and check the
          information'
          />

          <Task
            icon='insight-small'
            title='Write the insight'
            text='Try to write your first insight and share people your knowledge about current situation on the market'
          />

          <Task
            icon='signal'
            title='Create the signal'
            text='Set up your signal and begin to receive personalized notifications about any changes on the market'
          />

          <Task
            icon='connection'
            title='Connect Metamask'
            text='By connecting the Metamask you will be able to deposit SAN tokens to your account'
            iconClassName={styles.icon_connection}
            isCompleted
          />
        </div>
      </Panel>
    )
  )
}

export default DashboardPageOnboard
