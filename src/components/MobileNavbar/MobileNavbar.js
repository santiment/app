import React from 'react'
import { withRouter, NavLink as Link } from 'react-router-dom'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Icon, Button } from '@santiment-network/ui'
import { compose, withStateHandlers } from 'recompose'
import MobileNavbarAction from './MobileNavbarAction'
import './MobileMenu.css'
import styles from './MobileMenu.module.scss'
import * as actions from './../../actions/types'

const MobileNavbar = ({
  isOpened = false,
  toggleMenu,
  history,
  isLogined,
  logout
}) => (
  <div
    className={cx({
      'mobile-app-menu': true,
      overlay: isOpened
    })}
  >
    <div className={styles.wrapper}>
      <MobileNavbarAction iconType='fire' label='Trends' />
      <MobileNavbarAction iconType='bulb' label='Insights' />
      <MobileNavbarAction iconType='assets' label='Assets' />
      <MobileNavbarAction
        onClick={toggleMenu}
        iconType={isOpened ? 'close' : 'hamburger'}
        label='Menu'
      />
    </div>
    {isOpened && (
      <div className='overlay-content'>
        <div onClick={toggleMenu} className='navigation-list'>
          <Link to={'/trends'}>Trends</Link>
          <Link to={'/insights'}>Insights</Link>
          <Link to={'/signals'}>Signals</Link>
          <Link to={'/roadmap'}>Roadmap</Link>
          <Link to={'/projects'}>ERC20 Projects</Link>
          <Link to={'/currencies'}>Currencies</Link>
        </div>
        {isLogined ? (
          <Button
            accent='orange'
            onClick={() => {
              toggleMenu()
              logout()
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            accent='green'
            onClick={() => {
              toggleMenu()
              history.push('/login')
            }}
          >
            Login
          </Button>
        )}
      </div>
    )}
  </div>
)

const mapStateToProps = ({ user = {} }) => {
  return {
    isLogined: !!user.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch({
        type: actions.USER_LOGOUT_SUCCESS
      })
    }
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(
    { isOpened: false },
    {
      toggleMenu: ({ isOpened }) => () => ({ isOpened: !isOpened })
    }
  )
)

export default enhance(MobileNavbar)
