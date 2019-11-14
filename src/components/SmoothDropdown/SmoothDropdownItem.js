import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SmoothDropdownContext } from './SmoothDropdown'

class SmoothDropdownItem extends Component {
  triggerRef = React.createRef()

  static propTypes = {
    children: PropTypes.any.isRequired,
    trigger: PropTypes.element.isRequired,
    showIf: PropTypes.func
  }

  componentDidMount () {
    this.mountTimer = setTimeout(() => this.forceUpdate(), 0) // VERY HACKY - NECESSARY TO UPDATE DROPDOWN IN DOM
  }

  componentWillUnmount () {
    clearTimeout(this.mountTimer)
    this.triggerRef = null
  }

  render () {
    const {
      trigger,
      children,
      showIf,
      className = '',
      onOpen: propsOnOpen,
      onClose,
      ddParams
    } = this.props
    const {
      triggerRef: { current: ddTrigger }
    } = this
    if (!trigger) {
      return null
    }

    return (
      <SmoothDropdownContext.Consumer>
        {({ handleMouseEnter, handleMouseLeave, setupDropdownContent }) => {
          const onOpen = evt => {
            if (showIf ? showIf(evt) : true) {
              handleMouseEnter(this, ddTrigger)
              propsOnOpen && propsOnOpen()
            }
          }
          return (
            <>
              <div
                onMouseEnter={onOpen}
                onTouchStart={onOpen}
                onTouchCancel={() => {
                  handleMouseLeave()
                  onClose && onClose()
                }}
                onMouseLeave={() => {
                  handleMouseLeave()
                  onClose && onClose()
                }}
                className={`dd__trigger ${className}`}
                ref={this.triggerRef}
              >
                {trigger}
              </div>
              {setupDropdownContent(this, children, ddParams)}
            </>
          )
        }}
      </SmoothDropdownContext.Consumer>
    )
  }
}

export default SmoothDropdownItem
