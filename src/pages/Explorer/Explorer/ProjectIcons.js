import React from 'react'
import cx from 'classnames'
import styles from './explorer.module.scss'

const ProjectIcons = ({ projects = [] }) => {
    const hasMore = projects.length > 3
    const moreCount = projects.length - 3
    return (
        <div className={styles.projects}>
            {projects.slice(0, 3).map((project, index) => (
                <img key={index} style={{ zIndex: 4 - index }} src={project.logoUrl} alt={project.name || project.ticker} className={cx(styles.projectIcon, styles.holder)} />
            ))}
            {hasMore &&
                <div className={cx(styles.counter, styles.holder)} style={{ zIndex: 1 }}>
                    +{moreCount}
                </div>
            }
        </div>
    )
}

export default ProjectIcons