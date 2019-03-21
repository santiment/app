import React from 'react'
import GetSignals from './GetSignals'

const SignalsFeed = () => (
  <GetSignals
    render={({ signals, isError, isLoading }) => {
      return (
        <div>
          {isLoading ? 'loading...' : ''}
          {isError ? 'error' : ''}
          {signals.map(signal => (
            <div key={signal.id}>
              {signal.title}
              {signal.id}
              {signal.description}
              {JSON.stringify(signal)}
            </div>
          ))}
        </div>
      )
    }}
  />
)

export default SignalsFeed
