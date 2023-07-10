import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';
import * as crypto from 'crypto';

export class ShaCryptAdapter implements IEncrypter {
  async encrypt(data: string): Promise<string> {
    const password = process.env.APP_HASH_CRYPT;
    const iv =
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0);
    const crypted = crypto.createHash('sha256').update(password);
    const hexa = crypted.digest();
    let cipher = crypto.createCipheriv('aes-256-cbc', hexa, iv);
    const encrypted = cipher.update(data);
    return Buffer.concat([encrypted, cipher.final()]).toString('base64');
  }

  async decrypt(data: string): Promise<string> {
    const password = process.env.APP_HASH_CRYPT;
    const iv =
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0) +
      String.fromCharCode(0x0);
    const crypted = crypto.createHash('sha256').update(password);
    const hexa = crypted.digest();
    const decipher = crypto.createDecipheriv('aes-256-cbc', hexa, iv);
    let decrypted = decipher.update(data, 'base64', 'utf-8');
    return decrypted + decipher.final();
  }

  async verify(value: string, hash: string): Promise<boolean> {
    return false;
  }
}
