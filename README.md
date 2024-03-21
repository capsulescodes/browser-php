
<p align="center"><img src="https://github.com/capsulescodes/browser-php/raw/main/capsules-browser-php-image.svg" width="400px" height="265px" alt="Browser PHP" /></p>

Run any PHP stuff within your browser.

The Browser PHP package offers a collection of commands for running PHP from the Node CLI or for launching a PHP server from Node. Perfect for running a Laravel project in CodeSandbox, for example.

<br>

 [This article](https://capsules.codes/en/blog/fyi/en-fyi-run-laravel-on-your-browser-with-browser-php) provides an in-depth exploration of the package.

<br>

> [!WARNING]
> This package serves as a proof of concept and is currently under active development. We recommend exercising caution when using it.


<br>

## Installation

```bash
npm install --save-dev browser-php
```

<br>
<br>

## Usage

This package gives access to three binaries. `php` and `serve` from `node_modules`, `composer` from `vendor`.

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


### Composer
```
node node_modules/.bin/php --disable-functions vendor/bin/composer
```

<br>

Or add `script` in `package.json`
```
"scripts" : {
    "composer": "php --disable-functions vendor/bin/composer"
},
```

<br>

Example
```
npm run composer

>    ______
>   / ____/___  ____ ___  ____  ____  ________  _____
>  / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
> / /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
> \____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
>                     /_/
> Composer version 2.7.2 2024-03-11 17:12:18
```

<br>
<br>

## Configuration

The scripts can be configured with environment variables

- `BROWSER_PHP_VERSION` : The PHP version you need | default : `8.2`

- `BROWSER_PHP_COMPOSER_VERSION` : The Composer executable version | default : `2.7.2`
- `BROWSER_PHP_COMPOSER_PATH` : The Composer executable path | default : `vendor/bin`
- `BROWSER_PHP_COMPOSER_NAME` : The Composer executable name | default : `composer`

- `BROWSER_PHP_SERVER_HOST` : The host name you need | default : `http://localhost`
- `BROWSER_PHP_SERVER_PORT` : The port you need | default : `2222`
- `BROWSER_PHP_SERVER_PATH` : The directory path you need | default : `public`
- `BROWSER_PHP_SERVER_DEBUG` : The debug mode you need | default : `false`

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
