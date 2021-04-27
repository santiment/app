import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export const BLOCKHAIN_LABLE_READABLE = {
  defi: 'DeFi',
  deployer: 'Deployer',
  derivative_token: 'Derivative Token',
  withdrawal: 'Withdrawal',
  whale: 'Whale',
  miner: 'Miner',
  deposit: 'Deposit',
  centralized_exchange: 'Centralized Exchange',
  contract_factory: 'Contract Factory',
  deposit_unclear: 'Deposit Unclear',
  decentralized_exchange: 'Decentralized Exchange',
  dex_trader: 'DEX Trader',
  genesis: 'Genesis',
  proxy: 'Proxy',
  deposit_wrong: 'Deposit wrong',
  system: 'System',
  stablecoin: 'Stablecoin',
  '0x_ecosystem': '0x Ecosystem',
  eth2stakingcontract: 'ETH2 Staking Contract',
  'makerdao-bite-keeper': 'MakerDao Bite Keeper',
  'makerdao-cdp-owner': 'MakerDao CDP Owner',
  uniswap_ecosystem: 'Uniswap Ecosystem'
}

export const getBlockchainLabelReadable = label => {
  return BLOCKHAIN_LABLE_READABLE[label] || label
}

const BLOCKCHAIN_LABELS_QUERY = gql`
  {
    blockchainAddressLabels
  }
`

export const useBlockchainLabels = () => {
  const { data, loading, error } = useQuery(BLOCKCHAIN_LABELS_QUERY)

  return [data ? data.blockchainAddressLabels : [], loading, error]
}
