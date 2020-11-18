export default {
  rows: [
    {
      group: { name: 'General' },
      data: [
        {
          name: 'Historical data access',
          texts: ['Last 3 months', 'Last 6 months', '10K API calls / mo']
        },
        {
          name: 'API calls / minute',
          texts: [
            '100 API calls / min',
            '100 API calls / min',
            '300 API calls / min'
          ]
        },
        {
          name: 'API calls / hour',
          texts: [
            '500 API calls / hour',
            '1000 API calls / hour',
            '3000 API calls / hour'
          ]
        },
        {
          name: 'API calls / month',
          texts: [
            '1K API calls / mo',
            '5K API calls / mo',
            '300K API calls / mo'
          ]
        }
      ]
    },
    {
      group: { name: 'Support' },
      data: [
        {
          name: 'Priority support',
          checks: [false, true, true]
        },
        {
          name: 'Dedicated account manager',
          checks: [false, false, true]
        },
        {
          name: 'Custom onboarding & education',
          checks: [false, false, true]
        }
      ]
    },
    {
      group: { name: 'Integrations' },
      data: [
        {
          name: 'Google Sheets Plugin',
          checks: [false, true, true]
        },
        {
          name: 'CSV',
          checks: [false, true, true]
        },
        {
          name: 'Telegram',
          checks: [true, true, true]
        }
      ]
    },
    {
      group: { name: 'Financial data' },
      data: [{ name: 'Price' }, { name: 'Marketcap' }, { name: 'Volume' }]
    },
    {
      group: { name: 'On-chain data' },
      data: [
        { name: 'Daily active addresses' },
        { name: 'Rolling 24-hour active addresses ' },
        { name: '1-hour active addresses' },
        { name: 'Price-DAA Divergence model' },
        { name: 'Network growth' },
        { name: 'Transaction volume' },
        { name: 'Top transactions dashboard' },
        { name: 'Velocity' },
        {
          name:
            'Circulation (1d, 7d, 30d, 60d, 90d, 180d, 365d, 2y, 3y, 5y, 10y)'
        },
        { name: 'Age consumed' },
        {
          name:
            'Dormant circulation (1d, 7d, 30d, 60d, 90d, 180d, 365d, 2y, 3y, 5y, 10y)'
        },
        { name: 'Mean Coin Age' },
        { name: 'Mean Dollar Invested Age' },
        {
          name:
            'MVRV ratio (intraday, 1d, 7d, 30d, 60d, 90d, 180d, 365d, 2y, 3y, 5y, 10y)'
        },
        { name: 'MVRV Long/Short difference' },
        {
          name:
            'Realized cap (1d, 7d, 30d, 60d, 90d, 180d, 365d, 2y, 3y, 5y, 10y)'
        },
        { name: 'Network realized profit/loss' },
        { name: 'NVT ratio (using transaction volume)' },
        { name: 'NVT ratio (using circulation)' },
        { name: 'Stock to Flow ratio' },
        { name: 'Daily active deposits' },
        { name: 'Deposit transactions' },
        { name: 'Exchange inflow' },
        { name: 'Exchange outflow' },
        { name: 'Exchange flow balance' },
        { name: 'Coin supply on exchanges' },
        { name: 'Coin supply on exchanges (as % of total supply)' },
        { name: 'Coin supply outside of exchanges' },
        { name: 'Withdrawal transactions' },
        { name: 'Holder distribution' },
        { name: 'Holder distribution combined balance' },
        { name: 'Amount held by top addresses' },
        { name: 'Amount held by top addresses (as % of total supply)' },
        { name: 'Amount held by top non-exchange addresses' },
        { name: 'Amount held by top exchange addresses' },
        { name: 'Gas used' },
        { name: 'Miner balance (ETH)' },
        { name: 'Total value locked in DeFi' },
        { name: 'Tokenized BTC on Ethereum' },
        { name: 'Decentralized exchanges (total volume)' },
        { name: 'Decentralized exchanges (dex-specific volume)' },
        { name: 'Decentralized exchanges (total number of trades)' },
        { name: 'Decentralized exchanges (dex-specific number of trades)' },
        { name: 'ETH spent over time (ETH and ERC-20 projects)' }
      ]
    },
    {
      group: { name: 'Development metrics' },
      data: [
        { name: 'Development activity' },
        { name: 'Development contributors count' }
      ]
    },
    {
      group: { name: 'Social metrics' },
      data: [
        { name: 'Social dominance' },
        { name: 'Social volume' },
        { name: 'Social sentiment (total)' },
        { name: 'Social sentiment (twitter)' },
        { name: 'Social sentiment (reddit)' },
        { name: 'Social sentiment (telegram)' },
        { name: 'Topic Search' },
        {
          name: 'Santrends (Top 10 hyped trends right now)',
          checks: [false, true, true]
        }
      ]
    }
  ]
}
