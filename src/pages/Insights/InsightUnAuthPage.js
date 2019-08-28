import React from 'react'
import { withRouter } from 'react-router-dom'
import { Panel, Button, Icon } from '@santiment-network/ui'

const InsightUnAuthPage = ({ history, target = 'insights' }) => {
  return (
    <Panel padding>
      <h2>Create an account to get your Sanbase experience.</h2>
      <p>
        By having a Sanbase account, you can see more data and {target} about
        crypto projects. You can vote and comment on all you favorite {target}{' '}
        and more.
      </p>
      <Button
        variant='fill'
        accent='positive'
        onClick={() =>
          history.push(`/login?redirect_to=${history.location.pathname}`)
        }
        color='green'
      >
        <Icon type='checkmark' /> &nbsp;Get started
      </Button>
    </Panel>
  )
}

export default withRouter(InsightUnAuthPage)
