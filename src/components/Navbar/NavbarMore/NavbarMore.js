import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import SantimentLogo from '../SantimentProductsTooltip/SantimentLogo'
import {
  BUSINESS_PRODUCTS,
  CHAIN_PRODUCTS
} from '../SantimentProductsTooltip/Products'
import ContactUs from '../../ContactUs/ContactUs'
import styles from './NavbarMore.module.scss'

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
        <svg width='213' height='184' fill='none' className={styles.background}>
          <path
            fill='var(--athens)'
            d='M90.11 164.99c-69.03-7.56-78.37 73.44-27.17 119.03 51.2 45.6 212.73 87.36 244.61-31.05 31.88-118.4-24-214.66-98.2-185.25-74.2 29.4-50.21 104.83-119.24 97.27z'
            opacity='.6'
          />
        </svg>
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
