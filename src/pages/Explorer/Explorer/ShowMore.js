import React from 'react'
import styles from './explorer.module.scss'

const ShowMore = ({label = 'Show more', onClick}) => {
    return (
        <div className={styles.showMore} onClick={onClick}>
            {label}
        </div>
    )
}

export default ShowMore