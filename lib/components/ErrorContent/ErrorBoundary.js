import React, { Component } from 'react';
import * as Sentry from '@sentry/react';
import ErrorContent from './ErrorContent';

class ErrorBoundary extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: null
    };
  }

  setError(error) {
    this.setState({
      error
    });
  }

  componentDidCatch(error, errorInfo) {
    this.setError(error);
    Sentry.captureException(error, {
      extra: errorInfo
    });
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.state.error) {
        this.setError();
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    if (this.state.error) {
      return /*#__PURE__*/React.createElement(ErrorContent, null);
    } else {
      return this.props.children;
    }
  }

}

export default ErrorBoundary;