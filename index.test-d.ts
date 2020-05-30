import { createEncryptor, SimpleEncryptor } from './index';
import { expectAssignable } from 'tsd';

const key = 'abcd1234abcd1234abcd1234abcd1234';

expectAssignable<SimpleEncryptor>(createEncryptor(key));
expectAssignable<SimpleEncryptor>(createEncryptor({
    key,
    hmac: true,
    debug: false,
}));
