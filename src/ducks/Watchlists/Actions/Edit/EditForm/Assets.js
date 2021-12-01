import React from 'react'
import Label from '@santiment-network/ui/Label'
import MultiInput from '@santiment-network/ui/Input/MultiInput'
// import {CollapsedLabels} from '../../../../../ducks/HistoricalBalance/Address/Labels'
import styles from './index.module.scss'

const Assets = ({watchlist}) => {
    const items = watchlist.listItems.map(l => l.project);

    return (
        <>
            <Label accent='waterloo' className={styles.description__label}>
                Assets
            </Label>
            <MultiInput
                values={items}
                defaultValues={items}
                valueContent={item => {
                    return (
                        <div onClick={e => e.preventDefault()}>
                            {item.name} <span>{item.ticker}</span>
                        </div>
                    )
                }}
            >
            </MultiInput>
        </>
    )
}

export default Assets