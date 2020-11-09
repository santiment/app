import React from 'react'
import cx from 'classnames'
import DETAILS from './details'
import {
  getAltPrice,
  isSameAsUserPlan,
  PlanBtn
} from '../../../components/Plans/Plan'
import PLANS from './../../../components/Plans/list'
import { formatPrice, getShowingPlans } from '../../../utils/plans'
import styles from './PlanDetails.module.scss'

const MarkIcon = ({ className }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.5942 9.28562C17.8791 8.96685 17.8517 8.47745 17.5329 8.19252C17.2141 7.90759 16.7247 7.93503 16.4398 8.25381L10.9682 14.3754L8.37111 11.6208C8.0778 11.3097 7.58785 11.2953 7.27676 11.5886C6.96567 11.8819 6.95125 12.3719 7.24455 12.683L10.4201 16.0511C10.5689 16.2089 10.7769 16.297 10.9937 16.2941C11.2105 16.2913 11.4161 16.1976 11.5606 16.036L17.5942 9.28562Z'
    />
  </svg>
)

const all = [true, true]

const PlanDetails = ({ billing, plans, subscription }) => {
  const showingPlans = getShowingPlans(plans, billing)
  const userPlan = subscription && subscription.plan.id

  return (
    <table className={styles.table}>
      <tbody>
        <tr className={styles.headers}>
          <th className={styles.head} key='empty'>
            {''}
          </th>
          {showingPlans.map(({ id, name, amount }) => {
            const card = PLANS[name]

            const sameAsUserPlan = isSameAsUserPlan(subscription, id, userPlan)
            const { altPrice } = getAltPrice(plans, billing, name)
            const [price, priceType] = formatPrice(amount, name, billing)

            return (
              <th key={id} className={cx(styles.th, styles.cell)}>
                <div className={styles.title}>
                  <div className={styles.name}>{card.title}</div>

                  <div className={styles.description}>
                    {card.discount || (
                      <div>
                        {price} {priceType}
                      </div>
                    )}
                  </div>
                </div>

                <PlanBtn
                  subscription={subscription}
                  sameAsUserPlan={sameAsUserPlan}
                  card={card}
                  altPrice={altPrice}
                  amount={amount}
                  billing={billing}
                  id={id}
                  btnProps={{
                    accent: 'orange'
                  }}
                />
              </th>
            )
          })}
        </tr>
        {DETAILS.rows.map((row, i) => (
          <React.Fragment key={i}>
            <tr>
              <td
                className={cx(styles.group, styles.cell, styles.noRightBorder)}
              >
                {row.group.name}
              </td>

              {all.map(() => (
                <td className={cx(styles.cell, styles.noRightBorder)} />
              ))}
            </tr>
            {row.data.map(({ name, checks, texts }) => {
              const checkboxes = !texts ? checks || all : undefined

              return (
                <tr key={name}>
                  <td className={cx(styles.cell, styles.feature__title)}>
                    {name}
                  </td>
                  {checkboxes &&
                    checkboxes.map((check, y) => (
                      <td
                        key={y}
                        className={cx(
                          styles.cell,
                          styles.feature__cell,
                          !check && styles.feature__check__grey
                        )}
                      >
                        {check && (
                          <MarkIcon
                            className={cx(
                              styles.feature__check,
                              y === 0 && styles.feature__check__green
                            )}
                          />
                        )}
                      </td>
                    ))}
                  {texts &&
                    texts.map((text, y) => (
                      <td
                        key={y}
                        className={cx(styles.cell, styles.feature__cell)}
                      >
                        {text}
                      </td>
                    ))}
                </tr>
              )
            })}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default PlanDetails
