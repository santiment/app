import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

let rulersNode = document.querySelector('#mt-rulers')

if (!rulersNode) {
  rulersNode = document.createElement('div')
  rulersNode.id = 'mt-rulers'
  rulersNode.style.height = 0
  rulersNode.style.maxWidth = '100%'
  rulersNode.style.overflow = 'hidden'
  rulersNode.style.visibility = 'hidden'
  document.body.appendChild(rulersNode)
}

const textRulers = new Map()
const lineHeights = new Map()

const getTextRuler = id => {
  if (textRulers.has(id)) return textRulers.get(id)

  const ruler = document.createElement('div')
  ruler.dataset.mtRulerId = id
  rulersNode.appendChild(ruler)
  textRulers.set(id, ruler)

  return ruler
}

const getOneLineHeight = id => {
  if (lineHeights.has(id)) return lineHeights.get(id)

  const ruler = textRulers.get(id)
  ruler.textContent = '.'
  const { offsetHeight } = ruler
  lineHeights.set(id, offsetHeight)

  return offsetHeight
}

class MultilineText extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    maxLines: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }

  ruler = getTextRuler(this.props.id)

  textRef = React.createRef()

  componentDidMount () {
    const container = this.textRef.current.parentNode
    this.container = container

    this.updateRulerStyles()
    const { id, maxLines } = this.props

    const oneLineHeight = getOneLineHeight(id)
    this.oneLineHeight = oneLineHeight

    if (Math.floor(container.offsetHeight / oneLineHeight) > maxLines) {
      this.forceUpdate()
    }
  }

  updateRulerStyles () {
    const containerStyles = window.getComputedStyle(this.container)
    const rulerStyles = this.ruler.style

    this.container.style.wordBreak = 'break-word'
    rulerStyles.wordBreak = 'break-word'

    rulerStyles.fontSize = containerStyles.fontSize
    rulerStyles.fontFamily = containerStyles.fontFamily
    rulerStyles.lineHeight = containerStyles.lineHeight
    rulerStyles.width = containerStyles.width
  }

  getTextDimensions (text) {
    this.ruler.textContent = text
    return {
      width: this.ruler.offsetWidth,
      height: this.ruler.offsetHeight
    }
  }

  getTruncatedText () {
    const { text, maxLines } = this.props

    if (!this.container) {
      return text
    }

    const words = text.split(' ')
    const { oneLineHeight } = this

    let finalText

    for (let i = words.length; i > -1; i--) {
      finalText = words.slice(0, i).join(' ')
      if (
        this.getTextDimensions(finalText).height / oneLineHeight <=
        maxLines
      ) {
        break
      }
    }

    return finalText ? finalText.slice(0, -3) + '...' : text
  }

  render () {
    return (
      <Fragment>
        {this.getTruncatedText()}
        <span ref={this.textRef} style={{ display: 'none' }} />
      </Fragment>
    )
  }
}

export default MultilineText
