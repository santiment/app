import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { CardElement } from 'react-stripe-elements'
import vars from '@santiment-network/ui/variables.scss'
import Confirmation from './Confirmation'
import visaSrc from './visa.png'
import mastercardSrc from './mastercard.png'
import styles from './CheckoutForm.module.scss'

const style = {
  base: {
    fontSize: '14px',
    color: vars.mirage,
    fontFamily: 'Proxima Nova, sans-serif',
    '::placeholder': {
      color: vars.casper
    }
  },
  invalid: {
    color: vars.persimmon
  }
}

const CardInformation = () => (
  <div className={styles.card}>
    <div className={styles.top}>
      Card information
      <div className={styles.top__cards}>
        <img width='40' alt='visa' src={visaSrc} className={styles.top__visa} />
        <img width='40' alt='mastercard' src={mastercardSrc} />
      </div>
    </div>
    <div className={cx(styles.form, styles.form_filled)}>
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
          className={cx(styles.input, styles.input_last)}
          name='address_country'
          placeholder='US'
          required
        />
      </label>
    </div>
  </div>
)

const BillingAddress = () => (
  <div className={styles.address}>
    <div className={styles.toggle}>Billing address</div>
    <div className={cx(styles.form, styles.form_filled)}>
      <label className={cx(styles.label, styles.label_card)}>
        Street Address
        <Input
          className={styles.input}
          placeholder='e.g. 1483 Pearl Street'
          name='address_line1'
          required
        />
      </label>
      <label className={cx(styles.label, styles.label_card)}>
        City
        <Input
          className={styles.input}
          placeholder='e.g. Sacramento'
          name='address_city'
          required
        />
      </label>
      <label className={cx(styles.label, styles.label_card)}>
        State / Region
        <Input
          className={cx(styles.input, styles.input_last)}
          placeholder='e.g. California'
          name='address_state'
          required
        />
      </label>
    </div>
  </div>
)

const CheckoutForm = ({
  plan,
  loading,
  billing,
  price,
  nextPaymentDate,
  changeSelectedPlan
}) => (
  <div className={styles.wrapper}>
    <CardInformation />
    <BillingAddress />
    <Confirmation
      plan={plan}
      billing={billing}
      loading={loading}
      price={price}
      nextPaymentDate={nextPaymentDate}
      changeSelectedPlan={changeSelectedPlan}
    />
  </div>
)

export default CheckoutForm
