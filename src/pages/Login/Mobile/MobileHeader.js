import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@santiment-network/ui'
import { LoaderImage } from '../../../components/Loader/PageLoader'
import styles from './MobileWrapper.module.scss'

const MobileHeader = () => {
  return (
    <div className={styles.header}>
      <div className={cx(styles.headercontent, 'row justify v-center')}>
        <div className='row v-center'>
          <LoaderImage withAnimation={false} size={32} />
          <h1 className='mrg--l mrg-s body-2 txt-m'>Sanbase</h1>
        </div>
        <Button to='/search' as={Link}>
          <Icon type='search' width={18} height={18} />
        </Button>
      </div>
    </div>
  )
}

export default MobileHeader
