import React, { useState } from 'react'
import cx from 'classnames'
import { ProductsTrigger } from './Trigger'
import { BUSINESS_PRODUCTS, CHAIN_PRODUCTS, ArrowRight } from './Products'
import SmoothDropdownItem from '../../SmoothDropdown/SmoothDropdownItem'
import styles from './ProductsNav.module.scss'

let timeoutId

const ListItem = ({ item }) => (
  <li tabIndex={1} className={styles[item.title]}>
    <a href={item.to}>
      {item.title} <ArrowRight />
    </a>
    {item.description && (
      <div className={styles.description}>{item.description}</div>
    )}
    {item.label && <span className={styles.label}>{item.label}</span>}
  </li>
)

const RowBlock = ({ title, items, boxClass }) => (
  <div className={boxClass}>
    <h3 className={styles.title}>{title}</h3>
    <ul className={styles.products}>
      {items.map((item, index) => (
        <ListItem item={item} key={index} />
      ))}
    </ul>
  </div>
)

export const ProductsNavContent = ({
  containerClass,
  showLine = true,
  boxClass
}) => (
  <div className={cx(styles.container, containerClass && containerClass)}>
    <RowBlock
      title='SAN business'
      items={BUSINESS_PRODUCTS}
      boxClass={boxClass}
    />
    {showLine && <hr className={styles.hr} />}
    <RowBlock title='SAN chain' items={CHAIN_PRODUCTS} boxClass={boxClass} />
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
      ddParams={{ position: 'start', offsetX: -24, offsetY: 0 }}
      onOpen={setOpened}
      onClose={setClosed}
    >
      <ProductsNavContent />
    </SmoothDropdownItem>
  )
}

export default ProductsNav
