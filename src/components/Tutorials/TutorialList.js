import React, { useState } from 'react'
import TutorialCard from './TutorialCard'
import TutorialsDialog from './TutorialsDialog'
import { tutorials } from './tutorials'

const TutorialList = () => {
  const [selected, setSelected] = useState()

  return (
    <>
      {tutorials.map(tutorial => (
        <TutorialCard
          key={tutorial.title}
          onClick={() => setSelected(tutorial)}
          {...tutorial}
        />
      ))}
      <TutorialsDialog
        open={!!selected}
        selectedTutorial={selected}
        onClose={setSelected}
      />
    </>
  )
}

export default TutorialList
