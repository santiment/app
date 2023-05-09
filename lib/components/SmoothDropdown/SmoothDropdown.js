function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import './SmoothDropdown.scss';
const modalRoot = document.getElementById('dd-modal');
let ddTemplate;

if (modalRoot) {
  ddTemplate = modalRoot.querySelector('#dd-template');
}

export const SmoothDropdownContext = /*#__PURE__*/React.createContext({
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  setupDropdownContent: () => {}
});

class SmoothDropdown extends Component {
  constructor(...args) {
    super(...args);
    this.portalRef = /*#__PURE__*/React.createRef();
    this.dropdownWrapperRef = /*#__PURE__*/React.createRef();
    this.ddContainer = ddTemplate.cloneNode(true).firstElementChild;
    this.ddItemsRef = new WeakMap();
    this.ddItemsStyles = new WeakMap();
    this.state = {
      currentTrigger: null,
      currentDropdown: null,
      ddFirstTime: false,
      arrowCorrectionX: 0,
      dropdownStyles: {},
      ddItems: new Map()
    };

    this.handleTouchEvent = evt => {
      if (this.dropdownWrapperRef && !this.dropdownWrapperRef.current.contains(evt.target)) {
        this.handleMouseLeave();
      }
    };

    this.startCloseTimeout = () => {
      this.dropdownTimer = setTimeout(() => this.closeDropdown(), this.props.closeAfterTimeout);
    };

    this.stopCloseTimeout = () => clearTimeout(this.dropdownTimer);

    this.handleMouseEnter = (ddItem, trigger) => {
      this.stopCloseTimeout();
      this.openDropdown(ddItem, trigger);
    };

    this.handleMouseLeave = () => this.startCloseTimeout();

    this.isCurrentDropdown = ddItem => {
      const {
        currentDropdown
      } = this.state;
      const dropdownItem = this.ddItemsRef.get(ddItem).current;
      return currentDropdown !== dropdownItem.querySelector('.dd__content');
    };

    this.setupDropdownContent = (ddItem, ddContent, ddStyles = {}) => {
      setTimeout(() => {
        if (!this.ddItemsRef.has(ddItem)) {
          this.ddItemsRef.set(ddItem, /*#__PURE__*/React.createRef());
          this.ddItemsStyles.set(ddItem, ddStyles);
          this.setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
            ddItems: new Map([...prevState.ddItems, [ddItem, ddContent]])
          }));
        }

        const dropdownItem = this.ddItemsRef.get(ddItem).current;
        const {
          currentDropdown,
          dropdownStyles: {
            width: widthPx,
            height: heightPx
          }
        } = this.state;

        if (!dropdownItem || this.isCurrentDropdown(ddItem)) {
          return;
        }

        if (currentDropdown.clientHeight !== parseInt(heightPx, 10) || currentDropdown.clientWidth !== parseInt(widthPx, 10)) {
          if (this.ddContainer) {
            this.setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
              dropdownStyles: _objectSpread(_objectSpread({}, prevState.dropdownStyles), {}, {
                width: currentDropdown.clientWidth + 'px',
                height: currentDropdown.clientHeight + 'px'
              })
            }));
          }
        }
      }, 0);
    };

    this.makePx = value => value + 'px';

    this.openDropdown = (ddItem, trigger) => {
      let dropdownItem = this.ddItemsRef ? this.ddItemsRef.get(ddItem) : undefined;
      dropdownItem = dropdownItem ? dropdownItem.current : undefined;
      if (!dropdownItem) return;
      const {
        verticalOffset,
        verticalMotion
      } = this.props;
      const ddContent = dropdownItem.querySelector('.dd__content');

      if (!this.dropdownWrapperRef.current || !trigger) {
        return;
      }

      const {
        height: ddWrapperHeight,
        top: ddWrapperTop
      } = this.dropdownWrapperRef.current.getBoundingClientRect();
      const {
        top: triggerTop,
        left: triggerLeft,
        height: triggerHeight
      } = trigger.getBoundingClientRect();
      const leftOffset = triggerLeft - (ddContent.clientWidth - trigger.clientWidth) / 2;
      const topOffset = (verticalMotion ? triggerTop + triggerHeight : ddWrapperTop + ddWrapperHeight) + window.scrollY;
      const correction = this.getViewportOverflowCorrection(trigger, ddContent);
      const {
        offsetX = 0,
        offsetY = 0,
        position
      } = this.ddItemsStyles.get(ddItem) || {};
      let left = this.makePx(leftOffset - correction.left);
      let top = this.makePx(topOffset + verticalOffset);
      const width = this.makePx(ddContent.clientWidth);
      const height = this.makePx(ddContent.clientHeight);

      if (position === 'start') {
        left = this.makePx(triggerLeft + offsetX);
        top = this.makePx(topOffset + verticalOffset + offsetY);
      }

      const dropdownStyles = {
        left,
        top,
        width,
        height
      };

      if (this.state.currentTrigger) {
        this.state.currentTrigger.triggerRef.current.classList.remove('active');
      }

      if (ddItem.triggerRef) {
        ddItem.triggerRef.current.classList.add('active');
      }

      this.setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
        currentTrigger: ddItem,
        currentDropdown: ddContent,
        ddFirstTime: prevState.currentTrigger === null,
        dropdownStyles,
        arrowCorrectionX: correction.left
      }));
    };

    this.closeDropdown = () => {
      if (this.state.currentTrigger) {
        this.state.currentTrigger.triggerRef.current.classList.remove('active');
      }

      this.setState(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
        currentTrigger: null,
        currentDropdown: null
      }));
    };
  }

  componentDidMount() {
    modalRoot.appendChild(this.ddContainer); // GarageInc: HACK for IOS(IPAD and etc) which can't handle mouseLeave/touchCancel/blur events

    document.addEventListener('touchstart', this.handleTouchEvent);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.ddContainer);
    this.ddContainer = null;
    this.portalContainer = null;
    this.bgNode = null;
    this.arrowNode = null;
    this.portalRef = null;
    this.dropdownWrapperRef = null;
    document.removeEventListener('touchstart', this.handleTouchEvent);
  }

  componentWillMount() {
    this.portalContainer = this.ddContainer.querySelector('.dd__list');
    this.bgNode = this.ddContainer.querySelector('.dd__bg');
    this.arrowNode = this.ddContainer.querySelector('.dd__arrow');
  }

  getViewportOverflowCorrection(trigger, ddContent) {
    const {
      screenEdgeXOffset
    } = this.props;
    const correction = {
      left: 0
    };
    const triggerViewport = trigger.getBoundingClientRect();
    const ddLeftCornerX = triggerViewport.left - (ddContent.clientWidth - triggerViewport.width) / 2;
    const ddRightCornerX = ddLeftCornerX + ddContent.clientWidth;

    if (ddRightCornerX > window.innerWidth) {
      correction.left = ddRightCornerX - window.innerWidth + screenEdgeXOffset;
    } else if (ddLeftCornerX < 0) {
      correction.left = ddLeftCornerX - screenEdgeXOffset;
    }

    return correction;
  }

  render() {
    const {
      children,
      className = '',
      showArrow
    } = this.props;
    const {
      currentTrigger,
      dropdownStyles,
      ddFirstTime,
      arrowCorrectionX,
      ddItems
    } = this.state;
    const {
      handleMouseEnter,
      handleMouseLeave,
      setupDropdownContent
    } = this;
    this.ddContainer.classList.toggle('has-dropdown-active', currentTrigger !== null);
    this.ddContainer.classList.toggle('dd-first-time', ddFirstTime);

    _extends(this.ddContainer.style, dropdownStyles);

    this.arrowNode.style.left = `calc(50% + ${arrowCorrectionX}px)`;
    this.arrowNode.style.display = showArrow ? 'block' : 'none';
    return /*#__PURE__*/React.createElement("div", {
      ref: this.dropdownWrapperRef,
      className: `dd-wrapper ${className}`
    }, /*#__PURE__*/React.createElement(SmoothDropdownContext.Provider, {
      value: {
        handleMouseEnter,
        handleMouseLeave,
        setupDropdownContent
      }
    }, children), /*#__PURE__*/ReactDOM.createPortal([...ddItems.entries()].map(([ddItem, dropdownNode], i) => {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: cx({
          dd__item: true,
          active: ddItem === currentTrigger
        }),
        ref: this.ddItemsRef.get(ddItem)
      }, /*#__PURE__*/React.createElement("div", {
        className: "dd__content",
        onTouchStart: handleMouseEnter,
        onMouseEnter: handleMouseEnter,
        onTouchEnd: handleMouseLeave,
        onTouchCancel: handleMouseLeave,
        onMouseLeave: handleMouseLeave,
        onBlur: handleMouseLeave,
        onClick: handleMouseLeave
      }, dropdownNode));
    }), this.portalContainer));
  }

}

SmoothDropdown.propTypes = {
  children: PropTypes.any,
  showArrow: PropTypes.bool,
  verticalMotion: PropTypes.bool,
  verticalOffset: PropTypes.number,
  screenEdgeXOffset: PropTypes.number,
  closeAfterTimeout: PropTypes.number
};
SmoothDropdown.defaultProps = {
  verticalMotion: false,
  showArrow: true,
  verticalOffset: 10,
  screenEdgeXOffset: 10,
  closeAfterTimeout: 150
};
export default SmoothDropdown;