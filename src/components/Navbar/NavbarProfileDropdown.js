import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Panel, Button, Toggle, Icon } from '@santiment-network/ui'
import DropdownDevider from './DropdownDevider'
import * as actions from '../../actions/types'
import { checkIsLoggedIn } from './../../pages/UserSelectors'
import styles from './NavbarProfileDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'

const links = [
  { link: '/account', label: 'Account settings' },
  // { link: '/upgrade', label: 'Upgrade plan' },
  { link: '/logout', label: 'Log out' }
]

const getStatusStyle = status => styles[status] || ''

const Status = {
  active: 'Active'
}

const NavbarProfileDropdown = ({
  activeLink,
  picUrl,
  balance,
  name,
  status = 'offline',
  isLoggedIn,
  isNightModeEnabled,
  toggleNightMode,
  toggleBetaMode,
  isBetaModeEnabled
}) => {
  return (
    <div
      className={cx({
        [styles.wrapper]: true,
        [styles.login]: !isLoggedIn
      })}
    >
      {isLoggedIn && (
        <Fragment>
          <div className={styles.profile}>
            <div className={styles.profile__upper}>
              <div className={styles.profile__left}>
                <div
                  className={dropdownStyles.text + ' ' + styles.profile__pic}
                >
                  {picUrl ? (
                    <img src={picUrl} alt='Profile Pic' />
                  ) : (
                    <Icon type='profile-round' fill='#fff' />
                  )}
                </div>
                <div
                  className={
                    styles.onlineIndicator + ' ' + getStatusStyle(status)
                  }
                />
              </div>
              <div className={styles.profile__right}>
                <h3
                  className={dropdownStyles.text + ' ' + styles.profile__name}
                >
                  {name}
                </h3>
                <h4
                  className={dropdownStyles.text + ' ' + styles.profile__status}
                >
                  {Status[status]}
                </h4>
              </div>
            </div>
            <div className={dropdownStyles.text + ' ' + styles.tokens}>
              <span className={styles.tokens__amount}>{balance}</span> tokens
              available
            </div>
          </div>
          <DropdownDevider />
        </Fragment>
      )}

      <div className={dropdownStyles.list}>
        <Button
          variant='ghost'
          className={
            styles.setting +
            ' ' +
            dropdownStyles.item +
            ' ' +
            dropdownStyles.text
          }
          onClick={toggleNightMode}
        >
          Nightmode <Toggle isActive={isNightModeEnabled} />
        </Button>
        <Button
          variant='ghost'
          className={
            styles.setting +
            ' ' +
            dropdownStyles.item +
            ' ' +
            dropdownStyles.text
          }
          onClick={toggleBetaMode}
        >
          Beta Mode <Toggle isActive={isBetaModeEnabled} />
        </Button>
      </div>
      <DropdownDevider />

      <div className={dropdownStyles.list}>
        {isLoggedIn &&
          links.map(({ link, label }) => {
            return (
              <Button
                variant='ghost'
                key={label}
                fluid
                as={Link}
                className={dropdownStyles.item + ' ' + dropdownStyles.text}
                to={link}
                isActive={link === activeLink}
              >
                {label}
              </Button>
            )
          })}
        {!isLoggedIn && (
          <Button
            variant='ghost'
            fluid
            as={Link}
            className={dropdownStyles.item + ' ' + dropdownStyles.text}
            to={'/login'}
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
  balance: state.user.data.sanBalance,
  name: state.user.data.username,
  isLoggedIn: checkIsLoggedIn(state)
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
