import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './MarketDropdown.module.scss'

const Item = ({ name, link, activeLink }) => (
  <Button
    fluid
    variant='ghost'
    as={Link}
    to={link}
    isActive={link === activeLink}
    className={styles.btn}
  >
    {name}
  </Button>
)

export default Item
