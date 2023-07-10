export interface IEncrypter {
  encrypt(value: string): Promise<string>;
  decrypt(value: string): Promise<string>;
  verify(value: string, hash: string): Promise<boolean>;
}
