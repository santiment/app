import React from 'react'
import Card from './Card'

const Cards = ({ watchlists, ...props }) =>
  watchlists.map(watchlist => (
    <Card {...props} key={watchlist.id} watchlist={watchlist} />
  ))

export default Cards
