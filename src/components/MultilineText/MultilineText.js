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

const getTextRuler = id => {
  if (textRulers.has(id)) return textRulers.get(id)

  const elem = document.createElement('div')
  elem.dataset.mtRulerId = id
  textRulers.set(id, elem)
  rulersNode.appendChild(elem)

  return elem
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

    if (
      container.offsetHeight / this.getTextDimensions(this.props.text).height >
      this.props.maxLines
    ) {
      this.forceUpdate()
    }
  }

  updateRulerStyles () {
    const containerStyles = window.getComputedStyle(this.container)
    const rulerStyles = this.ruler.style

    rulerStyles.fontSize = containerStyles.fontSize
    rulerStyles.fontFamily = containerStyles.fontFamily
    rulerStyles.lineHeight = containerStyles.lineHeight
    /* rulerStyles.display = 'inline' */
    /* rulerStyles.whiteSpace = 'nowrap' */
    rulerStyles.wordBreak = 'break-word'
  }

  restrictRulerWidth () {
    const containerStyles = window.getComputedStyle(this.container)
    const rulerStyles = this.ruler.style
    rulerStyles.width = containerStyles.width
    rulerStyles.display = 'block'
    rulerStyles.whiteSpace = 'initial'
    rulerStyles.wordBreak = 'break-word'
    console.log(rulerStyles.width)
  }

  getTextDimensions (text) {
    this.ruler.textContent = text
    return { width: this.ruler.offsetWidth, height: this.ruler.offsetHeight }
  }

  getWordWidth (word) {
    this.ruler.textContent = word
    return this.ruler.offsetWidth
  }

  getTruncatedText () {
    const { text, maxLines } = this.props
    if (!this.container) {
      return text
    }

    const containerWidth = this.container.offsetWidth
    // NOTE: should some how memeize the line height for the corresponding ruler id
    const { width: textWidth, height: oneLineHeight } = this.getTextDimensions(
      '.'
    )

    const words = text.split(' ')

    this.restrictRulerWidth()
    let finalText

    for (let i = words.length; i > -1; i--) {
      finalText = words.slice(0, i).join(' ')
      if (
        this.getTextDimensions(finalText).height / oneLineHeight <=
        maxLines
      ) {
        console.log({ searchText: finalText })
        console.log(this.getTextDimensions(finalText))
        console.log('Found word to truncate ->', words[i - 1])
        break
      }
    }

    return finalText ? finalText.slice(0, -3) + '...' : text
  }

  render () {
    /* console.log(this.props.text) */
    return (
      <Fragment>
        {this.getTruncatedText()}
        <span ref={this.textRef} style={{ display: 'none' }} />
      </Fragment>
    )
  }
}

export default MultilineText
