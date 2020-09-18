import React from 'react'
import { useTopClaimers } from './gql'
import styles from '../index.module.scss'

const TopClaimersTable = ({ className }) => {
  const [items, loading] = useTopClaimers('uniswap')

  return <div className={className} />
}

export default TopClaimersTable
