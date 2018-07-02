# node-https-loader

> HTTPS Custom Loader for Node.js

# Experimental

It works with Node.js `10.5.0` and is subject for changes at any time

## How to get started

1. You need to specify `--experimental-modules` flag
2. You need to specify the loader in order to be able to load modules by `https` (`--loader <LOADER_PATH>`)

#### Example

```bash
node --experimental-modules --loader ./node-https-loader.mjs test.mjs
```

## How it works

1. It loads desired script from the internet and saves it with hashed name
2. When loads the next time it won't go to the internet, instead it will load the script from the disk

## Caveats

1. Saves loaded scripts to the `tmp/` by default (You should probably override it with `NODE_HTTPS_MODULES` env)
2. Right now it works like browser `<script>` tag meaning it loads **bundles** only (for now at least)
