import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'semantic-ui-react'
import './CreateWatchlistBtn.css'

const initialState = {
  newTitle: ''
}

class CreateWatchlistBtn extends React.Component {
  state = initialState

  static defaultProps = {
    onBlur: () => {},
    className: ''
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.watchlistUi.newItemSuccess !==
      prevProps.watchlistUi.newItemSuccess
    ) {
      this.setState({ newTitle: initialState.newTitle })
    }
  }

  handleOnChange = (e, data) => {
    this.setState({ newTitle: data.value })
  }

  handleCreateWatchlist = () => {
    const name = this.state.newTitle
    if (name && name.length > 0) {
      this.props.createWatchlist({
        name: this.state.newTitle.toLowerCase()
      })
      this.props.onBlur()
    }
  }

  render () {
    const { onBlur, className } = this.props
    const { newTitle } = this.state
    return (
      <div className={`create-new-watchlist-btn ${className}`}>
        <Input
          disabled={this.props.watchlistUi.newItemPending}
          value={newTitle}
          placeholder='a name of new list'
          onChange={this.handleOnChange}
          onBlur={!newTitle ? onBlur : undefined}
          onKeyPress={(e, data) => {
            if (e.key === 'Enter') {
              this.handleCreateWatchlist()
            }
          }}
        />
        {newTitle.length > 0 && (
          <Button color='google plus' onClick={this.handleCreateWatchlist}>
            Create
          </Button>
        )}
      </div>
    )
  }
}

CreateWatchlistBtn.propTypes = {
  createWatchlist: PropTypes.func.isRequired
}

export default CreateWatchlistBtn
