# Know Your Location Trail

Location trail refers to a time stamped list of locations of a device which can be found using the GPS.

# Development

To develop this project you will need `nodejs` and `npm` (`npm` comes builtin with `node`) and `openssl`.

On Ubuntu and based distro you can install with this command.

```
sudo apt install nodejs && openssl
```

## Nodejs dependencies

1. `Rollup` for bundling js files.
   You can pull it via npm.

```
npm install --global rollup
```

2. `http-server` for serving app.
   You can pull it via npm.

```
npm install --global http-server
```

## Setup

1. To bundle `*.js` file into single file using `rollup`.

```
rollup -c
```

to watch for changes.

```
rollup -c -w
```

2. You'd need to generate `ssl certificate` for serving app via **https**.

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You will be prompted with a few questions after entering the command. Use `127.0.0.1` as value for `Common name`.

This command will create two files in project root `cert.pem` and `key.pem`

3. Serve app via **https**.

```
http-server -S
```

now goto `https://127.0.0.1:8080` to view app running.

That's all...
