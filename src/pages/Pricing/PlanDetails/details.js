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
            '20 API calls / min',
            '60 API calls / min',
            '120 API calls / min'
          ]
        },
        {
          name: 'API calls / month',
          texts: [
            '5K API calls / mo',
            '10K API calls / mo',
            '300K API calls / mo'
          ]
        },
        {
          name: 'Type of metrics',
          texts: ['Standard', 'Standard', 'Advanced']
        },
        {
          name: 'Attribution',
          texts: ['Attribution required', 'No attribution', 'No attribution']
        }
      ]
    },
    {
      group: { name: 'Financial data' },
      data: [
        { name: 'Open/High/Low/Close' },
        { name: 'Price-volume difference indicator' }
      ]
    },
    {
      group: { name: 'On-chain data' },
      data: [
        { name: 'Daily active addresses' },
        { name: 'Network growth' },
        { name: 'Token age consumed' },
        { name: 'Average token age consumed' },
        { name: 'Exchange flow' },
        { name: 'Total ERC20 exchange funds flow' },
        { name: 'Transaction volume' },
        { name: 'Total circulation (beta)', checks: [false, true, true] },
        { name: 'Velocity of tokens (beta)', checks: [false, true, true] },
        { name: 'ETH gas used', checks: [false, true, true] },
        {
          name: 'Distribution between mining pools',
          checks: [false, true, true]
        },
        {
          name: 'Top holders percent of total supply',
          checks: [false, true, true]
        },
        {
          name: 'Percent of total supply on exchanges',
          checks: [false, true, true]
        },
        {
          name: 'Realized value',
          checks: [false, false, true]
        },
        {
          name: 'MVRV ratio',
          checks: [false, false, true]
        },
        { name: 'NVT', checks: [false, false, true] },
        {
          name: 'Daily active deposits',
          checks: [false, false, true]
        }
      ]
    },
    {
      group: { name: 'Social data' },
      data: [
        { name: 'Dev activity' },
        { name: 'Topic search' },
        { name: 'Relative social dominance', checks: [false, true, true] },
        { name: 'Total social volume', checks: [false, true, true] }
      ]
    }
  ]
}
