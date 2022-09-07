import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Svg from 'webkit/ui/Svg/react'
import { DesktopOnly } from '../Responsive'
import styles from './MobileHeader.module.scss'

const defaultClasses = {
  wrapper: styles.wrapper,
  icon: styles.icon,
  title: styles.title,
  searchBtn: styles.searchBtn,
  isTitleLink: styles.isTitleLink,
}

const MobileHeader = ({
  title,
  // if we have goBack func, onClick of title element is goBack func
  goBack,
  // if we have backRoute, title element is a link with 'to' param === backRoute
  backRoute,
  rightActions,
  classes: _classes = {},
  showBack = false,
  showSearch = true,
  children,
}) => {
  const classes = { ...defaultClasses, ..._classes }

  const Title = backRoute && !goBack ? Link : 'div'

  return (
    <div className={cx(classes.wrapper, 'row v-center justify')}>
      <Title onClick={goBack && goBack} to={backRoute} className={cx(classes.left, _classes.back)}>
        <DesktopOnly>
          {(backRoute || showBack) && (
            <Svg w={10} h={17} className={classes.icon} id='arrow-right' />
          )}
        </DesktopOnly>
        {title && (
          <h1 className={cx(styles.title, 'nowrap line-clamp h4 txt-m nowrap mrg-l mrg--r')}>
            {title}
          </h1>
        )}
      </Title>
      {children}
      <div className={cx(classes.right, 'row v-center')}>
        {rightActions}
        {showSearch && (
          <Link to='/search' className='row v-center'>
            <Icon type='search' width='18' height='18' />
          </Link>
        )}
      </div>
    </div>
  )
}

MobileHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  backRoute: PropTypes.string,
  rightActions: PropTypes.node,
  goBack: PropTypes.func,
}

export default MobileHeader
