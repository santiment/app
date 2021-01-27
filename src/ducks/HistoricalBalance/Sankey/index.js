import React, { useState } from 'react'
import Loadable from 'react-loadable'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Loader from '../../../components/Loader/PageLoader'
import styles from './index.module.scss'

const LoadableGraph = Loadable({
  loader: () => import('./Graph'),
  loading: () => <Loader />
})

const Sankey = ({ settings }) => {
  const [isOpened, setIsOpened] = useState()
  const { address } = settings

  return (
    <div className={styles.wrapper}>
      {isOpened && (
        <div className={styles.graph}>
          <LoadableGraph address={address} />
        </div>
      )}
      <div
        className={cx(styles.btn, isOpened && styles.btn_opened)}
        onClick={() => setIsOpened(!isOpened)}
      >
        {isOpened ? 'Hide' : 'Show'} Money Flow Infographic
        <Icon
          type={isOpened ? 'arrow-up' : 'arrow-down'}
          className={styles.arrow}
        />
      </div>
    </div>
  )
}

export default Sankey
