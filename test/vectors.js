var assert = require('assert');
var createEncryptor = require('../index');

describe('An encrypter with a key of abcd1234abcd1234', () => {
    const key = 'abcd1234abcd1234';
    const encrypter = createEncryptor(key);

    it('should decrypt the previously encrypted string', () => {
        const cipherText = '6e558a97efc5da4203bdbbc33ff038158296dce37eb7de77914799b5e30190db03515c846e4a33f85282130aa7f52ea0n+6fPdrB34sxg322vg9ERA==';
        const expectedPlainText = 'test';
        const plainText = encrypter.decrypt(cipherText);
        assert.equal(plainText, expectedPlainText);
    });

    it('should decrypt the previously encrypted object', () => {
        const cipherText = 'e62134f0d701b616342d2a0f96fd79b3eb0f33302db49661ed143d7b3a9c0474d28a0bd97b745d20876ff3944ac3adf2Yn1up3jR3MBUeH1NHsj5ow==';
        const expectedPlainText = {
            foo: 123,
        };
        const plainText = encrypter.decrypt(cipherText);
        assert.deepEqual(plainText, expectedPlainText);
    });

    it('should decrypt the previously encrypted nested object', () => {
        const cipherText = '4f9d01cc50216fcfeba82ae1894f70b5ff19d2ea2bb16b6d9f717aca56944ecd7efbf82ed0fcc210158a91830289f0bcmRuJHzJOUxgiFc9PT8orrycagEKpf/uS86rKYLheRBo=';
        const expectedPlainText = {
            foo: [
                {
                    bar: 123,
                },
            ],
        };
        const plainText = encrypter.decrypt(cipherText);
        assert.deepEqual(plainText, expectedPlainText);
    });
});
