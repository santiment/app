import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Icon, Button, Tooltip, Toggle, Input } from '@santiment-network/ui'
import { DesktopOnly } from './../Responsive'
import * as actions from './../../actions/types'
import styles from './NewWatchlistBtn.module.scss'

const MAX_NAME_LENGTH = 50

const NewWatchlistBtn = ({ createWatchlist }) => {
  const [name, setName] = useState('')
  const [isPublic, setPrivacy] = useState(false)

  const togglePrivacy = () => setPrivacy(!isPublic)
  const updateName = e => setName(e.target.value)
  const onCreateWatchlist = () =>
    createWatchlist({
      name,
      isPublic
    })

  const isError = name.length > MAX_NAME_LENGTH

  return (
    <DesktopOnly>
      <Tooltip
        closeTimeout={500000000000000}
        position='top'
        className={styles.wrapper}
        on='click'
        trigger={
          <Button border>
            <Icon type='plus-round' />
            &nbsp; New watchlist
          </Button>
        }
      >
        <div className={cx(styles.header, styles.splitContent)}>
          New watchlist
          <Icon type='close' fill='var(--waterloo)' />
        </div>
        <div className={styles.content}>
          Name ({name.length}/{MAX_NAME_LENGTH})
          <Input isError={isError} placeholder='Name' onChange={updateName} />
        </div>
        <div className={cx(styles.actions, styles.splitContent)}>
          <div className={styles.leftActions}>
            <Toggle
              className={styles.toggle}
              isActive={!isPublic}
              onClick={togglePrivacy}
            />{' '}
            Secret
          </div>
          <div>
            <Button border>Cancel</Button>
            <Button
              variant='fill'
              accent='positive'
              onClick={onCreateWatchlist}
              disabled={isError}
            >
              Create
            </Button>
          </div>
        </div>
      </Tooltip>
    </DesktopOnly>
  )
}

NewWatchlistBtn.propTypes = {
  createWatchlist: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  createWatchlist: payload =>
    dispatch({
      type: actions.USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

export default connect(
  null,
  mapDispatchToProps
)(NewWatchlistBtn)
