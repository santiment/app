const fs = require('fs')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('.env.local'))
const { By, Key, Builder, until } = require('selenium-webdriver')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

const allCapabilities = [
  {
    os: 'OS X',
    os_version: 'High Sierra',
    browserName: 'Safari',
    platform: 'OS X',
    browser_version: '11.1',
    resolution: '1280x1024',
    'browserstack.user': envConfig.BROWSERSTACK_USER,
    'browserstack.key': envConfig.BROWSERSTACK_KEY,
    acceptSslCerts: true
  },
  {
    browserName: 'chrome',
    version: '68.0',
    platform: 'WINDOWS',
    resolution: '1280x1024',
    'browserstack.user': envConfig.BROWSERSTACK_USER,
    'browserstack.key': envConfig.BROWSERSTACK_KEY
  },
  {
    browserName: 'firefox',
    version: '66.0',
    platform: 'WINDOWS',
    resolution: '1920x1200',
    'browserstack.user': envConfig.BROWSERSTACK_USER,
    'browserstack.key': envConfig.BROWSERSTACK_KEY
  }
]

let driver
const waitUntilTime = 20000

for (const capabilities of allCapabilities) {
  beforeAll(async () => {
    driver = new Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build()
    await driver.get('https://app-stage.santiment.net')
  }, 20000)

  afterAll(() => {
    driver.quit()
  }, 20000)

  describe('Dashboard', () => {
    it('Desktop: screenshots', async () => {
      driver.wait(
        until.elementLocated(By.css('[class^=DashboardPage_wrapper]')),
        waitUntilTime
      )
      const title = await driver.getTitle()
      expect(title).toEqual('Sanbase')
      const data = await driver.takeScreenshot()
      fs.writeFile(
        `./screenshots/${title}_${capabilities.resolution}_${
          capabilities.platform
        }.png`,
        data.replace(/^data:image\/png;base64,/, ''),
        'base64',
        err => {
          if (err) throw err
        }
      )
    })
  }, 30000)
}
