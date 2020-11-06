export default {
  rows: [
    {
      group: { name: 'General' },
      data: [
        {
          name: 'Historical data access',
          texts: ['Last 3 months', 'Last 6 months']
        },
        {
          name: 'API calls / minute',
          texts: ['20 API calls / min', '60 API calls / min']
        },
        {
          name: 'API calls / month',
          texts: ['5K API calls / mo', '10K API calls / mo']
        },
        { name: 'Type of metrics', texts: ['Standard', 'Standard'] },
        {
          name: 'Attribution',
          texts: ['Attribution required', 'No attribution']
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
        { name: 'Total circulation (beta)', checks: [false, true] },
        { name: 'Velocity of tokens (beta)', checks: [false, true] },
        { name: 'ETH gas used', checks: [false, true] },
        { name: 'Distribution between mining pools', checks: [false, true] },
        { name: 'Top holders percent of total supply', checks: [false, true] },
        { name: 'Percent of total supply on exchanges', checks: [false, true] },
        {
          name: 'Realized value',
          checks: [false, false]
        },
        {
          name: 'MVRV ratio',
          checks: [false, false]
        },
        { name: 'NVT', checks: [false, false] },
        {
          name: 'Daily active deposits',
          checks: [false, false]
        }
      ]
    },
    {
      group: { name: 'Social data' },
      data: [
        { name: 'Dev activity' },
        { name: 'Topic search' },
        { name: 'Relative social dominance', checks: [false, true] },
        { name: 'Total social volume', checks: [false, true] }
      ]
    }
  ]
}
