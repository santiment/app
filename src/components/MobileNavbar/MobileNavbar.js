import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter, NavLink as Link } from 'react-router-dom'
import cx from 'classnames'
import toReact from 'svelte-adapter/react'
import SvelteProfilePic from 'webkit/ui/Profile/Pic.svelte'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MobileNavbarAction from './MobileNavbarAction'
import AssetsIcon from './AssetsIcon'
import InsightsIcon from './InsightsIcon'
import WatchlistsIcon from './WatchlistsIcon'
import MenuIcon from './MenuIcon'
import { useUser } from '../../stores/user'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import ContactUs from '../ContactUs/ContactUs'
import MobileWrapper from '../../pages/Login/Mobile/MobileWrapper'
import styles from './MobileNavbar.module.scss'

const ProfilePic = toReact(
  SvelteProfilePic,
  {
    '--img-size': '48px',
    '--img-overflow': 'visible',
  },
  'div',
)

const NAVBAR_LINKS = [
  {
    label: 'Market',
    linkTo: '/assets',
    Icon: AssetsIcon,
  },
  {
    label: 'Watchlist',
    linkTo: '/watchlists',
    Icon: WatchlistsIcon,
  },
  {
    as: 'a',
    href: 'https://insights.santiment.net',
    label: 'Insights',
    Icon: InsightsIcon,
  },
]

const MENU_LINKS = [
  { linkTo: '/alerts', label: 'Alerts' },
  { linkTo: '/labs/trends/explore/', label: 'Social tool' },
  { linkTo: '/nft', label: 'NFT Influencers' },
  { linkTo: 'https://academy.santiment.net', label: 'Academy', isExternal: true },
  { linkTo: '/pricing', label: 'Pricing' },
]

const MobileNavbar = ({ history, activeLink }) => {
  const { user, isLoggedIn } = useUser()
  const [isOpened, setOpened] = useState(false)
  const { isPro, isProPlus } = useUserSubscriptionStatus()
  const hasProBadge = isPro || isProPlus

  const toggleMenu = () => setOpened(!isOpened)
  const handleNavigation = (linkTo) => {
    isOpened && toggleMenu()
    history.push(linkTo)
  }

  if (window.Intercom) {
    window.Intercom('onShow', function () {
      const intercomContainer = window.document.querySelector('#intercom-container')
      if (intercomContainer) intercomContainer.style.display = 'block'
    })
    window.Intercom('onHide', function () {
      const intercomContainer = window.document.querySelector('#intercom-container')
      if (intercomContainer) intercomContainer.style.display = 'none'
    })
  }

  return (
    <div className={cx({ [styles.overlay]: isOpened })}>
      <Helmet>
        <body style={isOpened ? { position: 'fixed', overflow: 'hidden' } : ''} />
      </Helmet>
      <div className={cx(styles.wrapper, 'fluid row v-center justify')}>
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
        <MobileNavbarAction onClick={toggleMenu} Icon={MenuIcon} isActive={isOpened} label='Menu' />
      </div>
      {isOpened && (
        <MobileWrapper withHeader toggleMenu={toggleMenu}>
          <div onClick={toggleMenu} className={styles.navigationList}>
            {MENU_LINKS.map(({ linkTo, label, isExternal }) => {
              return isExternal ? (
                <a key={linkTo} href={linkTo} title={label} className={styles.navigationList__link}>
                  {label}
                </a>
              ) : (
                <Link key={linkTo} to={linkTo} className={styles.navigationList__link}>
                  {label}
                </Link>
              )
            })}
            <hr className={styles.separator} />
            <ContactUs className={cx(styles.navigationList__link, 'btn c-green')}>
              Help &amp; Feedback
            </ContactUs>
          </div>
          {isLoggedIn && (
            <>
              <div className={cx(styles.btn, styles.btn__create)}>
                <div className='fluid row v-center'>
                  <ProfilePic src={user.avatarUrl} placeholderWidth={48} />
                  {hasProBadge && (
                    <div className={cx(styles.crown, 'row hv-center')}>
                      <Icon type='crown' width={12} height={9} />
                    </div>
                  )}
                  <div className='mrg--l mrg-m'>
                    <div className={cx(styles.username, 'body-2 txt-m')}>@{user.username}</div>
                    <div className='body-3 txt-r c-waterloo'>{user.email}</div>
                  </div>
                </div>
              </div>
              <Button
                className={cx(styles.btn, styles.btn__login)}
                variant='flat'
                border
                onClick={() => handleNavigation('/account')}
              >
                Account settings
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Button
                className={cx(styles.btn, styles.btn__create)}
                variant='flat'
                border
                onClick={() => handleNavigation('/sign-up')}
              >
                Sign up
              </Button>
              <Button
                className={cx(styles.btn, styles.btn__login)}
                variant='flat'
                border
                onClick={() => handleNavigation('/login')}
              >
                Log in
              </Button>
            </>
          )}
        </MobileWrapper>
      )}
    </div>
  )
}

export default withRouter(MobileNavbar)
