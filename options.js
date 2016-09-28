const commander = require('commander')

const opts = commander
  .version(require('./package.json').version)
  .usage('[path] [options]')
  .option(
    '-a, --address [127.0.0.1]',
    'address to use',
    '127.0.0.1'
  ).option(
    '-p, --ssl-port [4443]',
    'ssl port to use',
    4443
  ).option(
    '--http-port [8080]',
    'http port which redirects to ssl port',
    8080
  ).option(
    '-c, --cache',
    'enable cache'
  ).option(
    '-m, --maxAge [0]',
    `cache maxAge in ms acceptable string
    https://github.com/zeit/ms
`
  ).option(
    '-P, --no-push',
    'disable naive PUSH_PROMISE'
  ).option(
    '-o, --open [xdg-open]',
    `open default app after starting the server
    -o firefox
    -o "google-chrome --incognito"
    -o "curl --insecure"
`
  ).option(
    '-l, --log [dev]',
    `log format (dev|combined|common|short|tiny)
    https://github.com/expressjs/morgan#predefined-formats
`,
    'dev'
  ).option(
    '-s, --silent',
    'suppress log messages from output'
  ).option(
    '--cors',
    'enable CORS via the Access-Control-Allow-Origin header'
  ).option(
    '-S, --no-ssl',
    `disable https
      Works as plain http server without http2, spdy, push_promise
`
  ).option(
    '-e, --cert [cert/cert.crt]',
    'path to ssl cert file',
    'cert/cert.crt'
  ).option(
    '-k, --key  [cert/cert.key]',
    'path to ssl key file',
    'cert/cert.key'
  ).option(
    '--generate-cert',
    'save autogenerated certificates to ./cert and exit'
  ).option(
    '--trust-cert',
    'add certificate to trusted (currently linux only)'
  ).option(
    '-g, --gzip',
    'enable gzip compression'
  ).option(
    '-i, --index [index.html]',
    'Specify index file name',
    'index.html'
  ).option(
    '-I, --no-autoindex',
    'Disable auto index'
  ).parse(process.argv)
  

opts.protocol   = opts.ssl ? 'https' : 'http'
opts.serverType = opts.ssl ? 'Http2/Https' : 'Http'
opts.URL        = `${opts.protocol}://${opts.address}:${opts.ssl ? opts.sslPort : opts.httpPort}`

module.exports = opts
// -P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com
// http://stackoverflow.com/questions/31100474/accessing-non-ssl-socket-io-nodejs-server-from-ssl-apache-request-same-host
// -r or --robots Provide a /robots.txt (whose content defaults to 'User-agent: *\nDisallow: /')
