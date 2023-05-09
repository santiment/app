import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as qs from 'query-string';
import { customerData$ } from 'san-webkit/lib/stores/user';
import { subscription$ } from 'san-webkit/lib/stores/subscription';
import * as actions from '../../actions/types';

class LogoutPage extends React.Component {
  componentDidMount() {
    this.props.logout();
    const {
      to = this.props.to
    } = qs.parse(this.props.location.search);
    this.timeout = setTimeout(() => {
      this.props.redirect(to);
      subscription$.refetch();
      customerData$.refetch();
    }, 3000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("section", {
      className: "page"
    }, /*#__PURE__*/React.createElement("h1", null, "Goodbye..."));
  }

}

LogoutPage.defaultProps = {
  to: '/'
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({
      type: actions.USER_LOGOUT
    });
  },
  redirect: (path = '/') => {
    dispatch(push(path));
  }
});

export default connect(null, mapDispatchToProps)(LogoutPage);