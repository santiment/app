import React from 'react'
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import { SearchWithSuggestions, Icon, Button } from '@santiment-network/ui'
import NavbarHelpDropdown from './NavbarHelpDropdown'
import NavbarLabsDropdown from './NavbarLabsDropdown'
import NavbarProfileDropdown from './NavbarProfileDropdown'
import styles from './Navbar.module.scss'

const leftLinks = [
  { link: '/sonar', label: 'Sonar' },
  { link: '/assets', label: 'Assets' },
  { link: '/insights', label: 'Insights' },
  { link: '/labs', label: 'Labs' },
  { link: '/reports', label: 'Reports' }
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
    <nav className={styles.wrapper}>
      <div className={styles.left}>
        <Link className={styles.logo} to='/'>
          Sanbase
        </Link>

        {leftLinks.map(({ link, label }) => {
          if (label === 'Labs') {
            return (
              <Popup
                key={label}
                on='click'
                position='bottom left'
                verticalOffset={4}
                trigger={
                  <Button
                    variant='flat'
                    isActive={activeLink.includes(link)}
                    className={`${styles.leftLink} ${
                      styles.leftLink_droppable
                    }`}
                  >
                    {label}
                  </Button>
                }
              >
                <NavbarLabsDropdown activeLink={activeLink} />
              </Popup>
            )
          }

          return (
            <Button
              key={link}
              variant='flat'
              as={Link}
              to={link}
              isActive={link === activeLink}
              className={styles.leftLink}
            >
              {label}
            </Button>
          )
        })}
      </div>

      <div className={styles.right}>
        <SearchWithSuggestions
          data={[]}
          predicate={() => () => {}}
          onResultSelect={() => {}}
          suggestionContent={suggestion => suggestion}
          className={styles.search}
        />

        {rightBtns.map(({ icon, el: Content, links }, index) => {
          return (
            <Popup
              key={index}
              on='click'
              position='bottom right'
              verticalOffset={4}
              trigger={
                <Button
                  variant='flat'
                  className={styles.btn}
                  isActive={links.includes(activeLink)}
                >
                  {icon}
                </Button>
              }
            >
              <Content activeLink={activeLink} />
            </Popup>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
