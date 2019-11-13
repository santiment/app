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
    title: 'Sanbase',
    description:
      'Behavior analysis & monitoring platform for 1000+ crypto assets',
    to: 'https://app.santiment.net'
  },
  {
    img: sheetsLogoImg,
    title: 'Sheets',
    description: 'Google Spreadsheets plugin for importing Santiment data',
    to: 'https://sheets.santiment.net'
  },
  {
    img: neuroLogoImg,
    title: 'API',
    description: 'The most comprehsive crypto API on the market',
    to: 'https://neuro.santiment.net'
  }
]

const ProductItem = ({ product: { to, img, title, description } }) => {
  return (
    <a className={styles.wrapper} href={to}>
      <div className={styles.product}>
        <img className={styles.product__img} src={img} alt={title} />
        <div className={styles.product__info}>
          <div className={styles.product__title}>{title}</div>
          <div className={styles.product__description}>{description}</div>

          <MakeLink
            className={cx(styles.product__link)}
            to={to}
            as={'div'}
            title={'Go to ' + title}
          />
        </div>
      </div>
    </a>
  )
}

const MakeLink = ({ to, title, className, as: El = 'a' }) => (
  <El href={to} className={cx(styles.link, className)}>
    {title} <Icon className={styles.linkArrow} type='pointer-right' />
  </El>
)

const OpenTrigger = () => <Icon type='arrow-down' />
const CloseTrigger = () => <Icon type='arrow-up' />

const SantimentProductsTooltip = ({ className, children }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Tooltip
      passOpenStateAs='isActive'
      closeTimeout={150}
      position='bottom'
      align='start'
      offsetY={20}
      className={styles.tooltip}
      trigger={
        <div className={className}>
          {children}
          <div className={cx(styles.arrow, isOpen && styles.opened)}>
            {isOpen ? <CloseTrigger /> : <OpenTrigger />}
          </div>
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
          <MakeLink to='https://santiment.net' title='Go to Santiment.net' />
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
