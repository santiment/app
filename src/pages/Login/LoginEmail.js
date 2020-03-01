import React from 'react'
import { Link } from 'react-router-dom'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import gql from 'graphql-tag'
import cx from 'classnames'
import { Mutation } from 'react-apollo'
import GA from '../../utils/tracking'
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
        <div className={styles.loginViaEmail}>
          <h2 className={cx(styles.title, styles.email__title)}>
            Welcome back
          </h2>
          {success ? (
            <h3 className={styles.email__subtitle}>
              We sent an email to you. Please log in to email provider and click
              the confirm link
            </h3>
          ) : (
            <>
              <h3 className={styles.email__subtitle}>
                Log in to your Sanbase account to access additional features of
                our platform
              </h3>
              <form
                className={styles.email__form}
                onSubmit={e => {
                  e.preventDefault()

                  GA.event({
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
                  placeholder='Your email'
                  name='email'
                  type='email'
                  icon='mail'
                  iconPosition='left'
                  required
                  className={styles.emailInput}
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
            Or choose{' '}
            <Link to={'/login'} className={styles.loginLink}>
              another log in option
            </Link>
          </Link>
        </div>
      )}
    </Mutation>
  )
}
