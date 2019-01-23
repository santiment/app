import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Panel, Button, Toggle, Icon } from '@santiment-network/ui'
import DropdownDevider from './DropdownDevider'
import * as actions from '../../actions/types'
import styles from './NavbarProfileDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'

const links = [
  { link: '/account', label: 'Account settings' },
  { link: '/upgrade', label: 'Upgrade plan' },
  { link: '/logout', label: 'Log out' }
]

const getStatusStyle = status => styles[status] || ''

const Status = {
  active: 'Active'
}

const NavbarProfileDropdown = ({
  activeLink,
  picUrl,
  name = 'Andriy Yurchenko',
  status = 'offline',
  isNightModeEnabled,
  toggleNightMode
}) => {
  return (
    <Fragment>
      <div className={styles.profile}>
        <div className={styles.profile__upper}>
          <div className={styles.profile__left}>
            <div className={styles.profile__pic}>
              {picUrl ? (
                <img src={picUrl} alt='Profile Pic' />
              ) : (
                <Icon type='profile-round' fill='#fff' />
              )}
            </div>
            <div
              className={styles.onlineIndicator + ' ' + getStatusStyle(status)}
            />
          </div>
          <div className={styles.profile__right}>
            <h3 className={styles.profile__name}>{name}</h3>
            <h4 className={styles.profile__status}>{Status[status]}</h4>
          </div>
        </div>
        <div className={styles.tokens}>
          <span className={styles.tokens__amount}>13 562</span> tokens available
        </div>
      </div>

      <DropdownDevider />
      <div className={dropdownStyles.list}>
        <Button
          variant='ghost'
          className={styles.setting + ' ' + dropdownStyles.item}
          onClick={toggleNightMode}
        >
          Nightmode <Toggle isActive={isNightModeEnabled} />
        </Button>
      </div>
      <DropdownDevider />

      <div className={dropdownStyles.list}>
        {links.map(({ link, label }) => {
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
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isNightModeEnabled: state.rootUi.isNightModeEnabled
})

const mapDispatchToProps = dispatch => ({
  toggleNightMode: () =>
    dispatch({
      type: actions.USER_TOGGLE_NIGHT_MODE
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarProfileDropdown)
