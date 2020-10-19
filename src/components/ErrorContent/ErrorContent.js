import React from 'react'
import * as Sentry from '@sentry/react'
import Button from '@santiment-network/ui/Button'
import { ErrorSvg } from './utils'
import styles from './ErrorContent.module.scss'

const ErrorContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>Something went wrong</div>

        <div className={styles.errorId}>Error ID: {Sentry.lastEventId()}</div>

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

export default ErrorContent
