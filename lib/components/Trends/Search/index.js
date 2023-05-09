import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { InputWithIcon } from '@santiment-network/ui';
import Button from '@santiment-network/ui/Button';
import { gotoExplore } from './utils.js';
import styles from './index.module.css';
export const DEFAULT_TEXT = 'Search for assets, trends...';
export class TrendsSearchForm extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      topic: this.props.defaultTopic || ''
    };

    this.handleSubmit = evt => {
      evt.preventDefault();
      this.props.gotoExplore(this.state.topic);
    };

    this.handleChange = evt => {
      this.setState({
        topic: evt.currentTarget.value
      });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.defaultTopic !== prevProps.defaultTopic) {
      this.setState({
        topic: this.props.defaultTopic
      });
    }
  }

  render() {
    const {
      classes: {
        wrapper: className,
        input: inputClassName
      },
      withButton
    } = this.props;
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit,
      className: cx(styles.wrapper, className)
    }, /*#__PURE__*/React.createElement(InputWithIcon, {
      type: "text",
      icon: "search-small",
      iconPosition: "left",
      className: cx(styles.input, inputClassName, withButton && styles.withButton),
      iconClassName: styles.icon,
      placeholder: DEFAULT_TEXT,
      value: this.state.topic,
      onChange: this.handleChange
    }), withButton && /*#__PURE__*/React.createElement(React.Fragment, null, this.state.topic ? /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "fill",
      accent: "positive",
      className: styles.button
    }, "Go") : /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "fill",
      accent: "positive",
      as: Link,
      to: "/labs/trends/explore/",
      className: styles.button
    }, "Go")));
  }

}
TrendsSearchForm.defaultProps = {
  classes: {}
};
export default connect(null, gotoExplore)(TrendsSearchForm);