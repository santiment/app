import React from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import SantimentLogo from '../SantimentProductsTooltip/SantimentLogo'
import {
  BUSINESS_PRODUCTS,
  CHAIN_PRODUCTS
} from '../SantimentProductsTooltip/Products'
import styles from './NavbarMore.module.scss'
import ContactUs from '../../ContactUs/ContactUs'
import cx from 'classnames'

const Item = ({ to, img, message, title, isSelected, isIntercomButton }) => {
  const Wrapper = ({ children, className }) =>
    isIntercomButton ? (
      <ContactUs as='a' className={className} message={message}>
        {children}
      </ContactUs>
    ) : (
      <a
        className={className}
        href={!isSelected ? to : '/'}
        target={!isSelected ? '_blank' : ''}
        rel={!isSelected ? 'noopener noreferrer' : ''}
      >
        {children}
      </a>
    )

  return (
    <Wrapper
      className={cx(styles.product, isSelected && styles.product__selected)}
    >
      <div className={styles.imgWrapper}>
        <img src={img} alt={title} className={styles.productImg} />
      </div>
      <span>{title}</span>
    </Wrapper>
  )
}

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
            {BUSINESS_PRODUCTS.map((props, index) => (
              <Item key={index} {...props} />
            ))}
          </div>
        </div>
        <div className={styles.productBlock}>
          <h3 className={styles.title}>SAN chain</h3>
          <div className={styles.products}>
            {CHAIN_PRODUCTS.map((props, index) => (
              <Item key={index} {...props} />
            ))}
          </div>
        </div>
        <SantimentLogo className={styles.mainLink} />
      </div>
    </Panel>
  )
}

export default NavbarMore
