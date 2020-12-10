import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { MAIN_PRODUCTS } from '../SantimentProductsTooltip/Products'
import LinkWithArrow from '../Link'
import externalStyles from '../Watchlists/MarketDropdown.module.scss'
import styles from './NavbarMore.module.scss'
import { Link } from 'react-router-dom'

const NavbarMore = ({ activeLink, links }) => {
  return (
    <Panel>
      <div className={externalStyles.wrapper}>
        <div className={cx(externalStyles.block, externalStyles.list)}>
          {links.map((item, index) => (
            <Button
              key={index}
              fluid
              variant='ghost'
              isActive={item.link === activeLink}
              {...item}
              className={externalStyles.btn}
            />
          ))}
        </div>
        <div className={externalStyles.block}>
          <h3 className={externalStyles.title}>Santiment Products</h3>
          <div className={styles.products}>
            {MAIN_PRODUCTS.map(({ img, title, to }, index) => {
              return (
                <Link to={to} key={index} className={styles.product}>
                  <img src={img} alt={title} className={styles.productImg} />

                  {title}
                </Link>
              )
            })}
          </div>

          <LinkWithArrow
            to='https://santiment.net'
            title='Go to Santiment.net'
            className={styles.link}
          />
        </div>
      </div>
    </Panel>
  )
}

export default NavbarMore
