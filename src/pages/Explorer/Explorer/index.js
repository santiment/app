import React, {useState} from 'react'
import TopButtons from './TopButtons'
import Header from './Header'
import ShowMore from './ShowMore'
import Row from './Row'
import { BUTTONS, ENTITY_TYPES } from './shared'

const Explorer = () => {
    const [activeButton, setActiveButton] = useState(BUTTONS.NEW)
    const [showMore, setShowMore] = useState(true)
    return (
        <div>
            <TopButtons activeButton={activeButton} setActiveButton={setActiveButton} />
            <Header />
            <Row entity={ENTITY_TYPES.ADDRESS}/>
            {showMore && <ShowMore />}
        </div>
    )
}

export default Explorer
