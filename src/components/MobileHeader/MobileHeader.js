import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@santiment-network/ui'
import styles from './MobileHeader.module.scss'

const defaultClasses = {
  wrapper: styles.wrapper,
  icon: styles.icon,
  title: styles.title,
  left: styles.left,
  shortLeft: styles.shortLeft,
  right: styles.right,
  searchBtn: styles.searchBtn,
  isTitleLink: styles.isTitleLink
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
  children
}) => {
  const classes = { ...defaultClasses, ..._classes }
  const Title = backRoute && !goBack ? Link : 'div'
  return (
    <div className={classes.wrapper}>
      <Title
        onClick={goBack && goBack}
        to={backRoute}
        className={cx(
          classes.left,
          rightActions && classes.shortLeft,
          _classes.back
        )}
      >
        {(backRoute || showBack) && (
          <Icon className={classes.icon} type='arrow-left-big' />
        )}
        {title && (
          <h1
            className={cx(
              classes.title,
              (backRoute || showBack) && classes.isTitleLink
            )}
          >
            {title}
          </h1>
        )}
      </Title>
      {children}
      <div className={classes.right}>
        {rightActions}
        <Button to='/search' as={Link} className={classes.searchBtn}>
          <Icon type='search' />
        </Button>
      </div>
    </div>
  )
}

MobileHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  backRoute: PropTypes.string,
  rightActions: PropTypes.node,
  goBack: PropTypes.func
}

export default MobileHeader
