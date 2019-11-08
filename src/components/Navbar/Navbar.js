import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Search from './../Search/SearchContainer'
import SmoothDropdown from '../SmoothDropdown/SmoothDropdown'
import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'
import NavbarHelpDropdown from './NavbarHelpDropdown'
import NavbarLabsDropdown from './NavbarLabsDropdown'
import NavbarProfileDropdown from './NavbarProfileDropdown'
import NavbarAssetsDropdown from './NavbarAssetsDropdown'
import SantimentProductsTooltip from './SantimentProductsTooltip/SantimentProductsTooltip'
import logoImg from './../../assets/logos/logo-sanbase.svg'
import styles from './Navbar.module.scss'

const ExternalLink = ({ label }) => {
  return (
    <>
      {label}
      <Icon type='external-link' className={styles.externalLinkImg} />
    </>
  )
}

const leftLinks = [
  {
    to: '/sonar',
    children: 'Sonar',
    as: Link
  },
  { to: '/assets', children: 'Assets', linkTo: '/assets', as: Link },
  { href: 'https://insights.santiment.net/', children: 'Insights', as: 'a' },
  { to: '/labs', children: 'Labs', linkTo: '/labs', as: Link },
  {
    to: '/graphs',
    children: <ExternalLink label='Graphs' />,
    linkTo: 'https://graphs.santiment.net/',
    as: props => <Link {...props} className={styles.externalLink} />
  }
]

const rightBtns = [
  {
    icon: <Icon type='help-round' />,
    el: NavbarHelpDropdown,
    links: ['/docs', '/dev-api', '/support']
  },
  {
    icon: <Icon type='profile' />,
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
          <Link className={styles.logo} to='/'>
            <img alt='sanbase logo' src={logoImg} />
          </Link>
          <SantimentProductsTooltip className={styles.products} />
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
                  {props.children === 'Labs' && (
                    <NavbarLabsDropdown activeLink={activeLink} />
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
                className={styles.leftLink}
              />
            )
          })}
        </div>

        <div className={styles.right}>
          <Search />
          <div className={styles.divider}>
            {rightBtns.map(({ icon, el: Content, links }, index) => {
              return (
                <SmoothDropdownItem
                  key={index}
                  trigger={
                    <Button
                      variant='flat'
                      className={cx(styles.btn, styles.rightBtns)}
                      isActive={links.includes(activeLink)}
                    >
                      {icon}
                    </Button>
                  }
                >
                  <Content activeLink={activeLink} />
                </SmoothDropdownItem>
              )
            })}
          </div>
        </div>
      </SmoothDropdown>
    </header>
  )
}

export default Navbar
