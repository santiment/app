import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Toggle } from '@santiment-network/ui'
import DropdownDevider from './DropdownDevider'
import ProfileInfo from '../Insight/ProfileInfo'
import * as actions from '../../actions/types'
import { dateDifference, DAY } from '../../utils/dates'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import styles from './NavbarProfileDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'

const mys = [
  { as: Link, to: '/sonar/my-signals', children: 'My signals' },
  { as: Link, to: '/assets', children: 'My watchlists' },
  {
    as: 'a',
    href: 'https://insights.santiment.net/my',
    children: 'My insights'
  }
]

const links = [
  { to: '/account', children: 'Account settings' },
  // { link: '/upgrade', label: 'Upgrade plan' },
  {
    to: '/logout',
    className: styles.logout,
    children: (
      <>
        <svg
          className={styles.logout__icon}
          width='16'
          height='16'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M8 16a8 8 0 0 0 7.11-4.36.67.67 0 1 0-1.18-.61A6.65 6.65 0 0 1 1.33 8a6.65 6.65 0 0 1 12.6-3.03.67.67 0 0 0 1.11.15.67.67 0 0 0 .07-.76A8 8 0 1 0 8 16zm.67-4.66a.67.67 0 0 0 .46-1.14L7.6 8.67h7.72a.67.67 0 1 0 0-1.34H7.6L9.13 5.8a.67.67 0 1 0-.94-.94l-2.6 2.61a.67.67 0 0 0 0 1.06l2.6 2.6a.67.67 0 0 0 .48.21z' />
        </svg>{' '}
        Log out
      </>
    )
  }
]

export const NavbarProfileDropdown = ({
  activeLink,
  picUrl,
  status = 'offline',
  isNightModeEnabled,
  toggleNightMode,
  toggleBetaMode,
  isBetaModeEnabled,
  user
}) => {
  const isLoggedIn = user && user.id

  return (
    <div
      className={cx({
        [styles.wrapper]: true,
        [styles.login]: !isLoggedIn
      })}
    >
      {isLoggedIn && (
        <Fragment>
          <ProfileInfo
            className={styles.profile}
            name={user.username || user.email}
            status={
              <div className={styles.plan}>
                <Query query={USER_SUBSCRIPTIONS_QUERY}>
                  {({ data: { currentUser } = {} }) => {
                    const subscription = getCurrentSanbaseSubscription(
                      currentUser
                    )
                    let plan = 'FREE'
                    let trial = ''

                    if (subscription) {
                      plan = subscription.plan.name
                      trial = subscription.trialEnd || ''
                      if (trial) {
                        const daysNumber =
                          dateDifference({
                            from: new Date(),
                            to: new Date(trial),
                            format: DAY
                          }).diff + 1

                        const daysLeft =
                          daysNumber === 1
                            ? 'last day'
                            : `${daysNumber} days left`

                        trial = `(trial - ${daysLeft})`
                      }
                    }

                    const userPlan = subscription
                      ? subscription.plan.name
                      : 'FREE'
                    if (userPlan === 'PRO') return null

                    if (trial) return `${plan} plan ${trial}`
                    else {
                      return (
                        <>
                          <div>{plan}</div>
                          <UpgradeBtn className={styles.upgrade} />
                        </>
                      )
                    }
                  }}
                </Query>
              </div>
            }
          />

          <DropdownDevider />
        </Fragment>
      )}

      <div className={dropdownStyles.list}>
        <Button
          fluid
          variant='ghost'
          className={styles.setting + ' ' + dropdownStyles.item}
          onClick={toggleNightMode}
        >
          Night mode <Toggle isActive={isNightModeEnabled} />
        </Button>
      </div>
      <DropdownDevider />
      {isLoggedIn && (
        <>
          <div className={dropdownStyles.list}>
            {mys.map((props, index) => {
              return (
                <Button
                  variant='ghost'
                  key={index}
                  fluid
                  className={dropdownStyles.item}
                  isActive={props.to === activeLink}
                  {...props}
                />
              )
            })}
          </div>
          <DropdownDevider />
        </>
      )}
      <div className={dropdownStyles.list}>
        {isLoggedIn ? (
          links.map((props, index) => {
            return (
              <Button
                variant='ghost'
                key={index}
                fluid
                as={Link}
                className={dropdownStyles.item}
                isActive={props.to === activeLink}
                {...props}
              />
            )
          })
        ) : (
          <Button
            variant='ghost'
            fluid
            as={Link}
            className={dropdownStyles.item}
            to='/login'
            isActive={activeLink === '/login'}
          >
            Log in
          </Button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isNightModeEnabled: state.rootUi.isNightModeEnabled,
  isBetaModeEnabled: state.rootUi.isBetaModeEnabled,
  status: state.rootUi.isOnline ? 'online' : 'offline',
  user: state.user.data
})

const mapDispatchToProps = dispatch => ({
  toggleNightMode: () =>
    dispatch({
      type: actions.USER_TOGGLE_NIGHT_MODE
    }),
  toggleBetaMode: () => {
    dispatch({
      type: actions.USER_TOGGLE_BETA_MODE
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarProfileDropdown)
