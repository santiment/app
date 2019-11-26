import React from 'react'
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
import SantimentProductsTooltip from './SantimentProductsTooltip/SantimentProductsTooltip'
import logoImg from './../../assets/logos/logo-sanbase.svg'
import { LABS } from './SantimentProductsTooltip/Products'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import styles from './Navbar.module.scss'

const ExternalLink = ({ label }) => (
  <>
    {label}
    <Icon type='external-link' className={styles.externalLinkImg} />
  </>
)

const leftLinks = [
  {
    to: '/sonar',
    children: 'Sonar',
    as: Link
  },
  { to: '/assets', children: 'Assets', linkTo: '/assets', as: Link },
  {
    children: <ExternalLink label='Insights' />,
    as: ({ to, className, children }) => (
      <a
        href={'https://insights.santiment.net/'}
        className={cx(className, styles.externalLink)}
      >
        {children}
      </a>
    )
  },
  {
    children: 'Labs',
    as: props => (
      <Link {...props} to={'/labs'}>
        <SantimentProductsTooltip
          showArrows={false}
          products={LABS}
          position='start'
          showHeader={false}
          offsetX={-358}
        >
          {props.children}
        </SantimentProductsTooltip>
      </Link>
    )
  },
  {
    children: <ExternalLink label='Graphs' />,
    as: ({ className, children }) => (
      <a
        href='https://graphs.santiment.net/'
        className={cx(className, styles.externalLink)}
      >
        {children}
      </a>
    )
  }
]

const rightBtns = [
  {
    icon: () => <Icon type='help-round' className={styles.headerIcon} />,
    el: NavbarHelpDropdown,
    links: ['/docs', '/dev-api', '/support'],
    makeActive: true
  },
  {
    icon: () => (
      <Link to='/account'>
        <UserAvatar className={styles.avatar} />
      </Link>
    ),
    el: NavbarProfileDropdown,
    links: ['/account']
  }
]

const Navbar = ({ activeLink = '/' }) => {
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
              <img alt='sanbase logo' src={logoImg} />
            </Link>
          </SantimentProductsTooltip>
          {leftLinks.map((props, index) => {
            const isActive = activeLink.includes(props.to)
            if (props.linkTo) {
              const { linkTo, ...rest } = props
              return (
                <SmoothDropdownItem
                  key={index}
                  trigger={
                    <Button
                      variant='flat'
                      className={styles.btn}
                      isActive={isActive}
                      {...rest}
                    />
                  }
                >
                  {props.children === 'Assets' && (
                    <NavbarAssetsDropdown activeLink={activeLink} />
                  )}
                </SmoothDropdownItem>
              )
            }

            return (
              <Button
                key={index}
                {...props}
                variant='flat'
                isActive={isActive}
                className={cx(styles.leftLink, styles.btn)}
              />
            )
          })}
        </div>

        <div className={styles.right}>
          <Search
            inputProps={{
              placeholder: 'Search for assets...'
            }}
          />
          <div className={styles.divider}>
            {rightBtns.map(
              ({ icon: El, el: Content, links, makeActive }, index) => (
                <SmoothDropdownItem
                  key={index}
                  trigger={
                    <Button
                      variant='flat'
                      className={cx(styles.btn, styles.rightBtns)}
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
          </div>
        </div>
      </SmoothDropdown>
    </header>
  )
}

export default Navbar
