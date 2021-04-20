import React from 'react'
import cx from 'classnames'
import ContactUs from '../../ContactUs/ContactUs'
import styles from './Product.module.scss'

const ProductItem = ({
  className,
  product: {
    to,
    img,
    isIntercomButton,
    message,
    title,
    isSelected,
    description
  }
}) => {
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
      className={cx(
        styles.wrapper,
        isSelected && styles.wrapper__selected,
        className
      )}
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
    </Wrapper>
  )
}

export default ProductItem
