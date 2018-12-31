import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Panel, Button, Toggle, Icon } from '@santiment-network/ui'
import DropdownDevider from './DropdownDevider'
import * as actions from '../../actions/types'
import styles from './NavbarProfileDropdown.module.scss'

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
    <Panel>
      <div className={styles.profile}>
        <div className={styles.profile__upper}>
          <div className={styles.profile__left}>
            <div className={styles.text + ' ' + styles.profile__pic}>
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
            <h3 className={styles.text + ' ' + styles.profile__name}>{name}</h3>
            <h4 className={styles.text + ' ' + styles.profile__status}>
              {Status[status]}
            </h4>
          </div>
        </div>
        <div className={styles.text + ' ' + styles.tokens}>
          <span className={styles.tokens__amount}>13 562</span> tokens available
        </div>
      </div>

      <DropdownDevider />
      <div className={styles.menuList}>
        <Button
          variant='ghost'
          className={
            styles.setting + ' ' + styles.menuList__item + ' ' + styles.text
          }
          onClick={toggleNightMode}
        >
          Nightmode <Toggle isActive={isNightModeEnabled} />
        </Button>
      </div>
      <DropdownDevider />

      <div className={styles.menuList}>
        {links.map(({ link, label }) => {
          return (
            // <GhostBtn
            <Button
              variant='ghost'
              key={label}
              fluid
              as={Link}
              className={styles.menuList__item + ' ' + styles.text}
              to={link}
              isActive={link === activeLink}
            >
              {label}
            </Button>
          )
        })}
      </div>
    </Panel>
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
