import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import Icon from '@santiment-network/ui/Icon'
import DropdownDevider from './DropdownDevider'
import * as actions from '../../actions/types'
import {
  calculateTrialDaysLeft,
  checkIsActiveSubscription,
  ProductNameById
} from '../../utils/plans'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import { useTheme } from '../../stores/ui/theme'
import { useUser } from '../../stores/user'
import {
  useUserSubscriptions,
  useUserSubscriptionStatus
} from '../../stores/user/subscriptions'
import styles from './NavbarProfileDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'

const personalLinks = [
  { as: Link, to: '/sonar/my-signals', children: 'My alerts' },
  { as: Link, to: '/assets', children: 'My watchlists' },
  {
    as: 'a',
    href: 'https://insights.santiment.net/my',
    children: 'My insights'
  }
]

const LOGGED_IN_LINKS_1 = [
  { to: '/account', children: 'Account settings', as: Link }
]

const LOGGED_IN_LINKS_2 = [
  {
    to: '/logout',
    as: Link,
    className: styles.logout,
    children: (
      <>
        <Icon type='logout' className={styles.logout__icon} /> Log out
      </>
    )
  }
]

const LinkBuilder = (props, index) => {
  const { className } = props
  return (
    <Button
      variant='ghost'
      key={index}
      fluid
      className={cx(dropdownStyles.item, className)}
      {...props}
    />
  )
}

const ProductSubscription = ({
  trialEnd,
  plan: {
    name,
    product: { id }
  }
}) => {
  const daysLeft = trialEnd && calculateTrialDaysLeft(trialEnd)
  const trial =
    daysLeft &&
    ` (trial - ${daysLeft === 1 ? 'last day' : `${daysLeft} days left`})`

  return (
    <div>
      <span className={styles.productName}>{ProductNameById[id]}: </span>
      {name} plan
      {trial}
    </div>
  )
}

const SubscriptionsList = () => {
  const { loading, subscriptions } = useUserSubscriptions()

  const activeSubscriptions = useMemo(
    () =>
      subscriptions ? subscriptions.filter(checkIsActiveSubscription) : [],
    [subscriptions]
  )

  return (
    <div className={styles.plan}>
      {loading
        ? 'Loading...'
        : activeSubscriptions.map(subscription => (
          <ProductSubscription key={subscription.id} {...subscription} />
        ))}
    </div>
  )
}

export const NavbarProfileDropdown = ({
  activeLink,
  toggleNightMode,
  isUpdateAvailable
}) => {
  const { user } = useUser()
  const { isPro } = useUserSubscriptionStatus()
  const { isNightMode } = useTheme()

  return (
    <div className={cx(styles.wrapper, !user && styles.login)}>
      {user && (
        <div className={styles.profile}>
          <Link className={styles.name} to={`/profile/${user.id}`}>
            {user.username || user.email}
          </Link>
          <SubscriptionsList />
          {isPro || (
            <UpgradeBtn
              variant='flat'
              accent='orange'
              className={styles.upgrade}
            />
          )}
        </div>
      )}
      <DropdownDevider />
      <Button
        fluid
        variant='ghost'
        className={cx(styles.setting, dropdownStyles.item, styles.nightMode)}
        onClick={toggleNightMode}
      >
        Night mode <Toggle isActive={isNightMode} />
      </Button>
      <DropdownDevider />
      {user && (
        <>
          <div className={dropdownStyles.list}>
            {personalLinks.map(LinkBuilder)}
          </div>
          <DropdownDevider />
        </>
      )}
      <div className={dropdownStyles.list}>
        <Button
          variant='ghost'
          fluid
          className={dropdownStyles.item}
          to='/labs'
          as={Link}
        >
          Labs
        </Button>

        {user && LOGGED_IN_LINKS_1.map(LinkBuilder)}

        {isUpdateAvailable && (
          <Button
            variant='ghost'
            fluid
            accent='positive'
            className={cx(dropdownStyles.item, dropdownStyles.updateBtn)}
            onClick={() => window.location.reload(true)}
          >
            Update available. Restart now
          </Button>
        )}

        {user && LOGGED_IN_LINKS_2.map(LinkBuilder)}

        {!user && (
          <Button
            variant='ghost'
            fluid
            as={Link}
            className={dropdownStyles.item}
            to='/login'
            isActive={activeLink === '/login'}
          >
            Create an account
          </Button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ rootUi, user, app }) => ({
  status: rootUi.isOnline ? 'online' : 'offline',
  isUpdateAvailable: app.isUpdateAvailable
})

const mapDispatchToProps = dispatch => ({
  toggleNightMode: () => dispatch({ type: actions.USER_TOGGLE_NIGHT_MODE })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarProfileDropdown)
