import React from 'react'
import { Button } from '@santiment-network/ui'
import { connect } from 'react-redux'
import * as actions from './actions'

export const SignalMaster = ({ createTrigger, fetchTriggers }) => {
  return (
    <div>
      <Button
        onClick={() =>
          createTrigger({
            settings: {
              target: 'santiment',
              type: 'price_percent_change',
              channel: 'telegram',
              time_window: '1d',
              percent_threshold: 5.0
            },
            isPublic: false,
            title: 'Example',
            description: 'any',
            cooldown: '30m'
          })
        }
      >
        Create
      </Button>
      <Button onClick={fetchTriggers}>fetch Signals</Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch({
      type: actions.SIGNAL_CREATE,
      payload
    })
  },
  fetchTriggers: () => {
    dispatch({
      type: actions.SIGNAL_FETCH_ALL
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignalMaster)
