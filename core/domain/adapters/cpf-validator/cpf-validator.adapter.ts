export interface ICpfValidator {
  isValid(document: string, type: string): boolean;
}
