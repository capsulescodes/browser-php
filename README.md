
<p align="center"><img src="capsules-browser-php-image.svg" width="400px" height="265px" alt="Browser PHP" /></p>

Run any PHP stuff within your browser.

The Browser PHP package offers a collection of commands for running PHP from the Node CLI or for launching a PHP server from Node. Perfect for running a Laravel project in Stackblitz, for example.

<br>

## Installation

```bash
npm install --save-dev browser-php
```

<br>
<br>

## Usage

This package gives access to two binaries `php` and `serve` :

<br>

### PHP
```
node node_modules/.bin/php
```

<br>

Or add `script` in `package.json`
```
"scripts" : {
    "php" : "php"
},
```

<br>

Example
```
npm run php -r "echo 'Hello Browser PHP World!';"


> Hello Browser PHP World!
```

<br>
<br>

### Serve
```
node node_modules/.bin/serve
```

<br>

Or add `script` in `package.json`
```
"scripts" : {
    "serve" : "serve"
},
```

<br>

Example
```
npm run serve


> PHP server is listening on url http://localhost:2222
```

<br>
<br>

## Configuration

The scripts can be configured with environment variables

- `BROWSER_PHP_VERSION` : The PHP version you need | default : `8.2`
- `BROWSER_PHP_HOST` : The host name you need | default : `http://localhost`
- `BROWSER_PHP_PORT` : The port you need | default : `2222`
- `BROWSER_PHP_PATH` : The directory path you need | default : `public`
- `BROWSER_PHP_DEBUG` : The debug mode you need | default : `false`

<br>
<br>

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

- [Capsules Codes](https://github.com/capsulescodes)

## License

[MIT](https://choosealicense.com/licenses/mit/)
