import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { CardElement } from 'react-stripe-elements'
import vars from '@santiment-network/ui/variables.scss'
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

const CheckoutForm = ({ stripe, plan }) => {
  return (
    <>
      <label className={cx(styles.label, styles.label_card)}>
        Card details
        <CardElement style={style} />
      </label>

      <label className={styles.label}>Billing address</label>
      <Input
        className={styles.input}
        placeholder='Full Name'
        required
        name='name'
      />
      <div className={styles.row}>
        <Input className={styles.input} placeholder='Country' required />
        <Input
          className={cx(styles.input, styles.input_right)}
          placeholder='City'
          required
          name='address_city'
        />
      </div>
      <div className={styles.row}>
        <Input
          className={styles.input}
          placeholder='State/Region'
          required
          name='address_state'
        />
        <Input
          className={cx(styles.input, styles.input_right)}
          placeholder='Street Address'
          required
          name='address_line1'
        />
      </div>
      <Input
        className={styles.input}
        placeholder='Phone Number'
        type='tel'
        required
      />
    </>
  )
}

export default CheckoutForm
