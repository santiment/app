import React from 'react'
import * as Sentry from '@sentry/react'
import { Mutation, Query } from 'react-apollo'
import { connect } from 'react-redux'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import { store } from '../../redux'
import { showNotification } from '../../actions/rootActions'
import { useTrackEvents } from './../../hooks/tracking'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import { dateDifferenceInWords } from '../../utils/dates'
import LinkWithArrow from './Link'
import {
  ALL_INSIGHTS_BY_PAGE_QUERY,
  FEATURED_INSIGHTS_QUERY
} from '../../queries/InsightsGQL'
import { getSEOLinkFromIdAndTitle, publishDateSorter } from '../Insight/utils'
import { EMAIL_LOGIN_MUTATION } from '../SubscriptionForm/loginGQL'
import styles from './InsightsDropdown.module.scss'

const onClick = evt => {
  evt.stopPropagation()
}

const onSuccess = () => {
  store.dispatch(
    showNotification({
      variant: 'success',
      title: `Verification email has been sent`,
      dismissAfter: 8000
    })
  )
}

const onError = error => {
  store.dispatch(
    showNotification({
      variant: 'error',
      title: `We got an error while generating verification email. Please try again`,
      dismissAfter: 8000
    })
  )
  Sentry.captureException(error)
}

const SubscriptionForm = () => (
  <Mutation mutation={EMAIL_LOGIN_MUTATION}>
    {(loginEmail, { loading, error, data: { emailLogin } = {} }) => {
      const [trackEvent] = useTrackEvents()
      function onSubmit (e) {
        e.stopPropagation()
        e.preventDefault()

        if (loading) {
          return
        }

        const email = e.currentTarget.email.value

        loginEmail({ variables: { email, subscribeToWeeklyNewsletter: true } })
          .then(() => {
            trackEvent({
              category: 'User',
              action: `User requested an email for verification`
            })
            onSuccess()
          })
          .catch(onError)
      }

      return (
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            icon='mail'
            placeholder='Your email'
            iconPosition='left'
            className={styles.form__inputWrapper}
            inputClassName={styles.form__input}
            iconClassName={styles.form__icon}
            type='email'
            name='email'
            required
            disabled={loading}
          />
          <Button
            variant='fill'
            accent='positive'
            type='submit'
            disabled={loading}
          >
            Subscribe
          </Button>
        </form>
      )
    }}
  </Mutation>
)

const Insight = ({ id, title, publishedAt }) => {
  return (
    <a
      className={styles.insight}
      href={`https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(
        id,
        title
      )}`}
    >
      <div className={styles.insight__icon}>
        <svg
          width='12'
          height='12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.25 3.51c0-.3.25-.56.56-.56h6.47a.56.56 0 010 1.12H2.8a.56.56 0 01-.56-.56zM2.81 6a.56.56 0 000 1.13h3.2a.56.56 0 000-1.13h-3.2z'
            fill='#14C393'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0 1.71C0 .71.9 0 1.87 0h8.23c.96 0 1.87.7 1.87 1.71v8.56c0 1.01-.9 1.71-1.87 1.71H1.87c-.96 0-1.87-.7-1.87-1.71V1.7zm1.13 8.56v-.48h9.72v.48c0 .26-.27.59-.75.59H1.87c-.48 0-.75-.33-.75-.6zm0-1.6h9.72V1.7c0-.26-.27-.58-.75-.58H1.87c-.48 0-.75.32-.75.58v6.95z'
            fill='#14C393'
          />
        </svg>
      </div>
      <h3 className={styles.insight__title}>{title}</h3>
      <h4 className={styles.insight__date}>
        {dateDifferenceInWords({ from: new Date(publishedAt), to: new Date() })}
      </h4>
    </a>
  )
}

const Insights = props => (
  <Query {...props}>
    {({ data: { insights = [] } = {} }) =>
      insights
        .sort(publishDateSorter)
        .slice(0, 3)
        .map(insight => <Insight key={insight.id} {...insight} />)
    }
  </Query>
)

const InsightsDropdown = ({ isLoggedIn }) => (
  <div className={styles.wrapper}>
    <div className={styles.top}>
      <div className={styles.category}>
        <h3 className={styles.title}>
          Explore insights
          <LinkWithArrow to='https://insights.santiment.net/' title='See all' />
        </h3>
        <Insights
          query={ALL_INSIGHTS_BY_PAGE_QUERY}
          variables={{
            page: 1,
            pageSize: 3
          }}
        />
      </div>

      <div className={cx(styles.category, styles.category_featured)}>
        <h3 className={styles.title}>Featured insights</h3>
        <Insights query={FEATURED_INSIGHTS_QUERY} />
      </div>
    </div>
    {isLoggedIn || (
      <div className={styles.bottom} onClick={onClick}>
        <div className={styles.text}>
          <h2 className={styles.bottom__title}>Want more crypto insights?</h2>
          <h4 className={styles.bottom__desc}>
            Subscribe to Santiment’s weekly market Digest!
          </h4>
        </div>
        <SubscriptionForm />
      </div>
    )}
  </div>
)

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(InsightsDropdown)
