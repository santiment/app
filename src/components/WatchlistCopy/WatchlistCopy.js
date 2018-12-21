import React, { PureComponent } from 'react'
import WatchlistCopyBtn from './WatchlistCopyBtn'
import WatchlistCopyPopup from './WatchlistCopyPopup'
import { Popup } from 'semantic-ui-react'

class WatchlistCopy extends PureComponent {
  state = {
    isPopupShown: false
  }

  render () {
    const { isPopupShown } = this.state

    return (
      <div>
        <Popup
          content={<WatchlistCopyPopup />}
          trigger={<WatchlistCopyBtn />}
          position='bottom left'
          // on='click'
          // style={style}
        />
      </div>
    )
  }
}

export default WatchlistCopy
