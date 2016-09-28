*Stop bundling your css/js and enjoy [HTTP2](https://http2.github.io/) and [PUSH_PROMISE](http://httpwg.org/specs/rfc7540.html#PUSH_PROMISE)*

#http2-server
Simple HTTP2/SPDY server similiar to [http-server](https://github.com/indexzero/http-server) using [express](https://github.com/expressjs/express) & [node-spdy](https://github.com/indutny/node-spdy)

#Installation
```
  sudo npm install -g static-http2-server
```
#Naive PUSH_PROMISE
By default http2-server match static resources with their Referer header (for example '/') and will [server push](https://http2.github.io/faq/#whats-the-benefit-of-server-push) them coupled with response, when refered resource (e.g. index.html) would be requested next time

#Usage

```

http2-server [path] [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -a, --address [127.0.0.1]    address to use
    -p, --ssl-port [4443]        ssl port to use
    --http-port [8080]           http port which redirects to ssl port
    -c, --cache                  enable cache
    -m, --maxAge [0]             cache maxAge in ms acceptable string
        https://github.com/zeit/ms
    
    -P, --no-push                disable naive PUSH_PROMISE
    -o, --open [xdg-open]        open default app after starting the server
        -o firefox
        -o "google-chrome --incognito"
        -o "curl --insecure"
    
    -l, --log [dev]              log format (dev|combined|common|short|tiny)
        https://github.com/expressjs/morgan#predefined-formats
    
    -s, --silent                 suppress log messages from output
    --cors                       enable CORS via the Access-Control-Allow-Origin header
    -S, --no-ssl                 disable https
          Works as plain http server without http2, spdy, push_promise
    
    -e, --cert [certs/cert.pem]  path to ssl cert file
    -k, --key  [certs/key.pem]   path to ssl key file
    --generate-cert              save autogenerated certificates and exit
    --trust-cert                 add certificate to trusted (currently linux only)
    -g, --gzip                   enable gzip compression
    -i, --index [index.html]     Specify index file name
    -I, --no-autoindex           Disable auto index


```

#Usage as a dependency in your project

```
npm install static-http2-server --save
```
```package.json
...
  "scripts": {
    "start": "node_modules/.bin/http2-server -o",
  },
...  
```

#SSL certificates
For development you can use autogenerated selfsigned certificates. For production you should use [Let's encrypt](https://letsencrypt.org/) or any other [certificate authority](https://en.wikipedia.org/wiki/Certificate_authority)


####Generate selfsigned certificates and trust them
```
  http2-server --generate-cert --trust-cert
```

####Add previously generated certificate to trusted
```
  http2-server --trust-cert --cert path/to/your.cert
```

####Additionally you can try
[letsencrypt-cli](https://github.com/Daplie/letsencrypt-cli)
