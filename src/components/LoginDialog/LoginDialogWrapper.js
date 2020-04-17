import React from 'react'
import { connect } from 'react-redux'
import LoginDialog from './index'
import {checkIsLoggedIn} from "../../pages/UserSelectors";

const LoginDialogWrapper = ({isLoggedIn, children, title = 'Login required'}) => {
  if(isLoggedIn){
    return children
  }

  return <LoginDialog trigger={<div>{children}</div>} title={title}/>
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default connect(mapStateToProps)(LoginDialogWrapper)
