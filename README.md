# simple-encryptor

A simple encryptor/decryptor for Node.js.

[![NPM](https://nodei.co/npm/simple-encryptor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/simple-encryptor/)

[![Build Status](https://travis-ci.org/sehrope/node-simple-encryptor.svg?branch=master)](https://travis-ci.org/sehrope/node-simple-encryptor)

# Installation

Add it to your node.js project via:

```sh
npm install simple-encryptor --save
```

# Usage
First create an encryptor:

```js
// Specify a string key:
// Don't do this though, your keys should most likely be stored in env variables
// and accessed via process.env.MY_SECRET_KEY
var key = 'real secret keys should be long and random';

// Create an encryptor:
var encryptor = require('simple-encryptor')(key);
```

To encrypt something:

```js
var encrypted = encryptor.encrypt('testing');
// Should print gibberish:
console.log('encrypted: %s', encrypted);
```

To decrypt it:

```js
var decrypted = encryptor.decrypt(encrypted);
// Should print 'testing'
console.log('decrypted: %s', decrypted);
```

To generate an HMAC:

```js
var myHmac = encryptor.hmac('testing');
```

Encrypt/decrypt an object (not just a string!):

```js
// nested object:
var obj = {
  foo: {
    bar: [1, "baz"]
  }
};
var objEnc = encryptor.encrypt(obj);
// Should print gibberish:
console.log('obj encrypted: %s', objEnc);
var objDec = encryptor.decrypt(objEnc);
// Should print: {"foo":{"bar":[1,"baz"]}}
console.log('obj decrypted: %j', objDec);
```

# Features

* Encrypt arbitrary objects, not just strings (objects are converted to/from JSON)
* Unique IV per call so no two calls should return the same result for the same input
* Defaults to encrypt-then-mac with AES-256 and SHA-256 HMAC
* Optionally disable HMACs for shorter results
* No complicated options
* Defaults to rejecting short keys (min length is 16)
* Written to be easy to read

# API
The module provides three functions:

* `encryptor.encrypt(obj)` - Encrypt the object and return back the encrypted cipher text. The object is first converted to text via `JSON.stringify(...)`. This means you can encrypt arbitrary objects.
* `encryptor.decrypt(cipherText)` - Decrypts the cipher text and returns the original object. Specifically, it decrypts the cipher text and calls `JSON.parse(...)` on the result. If an error occurs during the decryption then null is returned. __Note:__ This function never throws an error for bad input, it just returns `null`.
* `encryptor.hmac(string)` - Calculate the HMAC of the input string.

# Options
This module supports two forms of creating an encryptor:

## String Key - `encryptor(key)`
If the first parameter is a string then it will be used as the key and the rest of the options will be defaulted.

Example:

```js
// Don't hard code keys! They should be in environment variables!
var encryptor = require('simple-encryptor')('my secret key');
```

## Options hash - `encryptor(opts)`
Alternatively you can specify the string key and other options as a hash. The following properties are supported:

* `key` - the string key to derive the crypto key from. Specifically the crypto key will be derived as the SHA-256 hash of this key. This must be specified, there is no default.
* `hmac` - whether or not to calculate the HMAC of the encrypted text and add that to the result. Additionally, if enabled this will verify the HMAC prior to decrypting. Adding HMACs will add 64-bytes to the result of each encryption (32-byte HMAC stored as hex). By default this is true.
* `reviver` - you can pass in a custom [reviver](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter) function that will be used during decryption. Useful, for example, when your payload contains a date object and you want it to be recreated during decryption.
* `debug` - whether to log errors decrypting, by default this is false.

Example:

```js
// Don't hard code keys! They should be in environment variables!
var encryptor = require('simple-encryptor')({
  key: 'my secret key',
  hmac: false,
  debug: true
});
```

# Internals
Interally this module uses the node.js crypto package. Specifically it uses the specified string key to derive a key via computing it's SHA-256 hash. Encryption is done via AES-256 with a unique IV (intialization vector) per call that is returned as part of the result.

# Generating a key
If you're on a *nix system then the easiest way to generate a random string for a crypto key is to use /dev/urandom. The following will print out 32 random characters of lower case letters, upper case letters, and numbers:

```sh
$ echo "$(< /dev/urandom tr -dc A-Za-z0-9 | head -c 32)"
```

# Dependencies
[scmp](https://www.npmjs.org/package/scmp) for constant-time string comparison.

# License
This plugin is released under the MIT license. See the file [LICENSE](LICENSE).
