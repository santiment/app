import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { SmoothDropdownContext, ddAsyncUpdateTimeout } from './SmoothDropdown'

const ddItemAsyncUpdateTimeout = ddAsyncUpdateTimeout + 5

class SmoothDropdownItem extends Component {
  dropdownRef = React.createRef()
  triggerRef = React.createRef()

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
      .isRequired,
    trigger: PropTypes.element.isRequired,
    showIf: PropTypes.func,
    id: PropTypes.string
  }

  componentDidMount () {
    this.mountTimer = setTimeout(() => this.forceUpdate(), 50) // VERY HACKY - NECESSARY TO UPDATE DROPDOWN IN DOM
  }
  componentWillUnmount () {
    clearTimeout(this.mountTimer)
    this.dropdownRef = null
    this.triggerRef = null
  }

  render () {
    const { trigger, children, id, className, showIf } = this.props
    const {
      triggerRef: { current: ddTrigger },
      dropdownRef: { current: ddDropdown }
    } = this
    console.log('Waiting for rerender')
    if (!trigger) {
      return null
    }
    return (
      <SmoothDropdownContext.Consumer>
        {({ handleMouseEnter, handleMouseLeave, setupDropdownContent }) => (
          <Fragment>
            <div
              onMouseEnter={evt => {
                if (showIf ? showIf(evt) : true) {
                  handleMouseEnter(this, ddTrigger, children)
                }
              }}
              onMouseLeave={handleMouseLeave}
              className='dd__trigger'
              ref={this.triggerRef}
            >
              {trigger}
            </div>
            {setupDropdownContent(this, children)}
          </Fragment>
        )}
      </SmoothDropdownContext.Consumer>
    )
  }
}

export default SmoothDropdownItem
