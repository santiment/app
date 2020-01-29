import React from 'react'
import { ERRORS } from '../GetTimeSeries/reducers'

const ErrorRequest = ({ errorType }) =>
  errorType === ERRORS.COMPLEXITY ? (
    <div>
      Too complexed request
      <br />
      Decrease number of points
    </div>
  ) : (
    <div>Something is going wrong</div>
  )

export default ErrorRequest
