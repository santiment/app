import React, { Fragment } from 'react'
import { Message, Button } from 'semantic-ui-react'
import metamaskIcon from '../../assets/metamask-icon-64-2.png'

export default ({ error = false, pending = false, handleAuth }) => {
  return (
    <Fragment>
      {error && (
        <div>
          <Message
            style={{ marginBottom: 10 }}
            negative
            header='Apologies, there was a problem with blockchain authetication'
            content='Try again later or another login option'
          />
        </div>
      )}
      <Button
        basic
        className='metamask-btn'
        disabled={pending}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '5px',
          paddingBottom: '5px',
          margin: '0 auto'
        }}
        onClick={handleAuth}
      >
        <img
          src={metamaskIcon}
          alt='metamask logo'
          width={28}
          height={28}
          style={{ marginRight: '1rem' }}
        />
        {pending ? 'Waiting...' : 'Login with Metamask'}
      </Button>
    </Fragment>
  )
}
