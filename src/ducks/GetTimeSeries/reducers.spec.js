import reducers, { ERRORS } from './reducers'
import * as actions from './actions'

const networkError = {
  name: 'ServerError',
  response: {},
  statusCode: 400,
  result: {
    errors: [
      {
        locations: [
          {
            column: 0,
            line: 2
          }
        ],
        message:
          'Field historyPrice is too complex: complexity is 155520 and maximum is 10000'
      },
      {
        locations: [
          {
            column: 0,
            line: 1
          }
        ],
        message:
          'Operation historyPrice is too complex: complexity is 155520 and maximum is 10000'
      }
    ]
  }
}

describe('timeseries reducer', () => {
  test('TIMESERIES should return error, after failed request', () => {
    const action = {
      type: actions.TIMESERIES_FETCH_FAILED,
      payload: {
        networkError
      }
    }
    const prevState = {
      timeseries: {
        isError: false,
        errorType: ''
      }
    }

    const state = reducers(prevState, action)
    expect(state.isError).toEqual(true)
    expect(state.errorType).toEqual(ERRORS.COMPLEXITY)
  })
})
