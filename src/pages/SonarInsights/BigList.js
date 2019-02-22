import React, { Fragment, Component } from 'react'
import PropType from 'prop-types'
import throttle from 'lodash.throttle'

class BigList extends Component {
  static propTypes = {
    shouldHookScrollOnParent: PropType.bool,
    chunkSize: PropType.number
  }

  static defaultProps = {
    shouldHookScrollOnParent: false,
    chunkSize: 5
  }

  state = {
    startSlice: 0,
    endSlice: this.props.chunkSize
  }

  anchorRef = React.createRef()

  componentDidMount () {
    const container = this.anchorRef.current.parentNode
    let target = window
    let { offsetTop } = container
    let scrollProp = 'scrollY'

    if (this.props.shouldHookScrollOnParent) {
      if (process.env.NODE_ENV === 'development') {
        if (typeof this.props.height !== 'number') {
          throw new Error(
            `[BigList] When "shouldHookScrollOnParent" is true, "height" prop should be a number, but got: ${typeof this
              .props.height}`
          )
        }
      }

      target = container
      offsetTop = this.props.height
      scrollProp = 'scrollTop'
      container.style.maxHeight = `${offsetTop}px`
      container.style.overflowY = 'scroll'
    }

    this.container = container
    this.scrollProp = scrollProp
    this.scrollTarget = target
    this.containerOffsetTop = offsetTop

    target.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    this.scrollTarget.removeEventListener('scroll', this.onScroll)
  }

  onScroll = throttle(() => {
    const { scrollTarget, containerOffsetTop, container, scrollProp } = this

    console.log(
      scrollTarget,
      containerOffsetTop,
      scrollTarget[scrollProp],
      (scrollTarget[scrollProp] + containerOffsetTop) / container.scrollHeight
    )

    if (
      container.scrollHeight !== 0 &&
      (scrollTarget[scrollProp] + containerOffsetTop) / container.scrollHeight >
        0.8
    ) {
      console.log('adding new chunk')
      this.setState(this.updateState)
    }
  }, 150)

  updateState ({ startSlice, endSlice, noMore }) {
    if (noMore) {
      return {
        startSlice,
        endSlice,
        noMore
      }
    }

    const newEndSlice = endSlice + this.props.chunkSize
    const newNoMore = newEndSlice > this.props.list.length
    const newStartSlice =
      startSlice +
      (endSlice - this.props.chunkSize * 2 > 0 ? this.props.chunkSize : 0)

    return {
      /* startSlice: newStartSlice, */
      endSlice: newEndSlice,
      noMore: newNoMore
    }
  }

  render () {
    const { startSlice, endSlice } = this.state
    const { render, list } = this.props

    return (
      <Fragment>
        {render(list.slice(startSlice, endSlice))}
        <span ref={this.anchorRef} style={{ display: 'none' }} />
      </Fragment>
    )
  }
}

export default BigList
