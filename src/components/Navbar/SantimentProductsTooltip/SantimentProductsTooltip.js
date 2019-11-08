import React, { useState } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import sanbaseLogoImg from './../../../assets/logos/logo-sanbase.svg'
import sheetsLogoImg from './../../../assets/logos/logo-sheets.svg'
import neuroLogoImg from './../../../assets/logos/logo-neuro.svg'
import styles from './SantimentProductsTooltip.module.scss'

const PRODUCTS = [
  {
    img: sanbaseLogoImg,
    title: 'sanbase',
    description: 'Short description of the product in multiple lines of text',
    to: 'https://app.santiment.net'
  },
  {
    img: sheetsLogoImg,
    title: 'sheets',
    description: 'Short description of the product in multiple lines of text',
    to: 'https://sheets.santiment.net'
  },
  {
    img: neuroLogoImg,
    title: 'API',
    description: 'Short description of the product in multiple lines of text',
    to: 'https://neuro.santiment.net'
  }
]

const ProductItem = ({ product: { to, img, title, description } }) => {
  const [showLink, setShowLink] = useState(false)

  return (
    <a
      href={to}
      className={styles.product}
      onMouseEnter={() => setShowLink(true)}
      onMouseLeave={() => {
        setShowLink(false)
      }}
    >
      <img className={styles.productImg} src={img} alt={title} />
      <div className={styles.productInfo}>
        <div className={styles.productTitle}>{title}</div>
        <div className={styles.productDescription}>{description}</div>
        {showLink && (
          <MakeLink
            className={styles.productLink}
            to={to}
            title={'Go to ' + title}
          />
        )}
      </div>
    </a>
  )
}

const MakeLink = ({ to, title, className }) => (
  <a href={to} className={cx(styles.link, className)}>
    {title} <Icon className={styles.linkArrow} type='pointer-right' />
  </a>
)

const OpenTrigger = () => <Icon type='arrow-down' />
const CloseTrigger = () => <Icon type='arrow-up' />

const SantimentProductsTooltip = ({ className }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Tooltip
      passOpenStateAs='isActive'
      closeTimeout={150}
      position='bottom'
      align='start'
      trigger={
        <div className={cx(className, styles.arrow, isOpen && styles.opened)}>
          {isOpen ? <CloseTrigger /> : <OpenTrigger />}
        </div>
      }
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Santiment products</div>
          <MakeLink
            to='https://app.santiment.net'
            title='Go to Santiment.net'
          />
        </div>
        <div className={styles.products}>
          {PRODUCTS.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))}
        </div>
      </div>
    </Tooltip>
  )
}

export default SantimentProductsTooltip
