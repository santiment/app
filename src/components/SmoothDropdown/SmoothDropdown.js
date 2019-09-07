import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import './SmoothDropdown.scss'

const modalRoot = document.getElementById('dd-modal')

let ddTemplate

if (modalRoot) {
  ddTemplate = modalRoot.querySelector('#dd-template').content
}

export const SmoothDropdownContext = React.createContext({
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  setupDropdownContent: () => {}
})

class SmoothDropdown extends Component {
  portalRef = React.createRef()

  dropdownWrapperRef = React.createRef()

  ddContainer = ddTemplate.cloneNode(true).firstElementChild

  ddItemsRef = new WeakMap()

  state = {
    currentTrigger: null,
    currentDropdown: null,
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
    showArrow: PropTypes.bool,
    verticalMotion: PropTypes.bool,
    verticalOffset: PropTypes.number,
    screenEdgeXOffset: PropTypes.number,
    closeAfterTimeout: PropTypes.number
  }

  static defaultProps = {
    verticalMotion: false,
    showArrow: true,
    verticalOffset: 10,
    screenEdgeXOffset: 10,
    closeAfterTimeout: 150
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

  componentWillMount () {
    this.portalContainer = this.ddContainer.querySelector('.dd__list')
    this.bgNode = this.ddContainer.querySelector('.dd__bg')
    this.arrowNode = this.ddContainer.querySelector('.dd__arrow')
  }

  startCloseTimeout = () => {
    this.dropdownTimer = setTimeout(
      () => this.closeDropdown(),
      this.props.closeAfterTimeout
    )
  }

  stopCloseTimeout = () => clearTimeout(this.dropdownTimer)

  handleMouseEnter = (ddItem, trigger) => {
    this.stopCloseTimeout()
    this.openDropdown(ddItem, trigger)
  }

  handleMouseLeave = () => this.startCloseTimeout()

  setupDropdownContent = (ddItem, ddContent) => {
    setTimeout(() => {
      if (!this.ddItemsRef.has(ddItem)) {
        this.ddItemsRef.set(ddItem, React.createRef())
        this.setState(prevState => ({
          ...prevState,
          ddItems: new Map([...prevState.ddItems, [ddItem, ddContent]])
        }))
      }

      const dropdownItem = this.ddItemsRef.get(ddItem).current
      const {
        currentDropdown,
        dropdownStyles: { width: widthPx, height: heightPx }
      } = this.state

      if (
        !dropdownItem ||
        currentDropdown !== dropdownItem.querySelector('.dd__content')
      ) {
        return
      }

      if (
        currentDropdown.clientHeight !== parseInt(heightPx, 10) ||
        currentDropdown.clientWidth !== parseInt(widthPx, 10)
      ) {
        if (this.ddContainer) {
          this.setState(prevState => ({
            ...prevState,
            dropdownStyles: {
              ...prevState.dropdownStyles,
              width: currentDropdown.clientWidth + 'px',
              height: currentDropdown.clientHeight + 'px'
            }
          }))
        }
      }
    }, 0)
  }

  openDropdown = (ddItem, trigger) => {
    let dropdownItem = this.ddItemsRef ? this.ddItemsRef.get(ddItem) : undefined

    dropdownItem = dropdownItem ? dropdownItem.current : undefined

    if (!dropdownItem) return
    const { verticalOffset, verticalMotion } = this.props
    const ddContent = dropdownItem.querySelector('.dd__content')

    if (!this.dropdownWrapperRef.current) {
      return
    }

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

    const topOffset =
      (verticalMotion
        ? triggerTop + triggerHeight
        : ddWrapperTop + ddWrapperHeight) + window.scrollY

    const correction = this.getViewportOverflowCorrection(trigger, ddContent)

    const left = leftOffset - correction.left + 'px'
    const top = topOffset + verticalOffset + 'px'
    const width = ddContent.clientWidth + 'px'
    const height = ddContent.clientHeight + 'px'
    this.setState(prevState => ({
      ...prevState,
      currentTrigger: ddItem,
      currentDropdown: ddContent,
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
      currentTrigger: null,
      currentDropdown: null
    }))
  }

  getViewportOverflowCorrection (trigger, ddContent) {
    const { screenEdgeXOffset } = this.props

    const correction = { left: 0 }
    const triggerViewport = trigger.getBoundingClientRect()

    const ddLeftCornerX =
      triggerViewport.left - (ddContent.clientWidth - triggerViewport.width) / 2
    const ddRightCornerX = ddLeftCornerX + ddContent.clientWidth

    if (ddRightCornerX > window.innerWidth) {
      correction.left = ddRightCornerX - window.innerWidth + screenEdgeXOffset
    } else if (ddLeftCornerX < 0) {
      correction.left = ddLeftCornerX - screenEdgeXOffset
    }

    return correction
  }

  render () {
    const { children, className = '', showArrow } = this.props

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
    this.arrowNode.style.display = showArrow ? 'block' : 'none'

    return (
      <div ref={this.dropdownWrapperRef} className={`dd-wrapper ${className}`}>
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
                  className='dd__content'
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
