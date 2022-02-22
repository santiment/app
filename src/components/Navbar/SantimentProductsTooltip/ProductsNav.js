import React, { useState } from 'react'
import { ProductsTrigger } from './Trigger'
import { BUSINESS_PRODUCTS, CHAIN_PRODUCTS } from './Products'
import SmoothDropdownItem from '../../SmoothDropdown/SmoothDropdownItem'
import styles from './ProductsNav.module.scss'

let timeoutId

export const ProductsNavContent = () => (
  <div className={styles.container}>
    <div className={styles.column}>
      <h3 className={styles.title}>SAN chain</h3>
      <ul className={styles.products}>
        {CHAIN_PRODUCTS.map((item, index) => (
          <li key={index}>
            <a href={item.to}>{item.title}</a>
            {item.label && <p className={styles.label}>{item.label}</p>}
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.column}>
      <h3 className={styles.title}>SAN business</h3>
      <ul className={styles.products}>
        {BUSINESS_PRODUCTS.map((item, index) => (
          <li key={index}>
            <a href={item.to}>{item.title}</a>
            {item.label && <p className={styles.label}>{item.label}</p>}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

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
      <ProductsNavContent />
    </SmoothDropdownItem>
  )
}

export default ProductsNav
