import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@santiment-network/ui'
import styles from './MobileHeader.module.scss'

const MobileHeader = ({
  title,
  backRoute,
  rightActions,
  classes = {
    wrapper: styles.wrapper,
    title: styles.title,
    left: styles.left,
    right: styles.right,
    searchBtn: styles.searchBtn,
    isTitleLink: styles.isTitleLink
  }
}) => {
  const Title = backRoute ? Link : 'div'
  return (
    <div className={classes.wrapper}>
      <Title to={backRoute} className={classes.left}>
        {backRoute && <Icon type='arrow-left-big' />}
        <h1 className={cx(classes.title, backRoute && classes.isTitleLink)}>
          {title}
        </h1>
      </Title>
      <div className={classes.right}>
        {rightActions}
        <Button to='/search' as={Link} className={classes.searchBtn}>
          <Icon type='search' />
        </Button>
      </div>
    </div>
  )
}

const propTypes = {
  title: PropTypes.string.isRequired,
  backRoute: PropTypes.string,
  rightActions: PropTypes.node
}

export default MobileHeader
