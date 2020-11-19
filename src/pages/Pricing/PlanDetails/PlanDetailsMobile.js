import React, { useMemo } from 'react'
import cx from 'classnames'
import ReactSwipe from 'react-swipe'
import { PlanCard } from './PlanCard'
import DETAILS from './details'
import { MarkIcon } from './PlanDetailsDesktop'
import { useSwipeState } from '../../../components/SwipablePages/SwipablePages'
import externalStyles from './PlanDetails.module.scss'
import styles from './PlanDetailsMobile.module.scss'

const PlanDetailsMobile = ({
  showingPlans,
  userPlan,
  subscription,
  plans,
  billing
}) => {
  const { active, onChange } = useSwipeState()

  const all = useMemo(() => new Array(showingPlans.length).fill(true), [
    showingPlans
  ])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ReactSwipe
          className={styles.swipeContainer}
          swipeOptions={{
            callback: onChange,
            continuous: false,
            startSlide: active
          }}
        >
          {showingPlans.map(plan => (
            <div key={plan.id}>
              <PlanCard
                plan={plan}
                key={plan.id}
                plans={plans}
                subscription={subscription}
                userPlan={userPlan}
                billing={billing}
                classes={styles}
              />
            </div>
          ))}
        </ReactSwipe>

        <div className={styles.dots}>
          {showingPlans.map((item, index) => {
            return (
              <svg
                className={cx(styles.dot, index === active && styles.active)}
                key={index}
                width='6'
                height='6'
                viewBox='0 0 6 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='3' cy='3' r='3' fill='inherit' />
              </svg>
            )
          })}
        </div>
      </div>

      <table className={cx(externalStyles.table, styles.table)}>
        <tbody>
          {DETAILS.rows.map((row, i) => (
            <React.Fragment key={i}>
              <tr className={externalStyles.row}>
                <td
                  className={cx(
                    externalStyles.group,
                    externalStyles.cell,
                    externalStyles.noRightBorder
                  )}
                >
                  {row.group.name}
                </td>

                <td className={externalStyles.cell} />
              </tr>
              {row.data.map(({ name, checks, texts }) => {
                const checkboxes = !texts ? checks || all : undefined
                return (
                  <tr key={name} className={externalStyles.row}>
                    <td
                      className={cx(
                        externalStyles.cell,
                        externalStyles.feature__title
                      )}
                    >
                      {name}
                    </td>
                    {checkboxes && (
                      <td
                        className={cx(
                          externalStyles.cell,
                          externalStyles.feature__cell,
                          !checkboxes[active] &&
                            externalStyles.feature__check__grey
                        )}
                      >
                        {checkboxes[active] && (
                          <MarkIcon
                            className={cx(
                              externalStyles.feature__check,
                              active === 0 &&
                                externalStyles.feature__check__green
                            )}
                          />
                        )}
                      </td>
                    )}
                    {texts && (
                      <td
                        className={cx(
                          externalStyles.cell,
                          externalStyles.feature__cell
                        )}
                      >
                        {texts[active]}
                      </td>
                    )}
                  </tr>
                )
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlanDetailsMobile
