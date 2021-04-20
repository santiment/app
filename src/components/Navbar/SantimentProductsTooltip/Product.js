import React from 'react'
import styles from './Product.module.scss'

const ProductItem = ({ product: { to, img, title, description } }) => {
  return (
    <a
      className={styles.wrapper}
      href={to}
      target='_blank'
      rel='noopener noreferrer'
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
