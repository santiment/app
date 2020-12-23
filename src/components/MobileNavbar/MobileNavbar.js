import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter, NavLink as Link } from 'react-router-dom'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import MobileNavbarAction from './MobileNavbarAction'
import SantimentLogo from './SantimentLogo'
import AssetsIcon from './AssetsIcon'
import FeedIcon from './FeedIcon'
import InsightsIcon from './InsightsIcon'
import WatchlistsIcon from './WatchlistsIcon'
import MenuIcon from './MenuIcon'
import { useUser } from '../../stores/user'
import ContactUs from '../ContactUs/ContactUs'
import styles from './MobileNavbar.module.scss'

const NAVBAR_LINKS = [
  {
    label: 'Feed',
    linkTo: '/feed',
    Icon: FeedIcon
  },
  {
    label: 'Market',
    linkTo: '/assets',
    Icon: AssetsIcon
  },
  {
    label: 'Watchlists',
    linkTo: '/watchlists',
    Icon: WatchlistsIcon
  },
  {
    as: 'a',
    href: 'https://insights.santiment.net',
    label: 'Insights',
    Icon: InsightsIcon
  }
]

const MENU_LINKS = [
  { linkTo: '/sonar/my-signals', label: 'Alerts' },
  { linkTo: '/labs/trends', label: 'Santrends' },
  { linkTo: '/account', label: 'Account settings' }
]

const MobileNavbar = ({ history, activeLink }) => {
  const { isLoggedIn } = useUser()
  const [isOpened, setOpened] = useState(false)

  const toggleMenu = () => setOpened(!isOpened)
  const handleNavigation = linkTo => {
    isOpened && toggleMenu()
    history.push(linkTo)
  }

  if (window.Intercom) {
    window.Intercom('onShow', function () {
      const intercomContainer = window.document.querySelector(
        '#intercom-container'
      )
      if (intercomContainer) intercomContainer.style.display = 'block'
    })
    window.Intercom('onHide', function () {
      const intercomContainer = window.document.querySelector(
        '#intercom-container'
      )
      if (intercomContainer) intercomContainer.style.display = 'none'
    })
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
              isActive={!isOpened && activeLink.includes(props.linkTo)}
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
              {MENU_LINKS.map(({ linkTo, label }) => (
                <Link
                  key={linkTo}
                  to={linkTo}
                  className={styles.navigationList__link}
                >
                  {label}
                </Link>
              ))}
              <ContactUs className={styles.navigationList__link}>
                Support
              </ContactUs>
            </div>
          </div>
          {!isLoggedIn && (
            <>
              <Button
                className={cx(styles.btn, styles.btn__login)}
                variant='fill'
                accent='positive'
                onClick={() => handleNavigation('/login')}
              >
                Log in
              </Button>
              <Button
                className={cx(styles.btn, styles.btn__create)}
                variant='flat'
                border
                onClick={() => handleNavigation('/sign-up')}
              >
                Create an account
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default withRouter(MobileNavbar)
