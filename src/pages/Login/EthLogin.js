import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { compose, withProps } from 'recompose'
import { Message } from 'semantic-ui-react'
import AuthForm from './AuthForm'
import { hasMetamask } from '../../web3Helpers'
import * as actions from './../../actions/types'
import metamaskDownloadImg from './../../assets/download-metamask.png'

const EthLogin = ({ user, isDesktop, requestAuth, hasMetamask, consent }) => {
  return (
    <Fragment>
      {user.isLoading && !hasMetamask && <div>Loading</div>}
      {!hasMetamask && !user.isLoading && isDesktop && (
        <Message warning>
          <h4>We can't detect Metamask!</h4>
          <p>We can auth you with Metamask account. It's secure and easy.</p>
          <div className='help-links'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://metamask.io/#how-it-works'
            >
              How Metamask works?
            </a>
            <a href='https://metamask.io/'>
              <img width={128} src={metamaskDownloadImg} alt='Metamask link' />
            </a>
          </div>
        </Message>
      )}
      {!hasMetamask && !isDesktop && (
        <Message warning>
          <h4>It's uncompatible with Metamask browser!</h4>
        </Message>
      )}

      {hasMetamask && !user.token && (
        <AuthForm
          pending={user.isLoading}
          error={user.error}
          handleAuth={() => requestAuth(consent)}
        />
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  requestAuth: consent => {
    dispatch({ type: actions.USER_ETH_LOGIN, payload: { consent } })
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(props => {
    return {
      ...props,
      hasMetamask: hasMetamask()
    }
  }),
  withApollo
)(EthLogin)
