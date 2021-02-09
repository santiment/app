import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { CardElement } from 'react-stripe-elements'
import COLOR from '@santiment-network/ui/variables.scss'
import Confirmation from './Confirmation'
import { useTheme } from '../../stores/ui/theme'
import styles from './CheckoutForm.module.scss'

const style = {
  base: {
    fontSize: '14px',
    color: COLOR.rhino,
    fontFamily: 'Proxima Nova, sans-serif',
    '::placeholder': {
      color: COLOR.casper
    }
  },
  invalid: {
    color: COLOR.persimmon
  }
}

const nightStyle = {
  ...style,
  base: {
    ...style.base,
    color: COLOR.mystic
  }
}

const CardInformation = () => {
  const { isNightMode } = useTheme()

  return (
    <div className={styles.card}>
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
        <CardElement style={isNightMode ? nightStyle : style} />
      </label>
    </div>
  )
}

const BillingAddress = () => (
  <div className={styles.address}>
    <label className={cx(styles.label, styles.label_card)}>
      Country
      <Input
        className={styles.input}
        name='address_country'
        placeholder='US'
        required
      />
    </label>

    <label className={cx(styles.label, styles.label_card)}>
      State / Region
      <Input
        className={styles.input}
        placeholder='e.g. California'
        name='address_state'
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
      Street Address
      <Input
        className={cx(styles.input, styles.input_last)}
        placeholder='e.g. 1483 Pearl Street'
        name='address_line1'
        required
      />
    </label>
  </div>
)

const CheckoutForm = ({
  plan,
  loading,
  billing,
  price,
  changeSelectedPlan,
  isFreeTrial
}) => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <CardInformation />
      <BillingAddress />
    </div>

    <Confirmation
      plan={plan}
      billing={billing}
      loading={loading}
      price={price}
      changeSelectedPlan={changeSelectedPlan}
      isFreeTrial={isFreeTrial}
    />
  </div>
)

export default CheckoutForm
