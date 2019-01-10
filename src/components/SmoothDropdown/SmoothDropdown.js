import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './SmoothDropdown.css'

export const ddAsyncUpdateTimeout = 95

const modalRoot = document.getElementById('dd-modal')
const ddTemplate = modalRoot.querySelector('#dd-template').content

export const SmoothDropdownContext = React.createContext({
  portal: {},
  currentTrigger: null,
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  startCloseTimeout: () => {},
  stopCloseTimeout: () => {}
})

class SmoothDropdown extends Component {
  portalRef = React.createRef()
  dropdownWrapperRef = React.createRef()

  /* portalContainer = document.createElement('div') */

  ddContainer = ddTemplate.cloneNode(true).firstElementChild

  portalContainer = this.ddContainer.querySelector('.dd__list')
  bgNode = this.ddContainer.querySelector('.dd__bg')
  arrowNode = this.ddContainer.querySelector('.dd__arrow')

  state = {
    currentTrigger: null,
    ddFirstTime: false,
    arrowCorrectionX: 0,
    dropdownStyles: {}
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    verticalMotion: PropTypes.bool
  }

  componentDidMount () {
    /* this.mountTimer = setTimeout(() => this.forceUpdate(), ddAsyncUpdateTimeout) // HACK TO POPULATE PORTAL AND UPDATE REFS */
    /* this.portalContainer.classList.add('dd__list') */
    modalRoot.appendChild(this.ddContainer)
  }
  componentWillUnmount () {
    modalRoot.removeChild(this.ddContainer)
    /* clearTimeout(this.mountTimer) */
    this.portalRef = null
    this.dropdownWrapperRef = null
  }

  startCloseTimeout = () =>
    (this.dropdownTimer = setTimeout(() => this.closeDropdown(), 150))

  stopCloseTimeout = () => clearTimeout(this.dropdownTimer)

  handleMouseEnter = (trigger, dropdownItem) => {
    this.stopCloseTimeout()
    this.openDropdown(trigger, dropdownItem)
  }

  handleMouseLeave = () => this.startCloseTimeout()

  openDropdown = (trigger, dropdownItem) => {
    if (!dropdownItem) return

    const ddContent = dropdownItem.querySelector('.dd__content')
    const {
      top: triggerTop,
      left: triggerLeft,
      height: triggerHeight
    } = trigger.getBoundingClientRect()

    const leftOffset =
      triggerLeft - (ddContent.clientWidth - trigger.clientWidth) / 2

    const topOffset = this.props.verticalMotion
      ? triggerTop +
        triggerHeight -
        this.dropdownWrapperRef.current.offsetHeight
      : this.dropdownWrapperRef.current.offsetHeight

    const correction = this.getViewportOverflowCorrection(trigger, ddContent)

    const left = leftOffset - correction.left + 'px'
    const top = 10 + topOffset + 'px'
    const width = ddContent.clientWidth + 'px'
    const height = ddContent.clientHeight + 'px'

    this.setState(prevState => ({
      ...prevState,
      currentTrigger: trigger,
      ddFirstTime: prevState.currentTrigger === null,
      dropdownStyles: {
        left,
        top,
        width,
        height
      },
      arrowCorrectionX: correction.left
    }))
  }

  closeDropdown = () => {
    this.setState(prevState => ({
      ...prevState,
      currentTrigger: null
    }))
  }

  getViewportOverflowCorrection (trigger, ddContent) {
    const correction = { left: 0 }
    const triggerViewport = trigger.getBoundingClientRect()

    const ddLeftCornerX =
      triggerViewport.left - (ddContent.clientWidth - triggerViewport.width) / 2
    const ddRightCornerX = ddLeftCornerX + ddContent.clientWidth

    if (ddRightCornerX > window.innerWidth) {
      correction.left = ddRightCornerX - window.innerWidth
    } else if (ddLeftCornerX < 0) {
      correction.left = ddLeftCornerX
    }

    return correction
  }

  render () {
    const { children, className } = this.props
    const {
      currentTrigger,
      dropdownStyles,
      ddFirstTime,
      arrowCorrectionX
    } = this.state
    const {
      handleMouseEnter,
      handleMouseLeave,
      startCloseTimeout,
      stopCloseTimeout
    } = this

    this.ddContainer.classList.toggle(
      'has-dropdown-active',
      currentTrigger !== null
    )
    this.ddContainer.classList.toggle('dd-first-time', ddFirstTime)
    Object.assign(this.ddContainer.style, dropdownStyles)
    this.arrowNode.style.left = `calc(50% + ${arrowCorrectionX}px)`
    return (
      <div
        ref={this.dropdownWrapperRef}
        className={`dd-wrapper ${className || ''}`}
      >
        <SmoothDropdownContext.Provider
          value={{
            portal: this.portalContainer,
            currentTrigger,
            handleMouseEnter,
            handleMouseLeave,
            startCloseTimeout,
            stopCloseTimeout
          }}
        >
          {children}
          <div
            style={dropdownStyles}
            className={cx({
              dd: true,
              'has-dropdown-active': currentTrigger !== null,
              'dd-first-time': ddFirstTime
            })}
          >
            {/* <div className='dd__list' ref={this.portalRef} /> */}
            <div
              className='dd__arrow'
              style={{ left: `calc(50% + ${arrowCorrectionX}px)` }}
            />
            <div className='dd__bg' />
          </div>
        </SmoothDropdownContext.Provider>
      </div>
    )
  }
}

export default SmoothDropdown
