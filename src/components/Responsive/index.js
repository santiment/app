import React from 'react'
import withSizes from 'react-sizes'
import PropTypes from 'prop-types'
import { mapSizesToProps } from '../../App'

const enhance = withSizes(mapSizesToProps)

export const DesktopOnly = enhance(({ children, isDesktop }) =>
  isDesktop ? children : null
)

DesktopOnly.propTypes = {
  children: PropTypes.node.isRequired
}

export const MobileOnly = enhance(({ children, isDesktop }) =>
  isDesktop ? null : children
)

MobileOnly.propTypes = {
  children: PropTypes.node.isRequired
}
