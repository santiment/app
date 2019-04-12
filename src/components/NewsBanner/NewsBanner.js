import React, { PureComponent } from 'react'
import { Icon } from '@santiment-network/ui'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { loadKeyState, saveKeyState } from './../../utils/localStorage'
import styles from './NewsBanner.module.scss'

class NewsBanner extends PureComponent {
  state = {
    isHidden: loadKeyState('trendsMsg')
  }

  hideMsg = () => {
    this.setState({
      isHidden: true
    })
    saveKeyState('trendsMsg', true)
  }

  render () {
    if (this.state.isHidden) {
      return null
    }
    return (
      <div className={styles.container}>
        <div className={cx(styles.wrapper, 'page')}>
          <div className={styles.message}>
            🔥 We prepared for you crypto trends in social media&nbsp;
            <Link to='/trends' onClick={this.hideMsg} className={styles.more}>
              More&nbsp;
              <Icon type='pointer-right' />
            </Link>
          </div>
          <Icon onClick={this.hideMsg} type='close-small' />
        </div>
      </div>
    )
  }
}

export default NewsBanner
