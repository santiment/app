import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as qs from 'query-string'
import * as actions from './../actions/types'

class LogoutPage extends React.Component {
  static defaultProps = {
    to: '/'
  }

  componentDidMount () {
    this.props.logout()
    const { to = this.props.to } = qs.parse(this.props.location.search)
    this.timeout = setTimeout(() => this.props.redirect(to), 3000)
  }

  componentWillUnmount () {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = 0
    }
  }

  render () {
    return (
      <section className='page'>
        <h1>Goodbuy...</h1>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({
      type: actions.USER_LOGOUT_SUCCESS
    })
  },
  redirect: (path = '/') => {
    dispatch(push(path))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(LogoutPage)
