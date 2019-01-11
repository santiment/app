import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import './SmoothDropdown.css'

export const ddAsyncUpdateTimeout = 95

const modalRoot = document.getElementById('dd-modal')
const ddTemplate = modalRoot.querySelector('#dd-template').content

export const SmoothDropdownContext = React.createContext({
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  setupDropdownContent: () => {}
})

class SmoothDropdown extends Component {
  portalRef = React.createRef()

  dropdownWrapperRef = React.createRef()

  /* portalContainer = document.createElement('div') */

  ddContainer = ddTemplate.cloneNode(true).firstElementChild

  portalContainer = this.ddContainer.querySelector('.dd__list')

  bgNode = this.ddContainer.querySelector('.dd__bg')

  arrowNode = this.ddContainer.querySelector('.dd__arrow')

  ddItemsRef = new WeakMap()

  state = {
    currentTrigger: null,
    ddFirstTime: false,
    arrowCorrectionX: 0,
    dropdownStyles: {},
    ddItems: new Map()
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    verticalMotion: PropTypes.bool
  }

  componentDidMount () {
    modalRoot.appendChild(this.ddContainer)
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.ddContainer)
    this.ddContainer = null
    this.portalContainer = null
    this.bgNode = null
    this.arrowNode = null
    this.portalRef = null
    this.dropdownWrapperRef = null
  }

  startCloseTimeout = () => {
    this.dropdownTimer = setTimeout(() => this.closeDropdown(), 150)
  }

  stopCloseTimeout = () => clearTimeout(this.dropdownTimer)

  handleMouseEnter = (ddItem, trigger) => {
    this.stopCloseTimeout()
    this.openDropdown(ddItem, trigger)
  }

  handleMouseLeave = () => this.startCloseTimeout()

  setupDropdownContent = (ddItem, ddContent) => {
    this.ddItemsRef.set(ddItem, React.createRef())
    this.setState(prevState => ({
      ...prevState,
      ddItems: new Map([...prevState.ddItems, [ddItem, ddContent]])
    }))
  }

  openDropdown = (ddItem, trigger) => {
    const dropdownItem = this.ddItemsRef.get(ddItem).current
    if (!dropdownItem) return

    const ddContent = dropdownItem.querySelector('.dd__content')
    const {
      height: ddWrapperHeight,
      top: ddWrapperTop
    } = this.dropdownWrapperRef.current.getBoundingClientRect()
    const {
      top: triggerTop,
      left: triggerLeft,
      height: triggerHeight
    } = trigger.getBoundingClientRect()

    const leftOffset =
      triggerLeft - (ddContent.clientWidth - trigger.clientWidth) / 2

    const topOffset = this.props.verticalMotion
      ? triggerTop + triggerHeight - ddWrapperHeight
      : ddWrapperTop + ddWrapperHeight + window.scrollY

    const correction = this.getViewportOverflowCorrection(trigger, ddContent)

    const left = leftOffset - correction.left + 'px'
    const top = 10 + topOffset + 'px'
    const width = ddContent.clientWidth + 'px'
    const height = ddContent.clientHeight + 'px'
    this.setState(prevState => ({
      ...prevState,
      currentTrigger: ddItem,
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
      arrowCorrectionX,
      ddItems
    } = this.state
    const {
      handleMouseEnter,
      handleMouseLeave,
      startCloseTimeout,
      stopCloseTimeout,
      setupDropdownContent
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
            handleMouseEnter,
            handleMouseLeave,
            setupDropdownContent
          }}
        >
          {children}
        </SmoothDropdownContext.Provider>
        {ReactDOM.createPortal(
          [...ddItems.entries()].map(([ddItem, dropdownNode], i) => {
            return (
              <div
                key={i}
                className={cx({
                  dd__item: true,
                  active: ddItem === currentTrigger
                })}
                ref={this.ddItemsRef.get(ddItem)}
              >
                <div
                  className={`dd__content `}
                  // {/* NOTE(vanguard): Fix dynamic class*/}
                  onMouseEnter={stopCloseTimeout}
                  onMouseLeave={startCloseTimeout}
                >
                  {dropdownNode}
                </div>
              </div>
            )
          }),
          this.portalContainer
        )}
      </div>
    )
  }
}

export default SmoothDropdown
