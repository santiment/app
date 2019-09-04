import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import styles from './UpgradeBtn.module.scss'

const Trigger = ({ variant, className, children = 'Upgrade', ...props }) => (
  <Button
    className={cx(styles.btn, styles[variant], className)}
    accent='orange'
    {...props}
  >
    <Icon type='crown' className={styles.icon} />
    {children}
  </Button>
)

// NOTE(vanguard): redux passes "dispatch" prop to the component.
// We should capture it in order to not assign it as a invalid dom attribute
const UpgradeBtn = ({
  isLoggedIn,
  isUserLoading,
  loginRequired = true,
  dispatch,
  ...props
}) => {
  if (isUserLoading) {
    return null
  }

  return <Trigger as={Link} to='/pricing' {...props} />
}

const mapStateToProps = state => {
  return {
    isUserLoading: state.user.isLoading,
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default connect(mapStateToProps)(UpgradeBtn)
