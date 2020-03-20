import React from 'react'
import { connect } from 'react-redux'
import { NavLink as Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Search from './../Search/SearchContainer'
import SmoothDropdown from '../SmoothDropdown/SmoothDropdown'
import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'
import NavbarHelpDropdown from './NavbarHelpDropdown'
import NavbarProfileDropdown from './NavbarProfileDropdown'
import NavbarAssetsDropdown from './NavbarAssetsDropdown'
import InsightsDropdown from './InsightsDropdown'
import PlanEngage from './PlanEngage'
import SantimentProductsTooltip from './SantimentProductsTooltip/SantimentProductsTooltip'
import logoImg from './../../assets/logos/main-logo.svg'
import { LABS } from './SantimentProductsTooltip/Products'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import styles from './Navbar.module.scss'

const ExternalLink = ({ children, className, ...rest }) => (
  <a className={cx(className, styles.externalLink)} {...rest}>
    {children}
    <Icon type='external-link' className={styles.externalLinkImg} />
  </a>
)

const PricingLink = connect(state => ({
  isLoggedIn: checkIsLoggedIn(state),
  subscription: getCurrentSanbaseSubscription(state.user.data)
}))(({ isLoggedIn, subscription, dispatch, ...props }) => {
  const hasFreeSubscription = isLoggedIn && !subscription

  if (hasFreeSubscription || (subscription && subscription.trialEnd)) {
    return <Link {...props} />
  }

  return null
})

const leftLinks = [
  {
    to: '/feed',
    children: 'Feed',
    as: Link
  },
  {
    to: '/assets',
    children: 'Assets',
    as: Link,
    Dropdown: NavbarAssetsDropdown
  },
  {
    href: 'https://insights.santiment.net/',
    children: 'Insights',
    as: ExternalLink,
    Dropdown: InsightsDropdown
  },
  {
    children: 'Labs',
    as: props => (
      <Link {...props} to={'/labs'}>
        <SantimentProductsTooltip
          imgClassName={styles.imgLab}
          showArrows={false}
          products={LABS}
          position='start'
          showHeader={false}
          offsetX={-330}
          productProps={{
            className: styles.labCard
          }}
        >
          {props.children}
        </SantimentProductsTooltip>
      </Link>
    )
  },
  {
    href: 'https://graphs.santiment.net/',
    children: 'Graphs',
    as: ExternalLink
  },
  {
    to: '/pricing',
    children: 'Pricing',
    as: PricingLink
  }
]

const rightBtns = [
  {
    icon: () => <Icon type='help-round' className={styles.headerIcon} />,
    el: NavbarHelpDropdown,
    links: ['/docs', '/dev-api', '/support'],
    makeActive: true,
    className: styles.help
  }
]

const Navbar = ({ activeLink = '/', isBetaModeEnabled }) => {
  return (
    <header className={styles.header}>
      <SmoothDropdown
        verticalOffset={-8}
        showArrow={false}
        className={cx(styles.wrapper, 'container')}
        screenEdgeXOffset={5}
      >
        <div className={styles.left}>
          <SantimentProductsTooltip
            className={styles.products}
            position='start'
          >
            <Link className={styles.logo} to='/'>
              <img
                alt='sanbase logo'
                src={logoImg}
                className={styles.logoIcon}
              />
            </Link>
          </SantimentProductsTooltip>
          {leftLinks.map(({ Dropdown, ...rest }, index) => {
            const isActive = activeLink.includes(rest.to)

            const button = (
              <Button
                key={index}
                variant='flat'
                isActive={isActive}
                className={cx(Dropdown || styles.leftLink, styles.btn)}
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
        </div>

        <div className={styles.right}>
          <Search
            inputProps={{
              placeholder: 'Search for assets...',
              icon: 'search'
            }}
          />
          {rightBtns.map(
            (
              { icon: El, el: Content, links, makeActive, className },
              index
            ) => (
              <SmoothDropdownItem
                key={index}
                trigger={
                  <Button
                    variant='flat'
                    className={cx(styles.btn, styles.rightBtns, className)}
                    isActive={makeActive && links.includes(activeLink)}
                  >
                    <El />
                  </Button>
                }
              >
                <Content activeLink={activeLink} />
              </SmoothDropdownItem>
            )
          )}
          <div className={cx(styles.divider, styles.center)}>
            <PlanEngage />
            <SmoothDropdownItem
              trigger={
                <Button
                  variant='flat'
                  className={cx(
                    styles.btn,
                    styles.rightBtns,
                    styles.accountBtn
                  )}
                >
                  <UserAvatar to='/account' classes={styles} />
                </Button>
              }
            >
              <NavbarProfileDropdown activeLink={activeLink} />
            </SmoothDropdownItem>
          </div>
        </div>
      </SmoothDropdown>
    </header>
  )
}

const mapStateToProps = state => ({
  isBetaModeEnabled: state.rootUi.isBetaModeEnabled
})

const enhance = connect(mapStateToProps)

export default enhance(Navbar)
