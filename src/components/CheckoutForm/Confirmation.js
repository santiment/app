import React, { useState } from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import Dialog from '@santiment-network/ui/Dialog'
import { useDebounce } from '../../hooks'
import sharedStyles from './CheckoutForm.module.scss'
import styles from './Confirmation.module.scss'

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
        {isValid && <Icon type='success-round' className={styles.valid} />}
      </div>
    </label>
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
    <div className={sharedStyles.confirmation}>
      <div className={sharedStyles.top}>
        Confirmation
        <div className={styles.dai}>
          Payment with DAI?
          <a href='mailto:info@santiment.net' className={styles.contact}>
            Contact us
          </a>
        </div>
      </div>

      <div className={cx(sharedStyles.form, styles.form)}>
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

export default Confirmation
