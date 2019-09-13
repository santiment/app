import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter, NavLink as Link } from 'react-router-dom'
import cx from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import MobileNavbarAction from './MobileNavbarAction'
import SantimentLogo from './SantimentLogo'
import AssetsIcon from './AssetsIcon'
import InsightsIcon from './InsightsIcon'
import SonarIcon from './SonarIcon'
import MenuIcon from './MenuIcon'
import styles from './MobileNavbar.module.scss'
import * as actions from './../../actions/types'

const NAVBAR_LINKS = [
  // TODO: until we don't have mobile good view
  // {
  // link: '/trends',
  // label: 'Trends',
  // linkTo: '/labs/trends',
  // iconType: 'fire'
  // },
  {
    link: '/assets',
    label: 'Assets',
    linkTo: '/assets',
    Icon: AssetsIcon
  },
  {
    link: '/sonar',
    label: 'Sonar',
    linkTo: '/sonar',
    Icon: SonarIcon
  },
  {
    as: 'a',
    href: 'https://insights.santiment.net',
    label: 'Insights',
    Icon: InsightsIcon
  }
]

const MENU_LINKS = [
  { link: '/account', label: 'Account settings' },
  { link: '/support', label: 'Support' }
]

const MobileNavbar = ({ history, isLogined, activeLink, logout }) => {
  const [isOpened, setOpened] = useState(false)

  const toggleMenu = () => setOpened(!isOpened)
  const handleNavigation = linkTo => {
    isOpened && toggleMenu()
    history.push(linkTo)
  }

  return (
    <div className={cx({ [styles.overlay]: isOpened })}>
      <Helmet>
        <body
          style={isOpened ? { position: 'fixed', overflow: 'hidden' } : ''}
        />
      </Helmet>
      <div className={styles.wrapper}>
        {NAVBAR_LINKS.map((props, index) => {
          return (
            <MobileNavbarAction
              key={index}
              isActive={!isOpened && activeLink.includes(props.link)}
              onClick={handleNavigation}
              {...props}
            />
          )
        })}
        <MobileNavbarAction
          onClick={toggleMenu}
          Icon={MenuIcon}
          isActive={isOpened}
          label='Menu'
        />
      </div>
      {isOpened && (
        <div className={styles.overlayContent}>
          <div>
            <div className={styles.logo}>
              <SantimentLogo />
            </div>
            <div onClick={toggleMenu} className={styles.navigationList}>
              {MENU_LINKS.map(({ link, label }) => (
                <Link
                  key={link}
                  to={link}
                  className={styles.navigationList__link}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <Button
            className={styles.loginBtn}
            variant='fill'
            accent='positive'
            onClick={() => {
              if (isLogined) {
                toggleMenu()
                logout()
              } else {
                handleNavigation('/login')
              }
            }}
          >
            {isLogined ? 'Log out' : 'Log in'}
          </Button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ user = {} }) => {
  return {
    isLogined: user.data && !!user.data.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch({
        type: actions.USER_LOGOUT
      })
    }
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(MobileNavbar)
