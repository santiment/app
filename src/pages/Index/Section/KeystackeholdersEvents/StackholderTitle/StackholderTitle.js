import React from 'react'
import { ProjectIcon } from '../../../../../components/ProjectIcon/ProjectIcon'
import { useProject } from '../../../../../hooks/project'
import { READABLE_NAMES } from '../hooks'
import Skeleton from '../../../../../components/Skeleton/Skeleton'
import styles from './StackholderTitle.module.scss'

function onLinkClick (e) {
  e.stopPropagation()
}

const StackholderTitle = ({ project: targetProject, count, slug, labels }) => {
  const uniqueLabels = [...new Set(labels)]
  const [project = targetProject, loading] = useProject(!targetProject && slug)

  const { logoUrl, name, ticker } = project || {}

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
              {ticker}
              <div className={styles.count}>{count}</div>
            </div>
          </>
        )}

        {loading && (
          <Skeleton
            repeat={1}
            show={loading}
            className={styles.skeleton}
            wrapperClassName={styles.skeletonWrapper}
          />
        )}
      </a>

      <div className={styles.labels}>
        {uniqueLabels.map(l => (
          <div key={l} className={styles.label}>
            {READABLE_NAMES[l] || l}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StackholderTitle
