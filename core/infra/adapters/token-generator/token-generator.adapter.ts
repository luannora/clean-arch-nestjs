import { v4 as uuidv4 } from 'uuid';

import { ITokenGeneratorAdapter } from '@domain/adapters/token-generator/token-generator.adapter';

export class TokenGeneratorAdapter implements ITokenGeneratorAdapter {
  public generate(): string {
    return uuidv4();
  }
}
