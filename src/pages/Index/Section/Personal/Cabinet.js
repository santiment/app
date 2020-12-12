import React from 'react'
import Accordion from '../../Accordion'

const cabinets = [
  {
    title: 'Title 1',
    content: 'Content 1'
  },
  {
    title: 'Title 2',
    content: 'Content 2'
  }
]

const Cabinet = () => {
  return cabinets.map(({ title, content }) => (
    <Accordion key={title} title={title}>
      {content}
    </Accordion>
  ))
}

export default Cabinet
