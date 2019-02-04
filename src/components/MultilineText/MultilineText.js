import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

let rulersNode = document.querySelector('#mt-rulers')

if (!rulersNode) {
  rulersNode = document.createElement('div')
  rulersNode.id = 'mt-rulers'
  rulersNode.style.maxWidth = '100%'
  rulersNode.style.overflow = 'hidden'
  /* rulers.style.height = 0 */
  /* rulers.style.visibility = 'hidden' */
  document.body.appendChild(rulersNode)
}

const textRulers = new Map()

const getTextRuler = id => {
  if (textRulers.has(id)) return textRulers.get(id)

  const elem = document.createElement('span')
  elem.dataset.mtRulerId = id
  textRulers.set(id, elem)
  rulersNode.appendChild(elem)

  return elem
}

const getContainer = id => {
  return document.querySelector(`[data-mt-id="${id}"]`)
}

class MultilineText extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    maxLines: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }

  ruler = getTextRuler(this.props.id)

  componentDidMount () {
    const container = getContainer(this.props.id)
    this.container = container
    this.updateRulerStyles()

    if (
      container.offsetHeight / this.getTextDimensions().height >
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
    rulerStyles.display = 'inline'
    rulerStyles.whiteSpace = 'nowrap'
  }

  getTextDimensions () {
    this.ruler.textContent = this.props.text
    return { width: this.ruler.offsetWidth, height: this.ruler.offsetHeight }
  }

  getTruncatedText () {
    const { text, maxLines } = this.props
    if (!this.container) {
      return text
    }

    const containerWidth = this.container.offsetWidth
    const textWidth = this.getTextDimensions().width
    const oneCharWidth = Math.ceil(textWidth / text.length)

    const words = text.split(' ')

    const lineState = { number: 1, filled: 0, words: 0, shouldTruncate: false }
    let lastLineState

    for (const word of words) {
      const wordWidth = word.length * oneCharWidth
      const newFilledWidth = wordWidth + lineState.filled
      lastLineState = Object.assign({}, lineState)

      if (wordWidth > containerWidth) {
        lineState.filled = wordWidth - containerWidth
        lineState.number += 1
      } else {
        if (newFilledWidth > containerWidth) {
          lineState.number += 1
          lineState.filled = wordWidth + oneCharWidth
        } else {
          lineState.filled += wordWidth + oneCharWidth
        }
      }

      if (lineState.number > maxLines) {
        lastLineState.shouldTruncate = true

        break
      }

      lineState.words++
    }

    if (lastLineState.shouldTruncate) {
      let additionalTruncate = 0
      if (lastLineState.filled > containerWidth) {
        additionalTruncate = Math.ceil(
          (lastLineState.filled - containerWidth) / oneCharWidth
        )
      }
      return (
        words
          .slice(0, lastLineState.words)
          .join(' ')
          .slice(0, -(additionalTruncate + 3)) + '...'
      )
    } else {
      return text
    }
  }

  render () {
    return this.getTruncatedText()
  }
}

export default MultilineText
