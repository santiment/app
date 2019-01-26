import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/types'

class LogoutPage extends React.Component {
  componentWillMount () {
    this.props.logout()
    if (this.props.to) {
      window.location = this.props.to
    }
  }

  render () {
    return <section>Goodbuy...</section>
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({
      type: actions.USER_LOGOUT_SUCCESS
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(LogoutPage)
