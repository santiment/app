export const HOLDERS_LABELS = [
  {
    label: 'Exchange',
    type: 'exchange'
  },
  {
    label: 'Infrastructure',
    type: 'infrastructure'
  },
  {
    label: 'Miner',
    type: 'miner'
  },
  {
    label: 'Whale',
    type: 'whale'
  },
  {
    label: 'Non Exchange',
    type: 'nonExchange'
  },
  {
    label: 'Non Infrastructure',
    type: 'nonInfrastructure'
  },
  {
    label: 'Non Miner',
    type: 'nonMiner'
  },
  {
    label: 'Non Whale',
    type: 'nonWhale'
  }
]

export const DISABLED_PAIRS = {
  whale: 'nonWhale',
  nonWhale: 'whale',
  exchange: 'nonExchange',
  nonExchange: 'exchange',
  miner: 'nonMiner',
  nonMiner: 'miner',
  infrastructure: 'nonInfrastructure',
  nonInfrastructure: 'infrastructure'
}
