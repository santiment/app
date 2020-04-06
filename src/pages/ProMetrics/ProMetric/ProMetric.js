import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import styles from './ProMetric.module.scss'
import { getCurrentSanbaseSubscription } from '../../../utils/plans'
import { PRO } from '../../../components/Navbar/NavbarProfileDropdown'
import { connect } from 'react-redux'

const ProMetric = ({
  classes = {},
  metric: { title, description, svg, isImage, isLeft, linkToTemplate },
  isProSanbase
}) => {
  return (
    <div
      className={cx(
        styles.container,
        classes.container,
        isLeft && styles.isLeft
      )}
    >
      <div className={styles.descriptions}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        {!isProSanbase ? (
          <UpgradeToUse className={styles.upgrade} />
        ) : (
          <LinkToTemplate link={linkToTemplate} />
        )}
      </div>
      <div className={cx(styles.svg, classes.svg, isLeft && styles.svgLeft)}>
        {isImage ? <img src={svg} alt={title} /> : svg}
      </div>
    </div>
  )
}

const LinkToTemplate = ({ link }) => {
  if (!link) {
    return null
  }

  return (
    <a
      className={styles.link}
      target='_blank'
      rel='noopener noreferrer'
      href={link}
    >
      Open to use
    </a>
  )
}

const UpgradeToUse = ({ className }) => {
  return (
    <UpgradeBtn className={className} variant='flat' showCrownIcon={false}>
      <>
        Upgrade to use{' '}
        <Icon className={styles.upgradeIcon} type='pointer-right' />
      </>
    </UpgradeBtn>
  )
}

const mapStateToProps = ({ user: { data } }) => {
  const sanbaseSubscription = getCurrentSanbaseSubscription(data)

  const isProSanbase =
    sanbaseSubscription && sanbaseSubscription.plan
      ? sanbaseSubscription.plan.name === PRO
      : false

  return {
    isProSanbase
  }
}

export default connect(mapStateToProps)(ProMetric)
