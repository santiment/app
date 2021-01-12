import React, { useState } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon'
import Input from '@santiment-network/ui/Input'
import Dialog from '@santiment-network/ui/Dialog'
import { useDebounce } from '../../hooks'
import { formatOnlyPrice, getAlternativeBillingPlan } from '../../utils/plans'
import { usePlans } from '../../ducks/Plans/hooks'
import PlansDropdown from './PlansDropdown'
import sharedStyles from './CheckoutForm.module.scss'
import styles from './Confirmation.module.scss'

const CHECK_COUPON_QUERY = gql`
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

const mapStateToProps = state => ({
  hasSanDiscount: state.user.data.sanBalance >= 1000
})

const TotalPrice = connect(mapStateToProps)(
  ({ price, planWithBilling, percentOff, hasSanDiscount }) => {
    const resultPercentOff = percentOff || (hasSanDiscount && 20)
    const priceInt = +price.slice(1)
    const amountOff = resultPercentOff
      ? Math.floor(priceInt * (resultPercentOff / 100))
      : 0

    const discountMsg = percentOff
      ? 'Discount code'
      : hasSanDiscount && 'SAN Holder discount'

    return (
      <div className={styles.check}>
        <div className={styles.check__label}>
          {planWithBilling}
          <div>{price}</div>
        </div>
        {resultPercentOff && (
          <div className={styles.check__label}>
            {discountMsg} {resultPercentOff}%
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
)

const DiscountIcon = ({ isValid }) => {
  if (isValid === undefined) return null

  return (
    <Icon
      type={isValid ? 'success-round' : 'error'}
      className={cx(styles.discount__icon, isValid && styles.valid)}
    />
  )
}

const DiscountInput = ({ setCoupon, isValid }) => {
  const setCouponDebounced = useDebounce(value => setCoupon(value), 500)

  return (
    <label className={cx(styles.label, styles.label_card)}>
      Discount code
      <div className={styles.discount}>
        <Input
          className={styles.input}
          placeholder='2H8vZG5P'
          name='coupon'
          data-is-valid={isValid}
          onChange={({ currentTarget: { value } }) => setCouponDebounced(value)}
        />
        <DiscountIcon isValid={isValid} />
      </div>
    </label>
  )
}

const Confirmation = ({
  plan: name,
  billing,
  price,
  nextPaymentDate,
  loading,
  changeSelectedPlan
}) => {
  const [plans] = usePlans()
  const [coupon, setCoupon] = useState('')
  const planWithBilling = `${name} ${billing}ly`
  const plan = { name: name.toUpperCase(), interval: billing, amount: price }
  const altPlan = getAlternativeBillingPlan(plans, plan) || {}

  return (
    <div className={sharedStyles.confirmation}>
      <div className={cx(sharedStyles.form, styles.form)}>
        <div className={styles.plan}>
          <PlansDropdown
            title={planWithBilling}
            plan={plan}
            altPlan={altPlan}
            onBillingSelect={changeSelectedPlan}
          />
          <div className={styles.plan__right}>
            <div>
              <b className={styles.plan__year}>{formatOnlyPrice(price)}</b> /{' '}
              {billing}
            </div>
          </div>
        </div>
        <Query
          skip={!coupon}
          query={CHECK_COUPON_QUERY}
          variables={{ coupon }}
          fetchPolicy='no-cache'
        >
          {({ loading, error, data: { getCoupon } = {} }) => {
            // NOTE: Seems like graphql is caching the last value after error even with no-cache [@vanguard | Dec 16, 2019]
            const { isValid, percentOff } = error ? {} : getCoupon || {}
            return (
              <>
                <DiscountInput
                  isValid={!error && isValid}
                  setCoupon={setCoupon}
                />
                <div className={styles.hold}>
                  <Icon className={styles.hold__icon} type='info-round' />
                  Holding 1000 SAN tokens will result in a 20% discount.
                  <a
                    href='https://santiment.net/about-santiment/how-to-buy-san/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.learn}
                  >
                    Learn how to buy SAN.
                  </a>
                </div>
                <TotalPrice
                  error={error}
                  percentOff={isValid && percentOff}
                  price={formatOnlyPrice(price)}
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
          Go {name.toUpperCase()} now
        </Dialog.Approve>
        <h5 className={styles.expl}>
          Your card will be charged
          <b> {formatOnlyPrice(price)} </b>
          every {billing} until you decide to downgrade or unsubscribe. Next
          payment:
          <b> {nextPaymentDate}</b>
        </h5>
      </div>
    </div>
  )
}

export default Confirmation
