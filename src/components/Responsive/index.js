import withSizesLib from 'react-sizes'
import PropTypes from 'prop-types'
import { mapSizesToProps } from '../../utils/withSizes'

export const withSizes = withSizesLib(mapSizesToProps)

export const DesktopOnly = withSizes(({ children, isDesktop }) =>
  isDesktop ? children : null
)

DesktopOnly.propTypes = {
  children: PropTypes.node.isRequired
}

export const MobileOnly = withSizes(({ children, isDesktop }) =>
  isDesktop ? null : children
)

MobileOnly.propTypes = {
  children: PropTypes.node.isRequired
}
