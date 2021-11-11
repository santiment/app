## Installation

### No Docker way
1. `mv .env.local.example .env.local`
2. Fill .env.local
3. `npm i`
4. `npm run start`
5. `npm run test` - One time run all tests
6. `npm run test:js` - Run js tests watcher

### Docker way

* `make start` - Start your docker container with dev server
* `make sh` - Bash in your dev container

### VSCODE

1. Install Remote-Containers extension in VSCode
2. Run Remote-Containers: Open Folder in Container... through command palette (F1 or Cmd-Shift-P)
3. Wait until first build and install has completed (note: this can take a while - it might also help to increase the memory docker has been allocated)
4. Open Terminal within VSCode (ctrl-`)

## Local development (under HTTPS)

To start your local development you need to:
1. Whitelist your domain
   1. Open `/etc/hosts`
   2. Add the following line: `127.0.0.1 dev.mylocalsite.com`
   3. Save the file
2. In `.env.local` add the following lines <br />
   `HTTPS=true`<br />
   `HOST='dev.mylocalsite.com'`
3. Install [mkcert](https://github.com/FiloSottile/mkcert)
4. Create your own certificate authority on your system <br />
   `mkcert -install`
5. Create a certificate for your custom domain and concatenate the two files <br />
   `mkcert "127.0.0.1" "localhost" "dev.mylocalsite.com"` <br />
   `cat *-key.pem *.pem > server.pem`
6. Create /.cert folder and move the server.pem file into it in app root directory
7. Run `npm run start`

## Lint/Format
We use prettier-standard. eslint rules from standard and format by prettier.
Setup your editor with prettier-standard lint rules - https://github.com/sheerun/prettier-standard

## Learn More
* [Sanbase](https://app.santiment.net)
* [Insights](https://insights.santiment.net)
* [Sheets](https://sheets.santiment.net)
* [SanR](https://sanr.santiment.net)
* [API](https://api.santiment.net)
* [Knowledge Base](https://academy.santiment.net)

## Become a SanDev
We're hiring developers, support people, and product managers all the time. Please check our [open positions](https://santiment.notion.site/Open-positions-f1880de7557b468a80b1465013f311cd)

[Contact us](mailto:jobs@santiment.net)

## Community
Join thousands of members worldwide in our [community server](https://santiment.net/discord).

## Get the Latest News

* [Twitter](https://twitter.com/santimentfeed)
* [Blog](https://insights.santiment.net)
* [Youtube](https://www.youtube.com/channel/UCSzP_Z3MrygWlbLMyrNmMkg)

Any other questions, reach out to us at [support@santiment.net](support@santiment.net). We’d happy to help!
