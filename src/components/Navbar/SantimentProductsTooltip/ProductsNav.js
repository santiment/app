import React, { useState } from 'react'
import ProductItem from './Product'
import { ProductsTrigger } from './Trigger'
import { BUSINESS_PRODUCTS, CHAIN_PRODUCTS } from './Products'
import SmoothDropdownItem from '../../SmoothDropdown/SmoothDropdownItem'
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
