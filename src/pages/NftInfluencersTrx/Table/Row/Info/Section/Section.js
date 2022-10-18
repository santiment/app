import React from 'react'

const Section = ({ isSingle, titles, children }) => {
  if (isSingle) {
    return (
      <div className='column'>
        <div className='txt-m c-casper'>{titles[0]}</div>
        <div className='body-2 row v-center justify'>{children}</div>
      </div>
    )
  }

  return (
    <div className='row justify'>
      <div className='column'>
        <div className='txt-m c-casper'>{titles[0]}</div>
        {children[0]}
      </div>
      <div className='column justify txt-right'>
        <div className='txt-m c-casper'>{titles[1]}</div>
        {children[1]}
      </div>
    </div>
  )
}

export default Section
