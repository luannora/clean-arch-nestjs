import { ICpfValidator } from '@domain/adapters/cpf-validator/cpf-validator.adapter';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

export class CpfValidator implements ICpfValidator {
  isValid(document: string, type: string): boolean {
    switch (type) {
      case 'PF':
        return cpfValidator.isValid(document);

      default:
        return cnpjValidator.isValid(document);
    }
  }
}
