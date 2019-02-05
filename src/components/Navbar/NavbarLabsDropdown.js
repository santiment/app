import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import styles from './NavbarDropdown.module.scss'

const links = [
  { link: '/labs/trends', label: 'Social Trends' },
  { link: '/ethereum-spent', label: 'ETH spent' },
  { link: '/labs/balance', label: 'Historical balance' },
  { link: '/labs/wordcloud', label: 'Word context' },
  { link: 'https://data.santiment.net/', label: 'Dashboard' }
]

const NavbarLabsDropdown = ({ activeLink }) => (
  <div className={styles.list}>
    {links.map(({ link, label }) => {
      return (
        <Button
          fluid
          variant='ghost'
          key={label}
          as={props =>
            label === 'Dashboard' ? (
              <a
                {...props}
                rel='noopener noreferrer'
                target='_blank'
                href={link}
              />
            ) : (
              <Link {...props} to={link} />
            )
          }
          className={styles.item}
          isActive={link === activeLink}
        >
          {label}
        </Button>
      )
    })}
  </div>
)

export default NavbarLabsDropdown
