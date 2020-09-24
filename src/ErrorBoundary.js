import React, { Component } from 'react'
import * as Sentry from '@sentry/react'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'

class ErrorBoundary extends Component {
  state = {
    error: null
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ error })
    Sentry.captureException(error, { extra: errorInfo })
  }

  render () {
    if (this.state.error) {
      return (
        <div
          className='page wrapper'
          style={{
            marginTop: '2em'
          }}
        >
          <Panel
            style={{
              background: 'var(--persimmon-light)',
              borderColor: 'var(--persimmon-hover)'
            }}
          >
            <Panel.Title
              withPadding
              style={{
                fontSize: '27px',
                color: '#912d2b'
              }}
            >
              We're sorry — something's gone wrong.
            </Panel.Title>
            <Panel.Content
              withPadding
              style={{
                fontSize: '23px',
                color: '#9f3a38',
                margin: '-23px 0 12px'
              }}
            >
              {Sentry.lastEventId() && <p>Error ID: {Sentry.lastEventId()}</p>}
              <p>
                Our team has been notified, but you can send us more details. We
                appreciate you.
              </p>
              {Sentry.lastEventId() && (
                <Button
                  onClick={() => {
                    Sentry.showReportDialog()
                  }}
                  variant='fill'
                  accent='grey'
                >
                  Send report
                </Button>
              )}
            </Panel.Content>
          </Panel>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
