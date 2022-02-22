import React from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { ProductsNavContent } from '../SantimentProductsTooltip/ProductsNav'
import styles from './NavbarMore.module.scss'

const NavbarMore = ({ activeLink, links }) => {
  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          {links.map((item, index) => {
            const { ddParams, Dropdown, ...rest } = item
            return (
              <Button
                key={index}
                fluid
                variant='ghost'
                isActive={item.link === activeLink}
                {...rest}
                className={styles.btn}
              />
            )
          })}
        </div>
        <ProductsNavContent />
      </div>
    </Panel>
  )
}

export default NavbarMore
