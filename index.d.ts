interface SimpleEncryptor {
    /**
     *  Encrypts an arbitrary object using the derived cryptoKey and retursn the result as text.
     *  The object is first serialized to JSON (via JSON.stringify) and the result is encrypted.
     */
    encrypt(obj: any): string

    /**
     *  Decrypts the encrypted cipherText and returns back the original object deserialized from JSON.
     *  If the cipherText cannot be decrypted (bad key, bad text, bad serialization) then it returns null.
     */
    decrypt<T = any>(cipherText: string): T | null;

    /**
     *  Returns the HMAC(text) using the derived cryptoKey
     *  Defaults to returning the result as hex.
     */
    hmac(text: string, encoding?: string): string
}

interface SimpleEncryptorOptions {
    key: string;
    hmac: boolean;
    debug: boolean;
    reviver?(key: any, value: any): any;
}

declare function encryptorCreator(opts: SimpleEncryptorOptions): SimpleEncryptor;
declare function encryptorCreator(key: string): SimpleEncryptor;
export = encryptorCreator;
