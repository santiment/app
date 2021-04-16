import React from 'react'
import withSizes from 'react-sizes'
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
import { mapSizesToProps } from '../../utils/withSizes'
import NavbarMore from './NavbarMore/NavbarMore'
import { NavbarItem } from './NavbarItem'
import { useDialogState } from '../../hooks/dialog'
import { DEFAULT_SCREENER } from '../../ducks/Screener/utils'
import styles from './Navbar.module.scss'

const ExternalLink = ({ children, className, ...rest }) => (
  <a className={cx(className, styles.externalLink)} {...rest}>
    {children}
    <Icon type='external-link' className={styles.externalLinkImg} />
  </a>
)

const HEADER_DD_PARAMS = (() => {
  const { isLaptop, isTablet } = mapSizesToProps({
    width: window.innerWidth,
    height: window.innerHeight
  })

  if (isLaptop || isTablet) {
    return {
      offsetX: -180
    }
  }

  return {
    position: 'start'
  }
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
    ddParams: HEADER_DD_PARAMS
  },
  {
    href: 'https://insights.santiment.net/',
    children: 'Insights',
    as: ExternalLink,
    Dropdown: InsightsDropdown,
    ddParams: HEADER_DD_PARAMS
  },
  {
    to: '/watchlists',
    children: 'Watchlists',
    as: Link,
    Dropdown: MarketDropdown,
    ddParams: HEADER_DD_PARAMS
  }
]

const leftLinksV2 = [
  {
    to: DEFAULT_SCREENER.href,
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
    className: styles.academyBtn
  },
  {
    to: '/pricing',
    children: 'Pricing',
    as: Link,
    className: styles.pricingBtn
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
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
      <path fill='#fff' d='M32 16a16 16 0 11-32 0 16 16 0 0132 0z' />
      <path
        fill='#181B2B'
        d='M8.23 16a1.7 1.7 0 01-1.71 1.69A1.7 1.7 0 014.8 16c0-.93.77-1.69 1.72-1.69.94 0 1.71.76 1.71 1.69zM25.48 17.69A1.7 1.7 0 0027.2 16a1.7 1.7 0 00-1.72-1.69A1.7 1.7 0 0023.77 16c0 .93.77 1.69 1.71 1.69zM19.43 9.61a6.5 6.5 0 00-4.4-.67c-1.38.32-2.57 1.26-2.8 2.84-.18 1.3.22 2.33.9 3.14a9.31 9.31 0 002.27 1.77c.81.5 1.48.9 1.97 1.38.46.44.7.9.7 1.5 0 .69-.2 1.04-.43 1.24-.24.22-.63.38-1.19.42a5.43 5.43 0 01-3.3-.97l-1.21 1.56a7.42 7.42 0 004.65 1.37 3.92 3.92 0 002.4-.94 3.48 3.48 0 001.07-2.68c0-1.26-.55-2.19-1.28-2.9-.7-.67-1.6-1.2-2.32-1.65a7.52 7.52 0 01-1.8-1.36c-.35-.42-.55-.9-.45-1.61.08-.59.5-1.02 1.28-1.2a4.5 4.5 0 013 .5l.94-1.74z'
      />
      <path
        fill='#D2D6E7'
        d='M16 30.83a14.83 14.83 0 100-29.66 14.83 14.83 0 000 29.66zM32 16a16 16 0 11-32 0 16 16 0 0132 0z'
      />
    </svg>
  </Link>
)

const Navbar = ({ activeLink = '/', isLaptop, isTablet }) => {
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
            key={'left' + index}
            item={item}
            activeLink={activeLink}
          />
        ))}

        {!showMore &&
          leftLinksV2.map((item, index) => (
            <NavbarItem
              key={'leftV2' + index}
              item={item}
              activeLink={activeLink}
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
          rightLinks.map(({ Dropdown, className, ...rest }, index) => {
            const isActive = activeLink.includes(rest.to)

            const button = (
              <Button
                key={index}
                variant='flat'
                isActive={isActive}
                className={cx(
                  Dropdown || styles.rightLink,
                  styles.btn,
                  className
                )}
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

export default withSizes(mapSizesToProps)(Navbar)
