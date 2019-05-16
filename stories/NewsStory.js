import React from 'react'
import { storiesOf } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'
import News from "../src/components/News/News";

const news = [
  {
    "datetime": "2019-04-21T11:37:59Z",
    "description": "Litecoin Price Reverses Course as Drop to $75 Looms Ahead  NullTXAs was somewhat to be expected, there is a lot of bearish pressure across all of the different cryptocurrency markets. While this is not entirely surprising, it would ...",
    "mediaUrl": null,
    "sourceName": "NullTX",
    "title": "Litecoin Price Reverses Course as Drop to $75 Looms Ahead - NullTX",
    "url": "https://nulltx.com/litecoin-price-reverses-course-as-drop-to-75-looms-ahead/"
  },
  {
    "datetime": "2019-04-21T12:58:20Z",
    "description": "Belarus plans to use Nucleur energy for Bitcoin[BTC] mining, plans to be the successor of China  BlockmanityEver since China announced the possible banning of Bitcoin mining, Belarus has been doing everything it can to replace China and become a Bitcoin mining ...",
    "mediaUrl": null,
    "sourceName": "Blockmanity",
    "title": "Belarus plans to use Nucleur energy for Bitcoin[BTC] mining, plans to be the successor of China - Blockmanity",
    "url": "https://blockmanity.com/news/bitcoin/belarus-plans-to-use-nucleur-energy-for-bitcoinbtc-mining-plans-to-be-the-successor-of-china/"
  },
  {
    "datetime": "2019-04-21T14:56:00Z",
    "description": "XRP Becomes Available for Transactions on New BelcoBTM Cryptocurrency ATMs in New Jersey  Bitcoin Exchange GuideThe ease of exchange of digital currency has been the base upon which many crypto exchange platforms have developed their updates. Since the ...",
    "mediaUrl": null,
    "sourceName": "Bitcoin Exchange Guide",
    "title": "XRP Becomes Available for Transactions on New BelcoBTM Cryptocurrency ATMs in New Jersey - Bitcoin Exchange Guide",
    "url": "https://bitcoinexchangeguide.com/xrp-becomes-available-for-transactions-on-new-belcobtm-cryptocurrency-atms-in-new-jersey/"
  }
]


storiesOf('News', module)
  .add('News Block ', () => (
    <Router>
      <div style={{ margin: 20 }}>
        News Block
        <hr />
        <News data={news} />
      </div>
    </Router>
  ))
