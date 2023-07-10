import { hash, compare } from 'bcrypt';

import { IEncrypter } from '@domain/adapters/encrypter/encrypter.adapter';

export class BcryptAdapter implements IEncrypter {
  async encrypt(value: string): Promise<string> {
    const encrypted = await hash(value, 10);
    return encrypted;
  }

  async decrypt(value: string): Promise<string> {
    return '';
  }

  async verify(value: string, hash: string): Promise<boolean> {
    const isValid = await compare(value, hash);
    return isValid;
  }
}
