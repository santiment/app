import React from 'react'
import PropTypes from 'prop-types'
import { NonAuthorTrigger } from './Items'
import SaveAs from '../../../Actions/SaveAs'
import styles from './index.module.scss'

const Actions = ({ watchlist, type, onClick, isAuthor, isAuthorLoading }) => {
  if (!watchlist.id || isAuthorLoading) {
    return null
  }

  if (!isAuthor) {
    return (
      <div onClick={onClick} className={styles.container}>
        <SaveAs
          type={type}
          watchlist={watchlist}
          trigger={<NonAuthorTrigger />}
        />
      </div>
    )
  }
  return <div onClick={onClick} className={styles.container} />
}

Actions.propTypes = {
  isAuthor: PropTypes.bool.isRequired,
  isAuthorLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

Actions.defaultProps = {
  watchlist: {},
  onClick: _ => _
}

export default Actions
