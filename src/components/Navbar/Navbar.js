import React from 'react'
import { connect } from 'react-redux'
import withSizes from 'react-sizes'
import { compose } from 'recompose'
import { NavLink as Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Search from './Search'
import SmoothDropdown from '../SmoothDropdown/SmoothDropdown'
import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'
import NavbarHelpDropdown from './Academy/NavbarHelpDropdown'
import NavbarProfileDropdown from './NavbarProfileDropdown'
import MarketDropdown from './Watchlists/MarketDropdown'
import ScreenerDropdown from './Screeners/ScreenerDropdown'
import NavbarChartsDropdown from './ChartLayouts/NavbarChartsDropdown'
import InsightsDropdown from './InsightsDropdown'
import PlanEngage from './PlanEngage'
import SantimentProductsTooltip, {
  MenuItemArrow
} from './SantimentProductsTooltip/SantimentProductsTooltip'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import {
  isDynamicWatchlist,
  getWatchlistId
} from '../../ducks/Watchlists/utils'
import { useShortWatchlist } from '../../ducks/Watchlists/gql/hooks'
import { mapSizesToProps } from '../../utils/withSizes'
import NavbarMore from './NavbarMore/NavbarMore'
import { NavbarItem } from './NavbarItem'
import { useDialogState } from '../../hooks/dialog'
import styles from './Navbar.module.scss'

const ExternalLink = ({ children, className, ...rest }) => (
  <a className={cx(className, styles.externalLink)} {...rest}>
    {children}
    <Icon type='external-link' className={styles.externalLinkImg} />
  </a>
)

const HEADER_DD_OFFSET_X = (() => {
  const { isLaptop, isTablet } = mapSizesToProps({
    width: window.innerWidth,
    height: window.innerHeight
  })

  if ((isLaptop, isTablet)) {
    return -130
  }

  return undefined
})()

const leftLinks = [
  {
    to: '/',
    children: 'Home',
    as: Link
  },
  {
    to: '/charts',
    children: 'Charts',
    as: Link,
    Dropdown: NavbarChartsDropdown,
    ddParams: {
      position: 'start',
      offsetX: HEADER_DD_OFFSET_X
    }
  },
  {
    href: 'https://insights.santiment.net/',
    children: 'Insights',
    as: ExternalLink,
    Dropdown: InsightsDropdown,
    ddParams: {
      position: 'start',
      offsetX: HEADER_DD_OFFSET_X
    }
  },
  {
    to: '/watchlists',
    children: 'Watchlists',
    as: Link,
    Dropdown: MarketDropdown,
    ddParams: {
      position: 'start',
      offsetX: HEADER_DD_OFFSET_X
    }
  }
]

const leftLinksV2 = [
  {
    to: '/screener/new',
    children: 'Screener',
    as: Link,
    Dropdown: ScreenerDropdown,
    ddParams: {
      position: 'start'
    }
  },
  {
    to: '/feed',
    children: 'Alerts',
    as: Link
  }
]

const rightLinks = [
  {
    href: 'https://academy.santiment.net/',
    children: 'Academy',
    as: ExternalLink,
    Dropdown: NavbarHelpDropdown,
    className: styles.help
  },
  {
    to: '/pricing',
    children: 'Pricing',
    as: Link
  }
]

const NavbarMoreItem = ({ links, activeLink }) => {
  const { openDialog, closeDialog, isOpened } = useDialogState()

  return (
    <NavbarItem
      item={{
        children: (
          <>
            More
            <MenuItemArrow isOpen={isOpened} className={styles.arrow} />
          </>
        ),
        as: 'div',
        Dropdown: () => <NavbarMore links={links} activeLink={activeLink} />,
        ddParams: {
          position: 'center'
        },
        onClose: closeDialog,
        onOpen: openDialog
      }}
      activeLink={activeLink}
    />
  )
}

const Logo = (
  <Link className={styles.logo} to='/'>
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none'>
      <circle cx='16' cy='16' r='15.5' fill='#fff' stroke='#E7EAF3' />
      <path
        fill='#2F354D'
        d='M6 15.6c0-.5.1-1 .4-1.2.3-.3.6-.4 1.1-.4.5 0 .8.1 1.1.4.3.3.4.7.4 1.2 0 .6-.1 1-.4 1.3-.3.3-.6.4-1 .4-.6 0-1-.1-1.2-.4-.3-.3-.4-.7-.4-1.3zm6.5 5.1l1.5.6a5.9 5.9 0 001.7.3c.7 0 1.2-.2 1.7-.5.4-.3.7-.9.7-1.6 0-.6-.2-1.1-.5-1.5a4.7 4.7 0 00-1-1.1l-1.4-.9a7.5 7.5 0 01-1.4-1 4.8 4.8 0 01-1.1-1.3 4 4 0 01-.4-1.9c0-1.3.3-2.2 1-2.8.7-.7 1.7-1 3-1a9 9 0 012.1.2 6 6 0 011.6.6l-.6 1.8a6.3 6.3 0 00-1.3-.5 6.2 6.2 0 00-1.6-.2c-.7 0-1.2.2-1.6.5-.3.3-.5.7-.5 1.4 0 .4.2.9.5 1.2l1 1 1.4.8 1.4 1c.5.5.8 1 1.1 1.5.3.6.4 1.3.4 2.1A4.5 4.5 0 0120 21c-.2.5-.5 1-.9 1.3a4 4 0 01-1.3.9 9.2 9.2 0 01-4.2 0c-.7-.1-1.3-.3-1.7-.6l.6-1.9zm10.5-5c0-.6.1-1 .4-1.3.3-.3.6-.4 1-.4.6 0 1 .1 1.2.4.3.3.4.7.4 1.2 0 .6-.1 1-.4 1.3-.3.3-.6.4-1.1.4-.5 0-.8-.1-1.1-.4-.3-.3-.4-.7-.4-1.3z'
      />
    </svg>
  </Link>
)

const Navbar = ({ activeLink = '/', search, isLaptop, isTablet }) => {
  const id = getWatchlistId(search)
  const [watchlist = {}] = useShortWatchlist({
    id,
    skip: !activeLink.includes('assets')
  })
  let isScreener = isDynamicWatchlist(watchlist)

  const showMore = isLaptop || isTablet

  return (
    <header className={styles.header}>
      <SmoothDropdown
        verticalOffset={-8}
        showArrow={false}
        className={cx(styles.wrapper, 'container')}
        screenEdgeXOffset={5}
      >
        {showMore ? (
          <div className={styles.products}>{Logo}</div>
        ) : (
          <SantimentProductsTooltip
            className={styles.products}
            position='start'
          >
            {Logo}
          </SantimentProductsTooltip>
        )}

        {leftLinks.map((item, index) => (
          <NavbarItem
            key={index}
            item={item}
            isScreener={isScreener}
            activeLink={activeLink}
            index={index}
          />
        ))}

        {!showMore &&
          leftLinksV2.map((item, index) => (
            <NavbarItem
              key={index}
              item={item}
              isScreener={isScreener}
              activeLink={activeLink}
              index={index}
            />
          ))}

        {showMore && (
          <NavbarMoreItem
            activeLink={activeLink}
            links={[...leftLinksV2, ...rightLinks]}
          />
        )}

        <Search />

        {!showMore &&
          rightLinks.map(({ Dropdown, ...rest }, index) => {
            const isActive = activeLink.includes(rest.to)

            const button = (
              <Button
                key={index}
                variant='flat'
                isActive={isActive}
                className={cx(Dropdown || styles.rightLink, styles.btn)}
                {...rest}
              />
            )

            if (Dropdown) {
              return (
                <SmoothDropdownItem key={index} trigger={button}>
                  <Dropdown activeLink={activeLink} />
                </SmoothDropdownItem>
              )
            }

            return button
          })}

        <div className={cx(styles.divider, styles.center)}>
          <PlanEngage />
          <SmoothDropdownItem
            trigger={
              <Button
                variant='flat'
                className={cx(styles.btn, styles.rightBtns, styles.accountBtn)}
              >
                <UserAvatar to='/account' classes={styles} />
              </Button>
            }
          >
            <NavbarProfileDropdown activeLink={activeLink} />
          </SmoothDropdownItem>
        </div>
      </SmoothDropdown>
    </header>
  )
}

const mapStateToProps = state => ({
  isBetaModeEnabled: state.rootUi.isBetaModeEnabled
})

const enhance = compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps)
)

export default enhance(Navbar)
