import React, { useState } from 'react'
import ProductItem from './Product'
import { ProductsTrigger } from './Trigger'
import { BUSINESS_PRODUCTS, CHAIN_PRODUCTS } from './Products'
import SmoothDropdownItem from '../../SmoothDropdown/SmoothDropdownItem'
import SantimentLogo from './SantimentLogo'
import styles from './ProductsNav.module.scss'

let timeoutId

const ProductsNav = () => {
  const [isOpen, setOpenState] = useState(false)

  const setClosed = () => {
    timeoutId = setTimeout(() => setOpenState(false), 150)
  }

  const setOpened = () => {
    timeoutId && clearTimeout(timeoutId)
    setOpenState(true)
  }

  return (
    <SmoothDropdownItem
      className={styles.tooltip}
      trigger={<ProductsTrigger isOpen={isOpen} />}
      ddParams={{ position: 'start', offsetX: 0, offsetY: 0 }}
      onOpen={setOpened}
      onClose={setClosed}
    >
      <div className={styles.container}>
        <svg width='411' height='245' fill='none' className={styles.background}>
          <path
            fill='var(--athens)'
            d='M138.68 193.15C38.87 180.8 34.66 288.15 88 365c53.34 76.85 230.83 161.27 311 14.4 80.15-146.87 34.83-295.18-73-279.9-107.83 15.28-87.5 106-187.32 93.65z'
          />
        </svg>
        <SantimentLogo className={styles.mainLink} />
        <div className={styles.block}>
          <h3 className={styles.title}>SAN Business</h3>
          <div className={styles.products}>
            {BUSINESS_PRODUCTS.map((item, index) => (
              <ProductItem
                key={index}
                product={item}
                className={styles.product}
              />
            ))}
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>SAN chain</h3>
          <div className={styles.products}>
            {CHAIN_PRODUCTS.map((item, index) => (
              <ProductItem
                key={index}
                product={item}
                className={styles.product}
              />
            ))}
          </div>
        </div>
      </div>
    </SmoothDropdownItem>
  )
}

export default ProductsNav
