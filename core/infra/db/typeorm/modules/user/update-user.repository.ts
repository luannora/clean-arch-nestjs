import { IUser } from '@domain/user/entities/user.entity';
import { IUpdateUserRepository } from '@domain/user/repositories/update-user.repository';
import { Repository } from 'typeorm';

export class UpdateUserRepository implements IUpdateUserRepository {
  constructor(private readonly userRepository: Repository<IUser>) {}

  async execute(user: IUser): Promise<IUser | null> {
    if (!user.id) return null;
    const { affected } = await this.userRepository.update(user.id, user);
    if (affected === 0) return null;
    return this.userRepository.findOne({ where: { id: user.id } });
  }
}
