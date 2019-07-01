import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Link from 'react-router-dom/es/Link'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import { getOnboardingCompletedTasks } from './utils'
import NewWatchlistDialog from '../../components/Watchlists/NewWatchlistDialog'
import Task from './Task'
import Image from './hand.svg'
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

const ConditionalWrapper = ({ linkTo, children }) => (
  <>
    {linkTo ? (
      <Link to={linkTo} className={styles.default}>
        {children}
      </Link>
    ) : (
      children
    )}
  </>
)

const DashboardPageOnboard = ({ hasMetamask, hasWatchlist }) => {
  const [isShown, setShown] = useShown()
  const completedTasks = getOnboardingCompletedTasks()
  return (
    isShown && (
      <Panel className={styles.wrapper}>
        <Label onClick={setShown} className={styles.skip} accent='waterloo'>
          Skip for now
        </Label>
        <div className={styles.top}>
          <img
            src={Image}
            alt='hello icon'
            width='60'
            height='60'
            className={styles.hand}
          />
          <div className={styles.text}>
            <h4 className={styles.title}>Great to have you on board!</h4>
            <div className={styles.subtitle}>
              You are on your way to better crypto analysis
            </div>
          </div>
        </div>
        <div className={styles.tasks}>
          <NewWatchlistDialog
            trigger={
              <Button
                className={cx(styles.button, styles.default)}
                disabled={completedTasks.includes('watchlist')}
              >
                <Task
                  icon='eye'
                  title='Create your first watchlist'
                  text='You can track your selected assets in one place and check it’s status'
                  isCompleted={
                    completedTasks.includes('watchlist') || hasWatchlist
                  }
                />
              </Button>
            }
            watchlists={[]}
          />
          <ConditionalWrapper linkTo={hasMetamask ? '' : '/account'}>
            <Task
              icon='connection'
              title='Connect Metamask'
              text='By connecting the Metamask you will be able to deposit SAN tokens to your account'
              iconClassName={styles.connection}
              isCompleted={hasMetamask}
            />
          </ConditionalWrapper>
        </div>
      </Panel>
    )
  )
}

const mapStateToProps = ({ watchlistUi: { firstWatchlistCreated } }) => ({
  hasWatchlist: firstWatchlistCreated
})

export default connect(mapStateToProps)(DashboardPageOnboard)
