import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Labels from './Labels'
import { useProject } from '../../../../../hooks/project'
import Skeleton from '../../../../../components/Skeleton/Skeleton'
import { ProjectIcon } from '../../../../../components/ProjectIcon/ProjectIcon'
import Crown from '../../../../../components/Illustrations/Crown'
import styles from './StackholderTitle.module.scss'

const OBJ = {}

const getUniqueLabels = (labels) => [...new Set(labels)]

function onLinkClick(e) {
  e.stopPropagation()
}

export const StakeholderProBanner = ({ signals }) => {
  const uniqueLabels = getUniqueLabels(signals)

  return (
    <Link to='/pricing' className={styles.containerPro} target='_blank'>
      <span className={styles.info}>
        <Crown className={styles.imgPro} />
        <div className={styles.name}>
          PRO signals
          <div className={cx(styles.count, styles.countPro)}>{signals.length}</div>
        </div>
      </span>
      <Button className={styles.upgrade} accent='orange' variant='fill'>
        Upgrade
      </Button>
      <Labels labels={uniqueLabels} />
    </Link>
  )
}

const StackholderTitle = ({ project: targetProject, count, slug, labels }) => {
  const uniqueLabels = getUniqueLabels(labels)
  const [project = targetProject, loading] = useProject(!targetProject && slug)
  const { logoUrl, name, ticker } = project || OBJ

  return (
    <div className={styles.container}>
      <a
        className={styles.info}
        href={`/charts?slug=${slug}`}
        onClick={onLinkClick}
        rel='noopener noreferrer'
        target='_blank'
      >
        {!loading && (
          <>
            <ProjectIcon slug={slug} size={20} logoUrl={logoUrl} />
            <div className={styles.name}>{name}</div>
            <div className={styles.ticker}>
              {ticker} <div className={styles.count}>{count}</div>
            </div>
          </>
        )}

        <Skeleton
          repeat={1}
          show={loading}
          className={styles.skeleton}
          wrapperClassName={styles.skeletonWrapper}
        />
      </a>

      <Labels labels={uniqueLabels} />
    </div>
  )
}

export default StackholderTitle
