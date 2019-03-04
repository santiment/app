import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@santiment-network/ui'
import { setDisplayName } from 'recompose'
import './ProjectIcon.css'

export const DefaultIcon = ({ size = 32 }) => (
  <Icon type='doughnut' fill='#000' />
)
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
// <circle cx="0" cy="0" r={size} strokeWidth="1" stroke="#f00" fill="#ff0" />
// </svg>

export const ProjectIcon = ({ name, size, ticker, className }) => {
  if (!name) {
    return <DefaultIcon className={className} size={size} />
  }
  let imgSource = ''
  try {
    imgSource = require(`../assets/project-icons/${name
      .toString()
      .toLowerCase()
      .split(/[ /.]+/)
      .join('-')}.png`)
  } catch (e) {
    try {
      imgSource = require(`../assets/32x32/${ticker}-32.png`)
    } catch (e) {
      return <DefaultIcon className={className} size={size} />
    }
  }
  return (
    <div className={className}>
      <img width={size} alt={name} height={size} src={imgSource} />
    </div>
  )
}

ProjectIcon.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string,
  className: PropTypes.string
}

ProjectIcon.defaultProps = {
  size: 16,
  ticker: '',
  className: ''
}

export default setDisplayName('ProjectIcon')(ProjectIcon)
