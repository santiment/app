import React from 'react'
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard'
import * as Sentry from '@sentry/react'
import Button from '@santiment-network/ui/Button'
import { ErrorSvg } from './utils'
import { showNotification } from '../../actions/rootActions'
import styles from './ErrorContent.module.scss'

const ErrorContent = ({ addNot }) => {
  function onClick (e) {
    copy(e.target.innerText)
    addNot({
      variant: 'success',
      title: 'Successfully copied on clipboard!'
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>Something went wrong</div>

        <div className={styles.error}>
          Error ID:{' '}
          <span className={styles.eventId} onClick={onClick}>
            {Sentry.lastEventId()}
          </span>
        </div>

        <div className={styles.description}>
          Our team has been notified, but you can send us more details.
        </div>

        {Sentry.lastEventId() && (
          <Button
            onClick={() => {
              Sentry.showReportDialog()
            }}
            variant='fill'
            accent='positive'
            className={styles.btn}
          >
            Send report
          </Button>
        )}
      </div>

      <ErrorSvg className={styles.img} />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addNot: message => dispatch(showNotification(message))
})

export default connect(
  null,
  mapDispatchToProps
)(ErrorContent)
