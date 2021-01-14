import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import EmptySection from '../../../../components/EmptySection/EmptySection'
import styles from './WatchlistsAnon.module.scss'

const LoginBlock = () => (
  <div className={styles.bottom}>
    <p className={cx(styles.desc, styles.login)}>
      Please, log in to use this feature
    </p>
    <Button
      variant='fill'
      accent='positive'
      className={styles.btn}
      as={Link}
      to={'/login'}
    >
      Log in
    </Button>
  </div>
)

const WrapperType = ({ children, className, isFullScreen }) =>
  isFullScreen ? (
    <Panel className={cx(styles.fullScreen, styles.wrapper, className)}>
      {children}
    </Panel>
  ) : (
    <div className={cx(styles.wrapper, className)}>{children}</div>
  )

const WatchlistsAnon = ({ isFullScreen, className, wrapperClassName }) => (
  <WrapperType isFullScreen={isFullScreen} className={wrapperClassName}>
    <EmptySection
      className={className}
      imgClassName={cx(styles.hide, className, isFullScreen && styles.img)}
    >
      <p className={styles.title}>Easy asset tracking</p>
      <p className={styles.desc}>Use watchlists to organize and track</p>
      <p className={styles.desc}>assets you are interested in</p>
      <LoginBlock />
    </EmptySection>
  </WrapperType>
)

export const ChartLayoutsAnon = ({ isFullScreen, className }) => (
  <WrapperType isFullScreen={isFullScreen}>
    <EmptySection
      className={className}
      imgClassName={cx(styles.hide, isFullScreen && styles.img)}
    >
      <p className={styles.title}>Make your own Chart Layouts</p>
      <p className={styles.desc}>Create, load and save</p>
      <p className={styles.desc}>your personal chart views</p>
      <LoginBlock />
    </EmptySection>
  </WrapperType>
)

export default WatchlistsAnon
