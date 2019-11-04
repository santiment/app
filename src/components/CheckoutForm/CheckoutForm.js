import React, { useState } from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { CardElement } from 'react-stripe-elements'
import vars from '@santiment-network/ui/variables.scss'
import visaSrc from './visa.png'
import mastercardSrc from './mastercard.png'
import styles from './CheckoutForm.module.scss'

const style = {
  base: {
    fontSize: '14px',
    color: vars.mirage,
    fontFamily: 'Rubik, sans-serif',
    '::placeholder': {
      color: vars.casper
    }
  },
  invalid: {
    color: vars.persimmon
  }
}

const DiscountInput = () => {
  return (
    <label className={cx(styles.label, styles.label_card)}>
      Discount code
      <Input className={styles.input} placeholder='2H8vZG5P' name='coupon' />
    </label>
  )
}

const CheckoutForm = ({ stripe, plan }) => {
  const [visible, setVisible] = useState()

  function onToggleClick () {
    setVisible(!visible)
  }

  return (
    <>
      <div className={styles.top}>
        Card information
        <div className={styles.top__cards}>
          <img
            width='40'
            alt='visa'
            src={visaSrc}
            className={styles.top__visa}
          />
          <img width='40' alt='mastercard' src={mastercardSrc} />
        </div>
      </div>
      <div className={styles.form}>
        <label className={cx(styles.label, styles.label_card)}>
          Full name
          <Input
            className={styles.input}
            placeholder='John Doe'
            required
            name='name'
          />
        </label>

        <label className={cx(styles.label, styles.label_card)}>
          Card number
          <CardElement style={style} />
        </label>

        <label className={cx(styles.label, styles.label_card)}>
          Country
          <Input
            className={styles.input}
            name='address_country'
            placeholder='US'
            required
          />
        </label>
      </div>

      <div className={styles.toggle} onClick={onToggleClick}>
        Add billing address
      </div>
      <div className={styles.form}>
        <label className={cx(styles.label, styles.label_card)}>
          Street Address
          <Input
            className={styles.input}
            placeholder='670 Glen Creek St.'
            name='address_line1'
            required
          />
        </label>
        <label className={cx(styles.label, styles.label_card)}>
          City
          <Input
            className={styles.input}
            placeholder='Seattle'
            name='address_city'
            required
          />
        </label>
        <label className={cx(styles.label, styles.label_card)}>
          State/Region
          <Input
            className={styles.input}
            placeholder='Washington'
            name='address_state'
            required
          />
        </label>
      </div>
      <DiscountInput />
    </>
  )
}

export default CheckoutForm
