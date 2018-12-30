import React from 'react'
import Toggle from './Toggle'
import { Link } from 'react-router-dom'
import styles from './NavbarProfileDropdown.module.scss'
import GhostBtn from './GhostBtn'
import DropdownDevider from './DropdownDevider'

const links = [
  { link: '/', label: 'Account settings' },
  { link: '/', label: 'Upgrade plan' },
  { link: '/', label: 'Log out' }
]

const NavbarProfileDropdown = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile__upper}>
          <div className={styles.profile__left}>
            <div className={styles.text + ' ' + styles.profile__pic} />
            <div className={styles.onlineIndicator + ' ' + styles.online} />
          </div>
          <div className={styles.profile__right}>
            <h3 className={styles.text + ' ' + styles.profile__name}>
              Andriy Yurchenko
            </h3>
            <h4 className={styles.text + ' ' + styles.profile__status}>
              Active
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
              fluid
              as={Link}
              className={styles.menuList__item + ' ' + styles.text}
              to={link}
            >
              {label}
            </GhostBtn>
          )
        })}
      </div>
    </div>
  )
}

export default NavbarProfileDropdown
