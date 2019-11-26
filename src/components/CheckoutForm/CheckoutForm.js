import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { CardElement } from 'react-stripe-elements'
import vars from '@santiment-network/ui/variables.scss'
import visaSrc from './visa.png'
import mastercardSrc from './mastercard.png'
import { useDebounce } from '../../hooks'
import styles from './CheckoutForm.module.scss'

const CHECK_COUPON = gql`
  query getCoupon($coupon: String!) {
    getCoupon(coupon: $coupon) {
      amountOff
      id
      isValid
      name
      percentOff
    }
  }
`

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

const SuccessIcon = (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={styles.valid}
  >
    <path
      d='M12.1603 6.48292C12.4627 6.18058 12.4627 5.69039 12.1603 5.38805C11.858 5.0857 11.3678 5.0857 11.0655 5.38805L7.13979 9.31373L5.45066 7.62461C5.14832 7.32226 4.65813 7.32226 4.35579 7.62461C4.05345 7.92695 4.05345 8.41714 4.35579 8.71948L6.59235 10.956C6.89469 11.2584 7.38488 11.2584 7.68722 10.956L12.1603 6.48292Z'
      fill='#14C393'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM1.54839 8C1.54839 4.43687 4.43687 1.54839 8 1.54839C11.5631 1.54839 14.4516 4.43687 14.4516 8C14.4516 11.5631 11.5631 14.4516 8 14.4516C4.43687 14.4516 1.54839 11.5631 1.54839 8Z'
      fill='#14C393'
    />
  </svg>
)

const DiscountInput = ({ setCoupon, isValid }) => {
  const setCouponDebounced = useDebounce(
    value => value && setCoupon(value),
    1000
  )

  return (
    <label className={cx(styles.label, styles.label_card)}>
      Discount code
      <div className={styles.discount}>
        <Input
          className={styles.input}
          placeholder='2H8vZG5P'
          name='coupon'
          onChange={({ currentTarget: { value } }) => setCouponDebounced(value)}
        />
        {isValid && SuccessIcon}
      </div>
    </label>
  )
}

const CardInformation = () => {
  return (
    <div className={styles.card}>
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
            className={styles.input}
            name='address_country'
            placeholder='US'
            required
          />
        </label>
      </div>
    </div>
  )
}

const BillingAddress = () => {
  return (
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
            className={styles.input}
            placeholder='e.g. California'
            name='address_state'
            required
          />
        </label>
      </div>
    </div>
  )
}

const TotalPrice = ({ price, planWithBilling, percentOff }) => {
  const priceInt = +price.slice(1)
  const amountOff = percentOff ? Math.floor(priceInt * (percentOff / 100)) : 0

  return (
    <div className={styles.check}>
      <div className={styles.check__label}>
        {planWithBilling}
        <div>{price}</div>
      </div>
      {percentOff && (
        <div className={styles.check__label}>
          Discount code {percentOff}%
          <div className={styles.check__discount}>-${amountOff}</div>
        </div>
      )}
      <div className={styles.check__total}>
        Total due
        <div className={styles.check__price}>${priceInt - amountOff}</div>
      </div>
    </div>
  )
}

const Confirmation = ({
  plan,
  billing,
  yearPrice,
  monthPrice,
  nextPaymentDate,
  loading
}) => {
  const [coupon, setCoupon] = useState('')
  const planWithBilling = `${plan} ${billing}ly`
  const price = billing === 'year' ? yearPrice : monthPrice

  return (
    <div className={styles.confirmation}>
      <div className={styles.top}>
        Confirmation
        <div className={styles.confirmation__dai}>
          Payment with DAI?
          <a
            href='mailto:info@santiment.net'
            className={styles.confirmation__contact}
          >
            Contact us
          </a>
        </div>
      </div>

      <div className={cx(styles.confirmation__form, styles.form)}>
        <div className={styles.plan}>
          <div className={styles.plan__left}>
            <Icon type='checkmark' className={styles.plan__check} />
            {planWithBilling}
          </div>
          <div className={styles.plan__right}>
            <div>
              <b className={styles.plan__year}>{yearPrice}</b> / year
            </div>
            <div>
              <b className={styles.plan__month}>{monthPrice}</b> / month
            </div>
          </div>
        </div>

        <Query skip={!coupon} query={CHECK_COUPON} variables={{ coupon }}>
          {({ loading, error, data: { getCoupon } = {} }) => {
            const { isValid, percentOff } = getCoupon || {}
            return (
              <>
                <DiscountInput
                  error={error}
                  isValid={isValid}
                  setCoupon={setCoupon}
                />
                <div className={styles.hold}>
                  <Icon
                    className={styles.hold__icon}
                    type='question-round-small'
                  />
                  Holding 1000 SAN tokens will result in a 20% discount. Learn
                  how to buy SAN.
                </div>
                <TotalPrice
                  error={error}
                  percentOff={percentOff}
                  price={price}
                  planWithBilling={planWithBilling}
                />
              </>
            )
          }}
        </Query>

        <Dialog.Approve
          variant='fill'
          accent='positive'
          isLoading={loading}
          type='submit'
          className={styles.btn}
          fluid
        >
          Go {plan.toUpperCase()} now
        </Dialog.Approve>
        <h5 className={styles.expl}>
          Your card will be charged
          <b> {price} </b>
          every {billing} until you decide to downgrade or unsubscribe. Next
          payment:
          <b> {nextPaymentDate}</b>
        </h5>
      </div>
    </div>
  )
}

const CheckoutForm = ({
  stripe,
  plan,
  loading,
  billing,
  yearPrice,
  monthPrice,
  nextPaymentDate
}) => {
  return (
    <div className={styles.wrapper}>
      <CardInformation />
      <BillingAddress />
      <Confirmation
        plan={plan}
        billing={billing}
        loading={loading}
        yearPrice={yearPrice}
        monthPrice={monthPrice}
        nextPaymentDate={nextPaymentDate}
      />
    </div>
  )
}

export default CheckoutForm
