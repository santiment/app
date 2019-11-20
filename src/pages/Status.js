import React from 'react'
import Button from '@santiment-network/ui/Button'

const Status = () => {
  return (
    <div
      style={{
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <h1>
        <Button accent='positive' variant='fill'>
          All System Operational!
        </Button>
      </h1>
    </div>
  )
}

export default Status
