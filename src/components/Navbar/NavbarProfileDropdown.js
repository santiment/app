import React from 'react'
import Toggle from './Toggle'
import { Link } from 'react-router-dom'
import styles from './NavbarProfileDropdown.module.scss'
import GhostBtn from './GhostBtn'
import DropdownDevider from './DropdownDevider'
import Dropdown from './Dropdown'
import ProfilePicPlaceholder from './ProfilePicPlaceholder'

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
  status = 'offline'
}) => {
  return (
    <Dropdown>
      <div className={styles.profile}>
        <div className={styles.profile__upper}>
          <div className={styles.profile__left}>
            <div className={styles.text + ' ' + styles.profile__pic}>
              {picUrl ? (
                <img src={picUrl} alt='Profile Pic' />
              ) : (
                <ProfilePicPlaceholder />
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
        <GhostBtn
          className={
            styles.setting + ' ' + styles.menuList__item + ' ' + styles.text
          }
        >
          Nightmode <Toggle />
        </GhostBtn>
      </div>
      <DropdownDevider />

      <div className={styles.menuList}>
        {links.map(({ link, label }) => {
          return (
            <GhostBtn
              key={label}
              fluid
              as={Link}
              className={styles.menuList__item + ' ' + styles.text}
              to={link}
              isActive={link === activeLink}
            >
              {label}
            </GhostBtn>
          )
        })}
      </div>
    </Dropdown>
  )
}

export default NavbarProfileDropdown
