interface SimpleEncryptor {
    encrypt(obj: any): string
    decrypt(cipherText: string): string | null
    hmac(text: string): string
}
interface SimpleEncryptorOptions {
    key: string
    hmac: boolean
    debug: boolean
}

declare function encryptorCreator(optsOrKey: SimpleEncryptorOptions | string): SimpleEncryptor

export default encryptorCreator
