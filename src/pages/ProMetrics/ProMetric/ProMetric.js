import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import styles from './ProMetric.module.scss'

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
      </div>
      <div className={cx(styles.svg, classes.svg, isLeft && styles.svgLeft)}>
        {!isProSanbase ? (
          <UpgradeToUse className={styles.upgrade} />
        ) : (
          <LinkToTemplate link={linkToTemplate} />
        )}
        {isImage ? <img src={svg} alt={title} /> : svg}
      </div>
    </div>
  )
}

const LinkToTemplate = ({ link }) => {
  if (!link) {
    return <div className={styles.linkToTemplate}>&nbsp;</div>
  }

  return (
    <a
      className={cx(styles.link, styles.linkToTemplate)}
      target='_blank'
      rel='noopener noreferrer'
      href={link}
    >
      Open to use <Icon className={styles.upgradeIcon} type='pointer-right' />
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

export default ProMetric
