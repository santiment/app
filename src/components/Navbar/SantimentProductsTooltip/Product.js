import React from 'react'
import cx from 'classnames'
import styles from './Product.module.scss'

const ProductItem = ({
  product: { to, img, title, isSelected, description }
}) => {
  return (
    <a
      className={cx(styles.wrapper, isSelected && styles.wrapper__selected)}
      href={isSelected ? '/' : to}
      target={isSelected ? '' : '_blank'}
      rel={isSelected ? '' : 'noopener noreferrer'}
    >
      <div className={styles.product}>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={img} alt={title} />
        </div>
        <div className={styles.info}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </a>
  )
}

export default ProductItem
