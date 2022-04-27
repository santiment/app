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
  ProductNameById,
  STATUSES,
} from '../../utils/plans'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import { useTheme } from '../../stores/ui/theme'
import { useUser } from '../../stores/user'
import { useUserSubscriptions, useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { VersionLabel } from '../Version/Version'
import { APP_STATES } from '../../ducks/Updates/reducers'
import { isHalloweenDay } from '../../utils/halloween'
import ContactUs from '../ContactUs/ContactUs'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import dropdownStyles from './NavbarDropdown.module.scss'
import styles from './NavbarProfileDropdown.module.scss'

const MAX_STR_LENGTH = 28

const personalLinks = [
  { as: Link, to: '/alerts?tab=1', children: 'My alerts' },
  { as: Link, to: '/assets', children: 'My watchlists' },
  {
    as: 'a',
    href: 'https://insights.santiment.net/my',
    children: 'My insights',
  },
]

const LOGGED_IN_LINKS_1 = [{ to: '/account', children: 'Account settings', as: Link }]

const LOGGED_IN_LINKS_2 = [
  {
    to: '/logout',
    as: Link,
    className: styles.logout,
    children: (
      <>
        <Icon type='logout' className={styles.logout__icon} /> Log out
      </>
    ),
  },
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
  status,
  plan: {
    name,
    product: { id },
  },
}) => {
  const daysLeft = status === STATUSES.TRIALING && trialEnd && calculateTrialDaysLeft(trialEnd)
  const trial = daysLeft && ` (trial - ${daysLeft === 1 ? 'last day' : `${daysLeft} days left`})`

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
    () => (subscriptions ? subscriptions.filter(checkIsActiveSubscription) : []),
    [subscriptions],
  )

  if (activeSubscriptions && activeSubscriptions.length === 0) {
    return null
  }

  return (
    <div className={styles.plan}>
      {loading
        ? 'Loading...'
        : activeSubscriptions.map((subscription) => (
            <ProductSubscription key={subscription.id} {...subscription} />
          ))}
    </div>
  )
}

export const NavbarProfileDropdown = ({ activeLink, toggleNightMode, appVersionState }) => {
  const { user } = useUser()
  const { isPro } = useUserSubscriptionStatus()
  const { isNightMode } = useTheme()

  const trimString = (str) =>
    str.length < MAX_STR_LENGTH ? str : str.substring(0, MAX_STR_LENGTH) + '...'

  return (
    <div className={cx(styles.wrapper, !user && styles.login)}>
      {user && (
        <div className={styles.profile}>
          <Link className={styles.userInfoWrapper} to={`/profile/${user.id}`}>
            <UserAvatar
              as='div'
              userId={user.id}
              externalAvatarUrl={user.avatarUrl}
              classes={styles}
            />
            <div className={styles.infoWrapper}>
              <div className={styles.name}>
                {user.name ? trimString(user.name) : 'No full name'}
              </div>
              <div className={styles.username}>
                {user.username ? trimString(`@${user.username}`) : 'No username'}
              </div>
            </div>
          </Link>
          <SubscriptionsList />
          {isPro || <UpgradeBtn variant='flat' accent='orange' className={styles.upgrade} />}
        </div>
      )}

      <DropdownDevider />

      {appVersionState && (
        <>
          <div className={dropdownStyles.list}>
            {appVersionState === APP_STATES.LATEST && (
              <div className={styles.version}>
                You have the latest version!
                <VersionLabel className={styles.versionLabel} />
              </div>
            )}
            {appVersionState === APP_STATES.NEW_AVAILABLE && (
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
          </div>

          <DropdownDevider />
        </>
      )}

      {user && (
        <>
          <div className={dropdownStyles.list}>
            {personalLinks.map(LinkBuilder)}
            <Button
              as='a'
              href='https://insights.santiment.net/new'
              className={styles.newInsight}
              accent='positive'
              variant='fill'
            >
              Write Insight
            </Button>
          </div>
          <DropdownDevider />
        </>
      )}
      <div className={cx(dropdownStyles.list, dropdownStyles.listBottom)}>
        <Button
          fluid
          variant='ghost'
          className={cx(styles.setting, dropdownStyles.item, styles.nightMode)}
          onClick={toggleNightMode}
        >
          {isHalloweenDay() ? 'Halloween ' : 'Night '} mode <Toggle isActive={isNightMode} />
        </Button>

        <Button variant='ghost' fluid className={dropdownStyles.item} to='/labs' as={Link}>
          Labs
        </Button>

        {user && LOGGED_IN_LINKS_1.map(LinkBuilder)}

        <ContactUs variant='ghost' fluid className={dropdownStyles.item} />

        {user && LOGGED_IN_LINKS_2.map(LinkBuilder)}

        {!user && (
          <Button
            variant='ghost'
            fluid
            as={Link}
            className={dropdownStyles.item}
            to='/sign-up'
            isActive={activeLink === '/sign-up'}
          >
            Create an account
          </Button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ rootUi, app }) => ({
  status: rootUi.isOnline ? 'online' : 'offline',
  appVersionState: app.appVersionState,
})

const mapDispatchToProps = (dispatch) => ({
  toggleNightMode: (evt) => {
    evt.stopPropagation()
    dispatch({ type: actions.USER_TOGGLE_NIGHT_MODE })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarProfileDropdown)
