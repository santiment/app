import React from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import SantimentLogo from '../SantimentProductsTooltip/SantimentLogo'
import {
  BUSINESS_PRODUCTS,
  CHAIN_PRODUCTS
} from '../SantimentProductsTooltip/Products'
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
        <div className={styles.productBlock}>
          <h3 className={styles.title}>SAN Business</h3>
          <div className={styles.products}>
            {BUSINESS_PRODUCTS.map(({ img, title, to }, index) => {
              return (
                <a
                  href={to}
                  key={index}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.product}
                >
                  <img src={img} alt={title} className={styles.productImg} />
                  {title}
                </a>
              )
            })}
          </div>
        </div>
        <div className={styles.productBlock}>
          <h3 className={styles.title}>SAN chain</h3>
          <div className={styles.products}>
            {CHAIN_PRODUCTS.map(({ img, title, to }, index) => {
              return (
                <a
                  href={to}
                  key={index}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.product}
                >
                  <img src={img} alt={title} className={styles.productImg} />
                  {title}
                </a>
              )
            })}
          </div>
        </div>
        <SantimentLogo className={styles.mainLink} />
      </div>
    </Panel>
  )
}

export default NavbarMore
