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
  ddItemsStyles = new WeakMap()

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

    // GarageInc: HACK for IOS(IPAD and etc) which can't handle mouseLeave/touchCancel/blur events
    document.addEventListener('touchstart', this.handleTouchEvent)
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.ddContainer)
    this.ddContainer = null
    this.portalContainer = null
    this.bgNode = null
    this.arrowNode = null
    this.portalRef = null
    this.dropdownWrapperRef = null

    document.removeEventListener('touchstart', this.handleTouchEvent)
  }

  componentWillMount () {
    this.portalContainer = this.ddContainer.querySelector('.dd__list')
    this.bgNode = this.ddContainer.querySelector('.dd__bg')
    this.arrowNode = this.ddContainer.querySelector('.dd__arrow')
  }

  handleTouchEvent = evt => {
    if (
      this.dropdownWrapperRef &&
      !this.dropdownWrapperRef.current.contains(evt.target)
    ) {
      this.handleMouseLeave()
    }
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

  isCurrentDropdown = ddItem => {
    const { currentDropdown } = this.state
    const dropdownItem = this.ddItemsRef.get(ddItem).current
    return currentDropdown !== dropdownItem.querySelector('.dd__content')
  }

  setupDropdownContent = (ddItem, ddContent, ddStyles = {}) => {
    setTimeout(() => {
      if (!this.ddItemsRef.has(ddItem)) {
        this.ddItemsRef.set(ddItem, React.createRef())
        this.ddItemsStyles.set(ddItem, ddStyles)
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

      if (!dropdownItem || this.isCurrentDropdown(ddItem)) {
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

  makePx = value => value + 'px'

  openDropdown = (ddItem, trigger) => {
    let dropdownItem = this.ddItemsRef ? this.ddItemsRef.get(ddItem) : undefined

    dropdownItem = dropdownItem ? dropdownItem.current : undefined

    if (!dropdownItem) return
    const { verticalOffset, verticalMotion } = this.props
    const ddContent = dropdownItem.querySelector('.dd__content')

    if (!this.dropdownWrapperRef.current || !trigger) {
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

    const { offsetX = 0, offsetY = 0, position } =
      this.ddItemsStyles.get(ddItem) || {}

    let left = this.makePx(leftOffset - correction.left)
    let top = this.makePx(topOffset + verticalOffset)
    const width = this.makePx(ddContent.clientWidth)
    const height = this.makePx(ddContent.clientHeight)

    if (position === 'start') {
      left = this.makePx(triggerLeft + offsetX)
      top = this.makePx(topOffset + verticalOffset + offsetY)
    }

    const dropdownStyles = {
      left,
      top,
      width,
      height
    }

    this.setState(prevState => ({
      ...prevState,
      currentTrigger: ddItem,
      currentDropdown: ddContent,
      ddFirstTime: prevState.currentTrigger === null,
      dropdownStyles,
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
    const { handleMouseEnter, handleMouseLeave, setupDropdownContent } = this

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
                  onTouchStart={handleMouseEnter}
                  onMouseEnter={handleMouseEnter}
                  onTouchEnd={handleMouseLeave}
                  onTouchCancel={handleMouseLeave}
                  onMouseLeave={handleMouseLeave}
                  onBlur={handleMouseLeave}
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
