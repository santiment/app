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
import Logo from './SantimentProductsTooltip/Logo'
import { ArrowTrigger } from './SantimentProductsTooltip/Arrow'
import ProductsNav from './SantimentProductsTooltip/ProductsNav'
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
            More <ArrowTrigger isOpen={isOpened} />
          </>
        ),
        as: 'div',
        Dropdown: () => <NavbarMore links={links} activeLink={activeLink} />,
        ddParams: { position: 'center' },
        onClose: closeDialog,
        onOpen: openDialog
      }}
      activeLink={activeLink}
    />
  )
}

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
        <Logo />
        {!showMore && <ProductsNav />}
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
