import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Toggle } from '@santiment-network/ui'
import DropdownDevider from './DropdownDevider'
import ProfileInfo from '../Insight/ProfileInfo'
import * as actions from '../../actions/types'
import { capitalizeStr } from '../../utils/utils'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import styles from './NavbarProfileDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'

const mys = [
  { link: '/sonar/my-signals', label: 'My signals' },
  { link: '/assets', label: 'My watchlists' },
  { link: '/insights/my', label: 'My insights' }
]

const links = [
  { link: '/account', label: 'Account settings' },
  // { link: '/upgrade', label: 'Upgrade plan' },
  { link: '/logout', label: 'Log out' }
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
  const sub = getCurrentSanbaseSubscription(user)
  const plan = sub ? sub.plan.name : 'Free'
  const isLoggedIn = user

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
            name={user.name}
            status={
              <div className={styles.tokens}>{capitalizeStr(plan)} plan</div>
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
            {mys.map(({ link, label }) => {
              return (
                <Button
                  variant='ghost'
                  key={label}
                  fluid
                  as={Link}
                  className={dropdownStyles.item}
                  to={link}
                  isActive={link === activeLink}
                >
                  {label}
                </Button>
              )
            })}
          </div>
          <DropdownDevider />
        </>
      )}
      <div className={dropdownStyles.list}>
        {isLoggedIn ? (
          links.map(({ link, label }) => {
            return (
              <Button
                variant='ghost'
                key={label}
                fluid
                as={Link}
                className={dropdownStyles.item}
                to={link}
                isActive={link === activeLink}
              >
                {label}
              </Button>
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
