import { IUser } from '../entities/user.entity';

export interface IFindByEmailOrDocumentUserRepository {
  execute(emailOrDocument: string): Promise<IUser>;
}
