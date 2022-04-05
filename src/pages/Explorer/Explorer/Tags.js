import React from 'react'
import styles from './explorer.module.scss'

const Tags = ({ items }) => {
    const hasMore = items.length > 3
    const moreCount = items.length - 3
    return (
        <div className={styles.tags}>
            {items.slice(0, 3).map((item, index) => (
                <div key={index} className={styles.tag}>
                    {item}
                </div>
            ))}
            {hasMore &&
                <div className={styles.tag}>
                    +{moreCount}
                </div>
            }
        </div>
    )
}

export default Tags