import React from 'react'
import styles from './explorer.module.scss'

const User = () => {
    return (
        <div className={styles.user}>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
            <div className={styles.username}>@username</div>
        </div>
    )
}

export default User