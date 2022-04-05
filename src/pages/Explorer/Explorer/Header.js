import React from 'react'
import styles from './explorer.module.scss'

const Header = ({title = "Explorer"}) => {
    return (
        <div className={styles.header}>
            <h3>{title}</h3>
            <div className={styles.actions}>
                {/* TODO */}
                <div>All time</div>
                <div>Assets: All</div>
                <div>Types: 5</div>
            </div>
        </div>
    )
}

export default Header