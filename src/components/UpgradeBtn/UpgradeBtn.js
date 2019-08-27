import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import { Query } from 'react-apollo'
import Plans from '../Plans/Plans'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import styles from './UpgradeBtn.module.scss'

const Trigger = ({ variant, className, children = 'Upgrade', ...props }) => (
  <Button
    className={cx(styles.btn, styles[variant], className)}
    accent='orange'
    {...props}
  >
    <Icon type='crown' className={styles.icon} />
    {children}
  </Button>
)

// NOTE(vanguard): redux passes "dispatch" prop to the component.
// We should capture it in order to not assign it as a invalid dom attribute
const UpgradeBtn = ({ isLoggedIn, isUserLoading, dispatch, ...props }) => {
  if (isUserLoading) {
    return null
  }

  if (!isLoggedIn) {
    return <Trigger as={Link} to='/login' {...props} />
  }

  return (
    <Query query={USER_SUBSCRIPTIONS_QUERY}>
      {({ data: { currentUser }, loading }) => {
        const subscription = getCurrentSanbaseSubscription(currentUser)

        if (loading || subscription) {
          return null
        }

        return (
          <Dialog
            classes={styles}
            title='Plan upgrade'
            trigger={<Trigger {...props} />}
          >
            <Dialog.ScrollContent>
              <Plans />
            </Dialog.ScrollContent>
          </Dialog>
        )
      }}
    </Query>
  )
}

const mapStateToProps = state => {
  return {
    isUserLoading: state.user.isLoading,
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default connect(mapStateToProps)(UpgradeBtn)
