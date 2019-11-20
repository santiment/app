import React from 'react'
import Message from '@santiment-network/ui/Message'

const AssetsTableErrorMessage = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh'
    }}
  >
    <Message variant='warn'>
      <div>
        <h5>We're sorry, something has gone wrong on our server.</h5>
        <p>Please try again later.</p>
      </div>
    </Message>
  </div>
)

export default AssetsTableErrorMessage
