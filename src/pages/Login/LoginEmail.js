import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAnalytics from 'react-ga'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import gql from 'graphql-tag'
import cx from 'classnames'
import { Mutation } from 'react-apollo'
import styles from './index.module.scss'

const mutation = gql`
  mutation($email: String!, $consent: String!) {
    emailLogin(email: $email, consent: $consent) {
      success
    }
  }
`

export default () => {
  return (
    <Mutation mutation={mutation}>
      {(
        loginEmail,
        { loading, error, data: { emailLogin: { success } = {} } = {} }
      ) => (
        <>
          <h2 className={cx(styles.title, styles.email__title)}>
            Authenticate
          </h2>
          {success ? (
            <h3 className={styles.email__subtitle}>
              We sent an email to you. Please log in to email provider and click
              the confirm link
            </h3>
          ) : (
            <>
              <h3 className={styles.email__subtitle}>
                To sign up or log in, fill in your email address below:
              </h3>
              <form
                className={styles.email__form}
                onSubmit={e => {
                  e.preventDefault()

                  GoogleAnalytics.event({
                    category: 'User',
                    action: 'Choose an email provider'
                  })
                  loginEmail({
                    variables: {
                      email: e.currentTarget.email.value,
                      consent: ''
                    }
                  })
                }}
              >
                <Input
                  placeholder='your@email.com'
                  name='email'
                  type='email'
                  required
                />
                <Button
                  variant='fill'
                  accent='positive'
                  className={styles.email__btn}
                  type='submit'
                  disabled={loading}
                >
                  {loading ? 'Waiting...' : 'Continue'}
                </Button>
              </form>
            </>
          )}
          <Link to='/login' className={styles.email__link}>
            <Icon className={styles.email__pointer} type='pointer-right' />
            All login options
          </Link>
        </>
      )}
    </Mutation>
  )
}
