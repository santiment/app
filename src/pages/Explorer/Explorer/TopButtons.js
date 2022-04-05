import React from 'react'
import cx from 'classnames'
import { BUTTONS } from './shared'
import styles from './explorer.module.scss'

const TopButton = ({label, Icon, isActive = false, onClick}) => {
    return (
        <button className={cx(styles.topicon, isActive && styles.active)} onClick={onClick}>
            <Icon /> {label}
        </button>
    )
}

const TopButtons = ({ activeButton, setActiveButton }) => {
    const isActive = btn => btn.label === activeButton.label

    const Button = ({btn}) => (
        <TopButton {...btn} isActive={isActive(btn)} onClick={() => setActiveButton(btn)}/>
    )

    return (
        <div className={styles.buttonsContainer}>
            <div className={styles.buttons}>
                <Button btn={BUTTONS.NEW} />
                <Button btn={BUTTONS.LIKES} />
            </div>
            <div>
                <Button btn={BUTTONS.MY_CREATIONS} />
            </div>
        </div>
    )
}

export default TopButtons
