import React from 'react'
import { Link } from 'react-router-dom'
import { SearchWithSuggestions } from '@santiment-network/ui'
import FlatBtn from './FlatBtn'
import styles from './Navbar.module.scss'
import HelpIcon from './HelpIcon'
import AccountIcon from './AccountIcon'
import { Popup } from 'semantic-ui-react'
import NavbarHelpDropdown from './NavbarHelpDropdown'

const leftLinks = [
  { link: '/sonar', label: 'Sonar' },
  { link: '/assets', label: 'Assets' },
  { link: '/insights', label: 'Insights' },
  { link: '/labs', label: 'Labs' },
  { link: '/reports', label: 'Reports' }
]
const rightBtns = [{ icon: HelpIcon }, { icon: AccountIcon }]

const Navbar = () => {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.left}>
        <Link className={styles.logo} to='/'>
          Sanbase
        </Link>

        {leftLinks.map(({ link, label }) => {
          return (
            <FlatBtn
              key={link}
              as={Link}
              to={link}
              isActive
              className={styles.leftLink}
            >
              {label}
            </FlatBtn>
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

        {rightBtns.map(({ icon }, index) => {
          return (
            <Popup
              on='click'
              position='bottom right'
              verticalOffset={4}
              trigger={
                <FlatBtn className={styles.btn} key={index} isActive>
                  {icon()}
                </FlatBtn>
              }
            >
              <NavbarHelpDropdown />
            </Popup>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
