var assert = require('assert');

var testKey = 'real secret keys should be long and random';
var otherKey = 'some key that is different than testKey';

function testEncryptor(encryptor) {
  function testRoundTrip(val) {
    var encrypted = encryptor.encrypt(val);
    var decrypted = encryptor.decrypt(encrypted);
    assert.deepEqual(decrypted, val);
  }

  it('should encrypt and decrypt text', function() {
    testRoundTrip('testing');
  });

  it('should encrypt and decrypt numbers', function() {
    testRoundTrip(12345);
  });

  it('should encrypt and decrypt null', function() {
    testRoundTrip(null);
  });

  it('should encrypt and decrypt nested objects', function() {
    var obj = {
      foo: {
        bar: {
          baz: "some text",
          quz: 12345
        }
      }
    };
    var encrypted = encryptor.encrypt(obj);
    var decrypted = encryptor.decrypt(encrypted);
    assert.equal(JSON.stringify(decrypted), JSON.stringify(obj));
  });

  it('should generate unique output for encrypt', function() {
    var cache = {};
    for(var i=0;i<100;i++) {
      var encrypted = encryptor.encrypt('this is a test');
      assert(!cache[encrypted]);
      cache[encrypted] = true;
    }
  });

  // NOTE: This test will print 'Exception in decrypt...' log lines
  it('should return null when decrypted with the wrong key', function() {
    var otherEncryptor = require('../index')(otherKey);
    var encrypted = otherEncryptor.encrypt('testing');
    var decrypted = encryptor.decrypt(encrypted);
    assert.equal(decrypted, null);
  });
};

describe('An encryptor with a short key', function() {
  it('should not create the encryptor', function() {
    assert.throws(function() {
      var encryptor = require('../index')('short key');
    });
  });
});

describe('An encryptor with the defaults', function() {
  var encryptor = require('../index')(testKey);
  testEncryptor(encryptor);
});

describe('An encryptor with HMACs disabled', function() {
  var opts = {
    key: testKey,
    hmac: false
  }
  var encryptor = require('../index')(opts);
  testEncryptor(encryptor);
});

describe('An encryptor with custom reviver', function() {
  // parses ISO 8601 date strings
  function dateReviver(key, value) {
    var a;
    if (typeof value === 'string') {
      a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/.exec(value);
      if (a) {
        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6], +a[7]));
      }
    }
    return value;
  };

  var opts = {
    key: testKey,
    reviver: dateReviver
  }
  var encryptor = require('../index')(opts);
  it('should encrypt and decrypt dates with a date reviver', function() {
    var obj = {
      foo: new Date()
    };
    var encrypted = encryptor.encrypt(obj);
    var decrypted = encryptor.decrypt(encrypted);
    assert.equal(JSON.stringify(decrypted), JSON.stringify(obj));
  });

  it('should throw an error if the reviver is not a function', function() {
    assert.throws(function() {
      var encryptor = require('../index')({key: testKey, reviver: 'not-a-function'});
    });
  });
});
