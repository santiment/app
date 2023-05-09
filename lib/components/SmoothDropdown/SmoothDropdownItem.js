import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SmoothDropdownContext } from './SmoothDropdown';

class SmoothDropdownItem extends Component {
  constructor(...args) {
    super(...args);
    this.triggerRef = /*#__PURE__*/React.createRef();
  }

  componentDidMount() {
    this.mountTimer = setTimeout(() => this.forceUpdate(), 0); // VERY HACKY - NECESSARY TO UPDATE DROPDOWN IN DOM
  }

  componentWillUnmount() {
    clearTimeout(this.mountTimer);
    this.triggerRef = null;
  }

  render() {
    const {
      trigger,
      children,
      className = '',
      onOpen: propsOnOpen,
      onClose,
      ddParams
    } = this.props;
    const {
      triggerRef: {
        current: ddTrigger
      }
    } = this;

    if (!trigger) {
      return null;
    }

    return /*#__PURE__*/React.createElement(SmoothDropdownContext.Consumer, null, ({
      handleMouseEnter,
      handleMouseLeave,
      setupDropdownContent
    }) => {
      const onOpen = () => {
        handleMouseEnter(this, ddTrigger);
        propsOnOpen && propsOnOpen();
      };

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        onMouseEnter: onOpen,
        onTouchStart: onOpen,
        onTouchCancel: () => {
          handleMouseLeave();
          onClose && onClose();
        },
        onMouseLeave: () => {
          handleMouseLeave();
          onClose && onClose();
        },
        className: `dd__trigger ${className}`,
        ref: this.triggerRef
      }, trigger), setupDropdownContent(this, children, ddParams));
    });
  }

}

SmoothDropdownItem.propTypes = {
  children: PropTypes.any.isRequired,
  trigger: PropTypes.element.isRequired
};
export default SmoothDropdownItem;