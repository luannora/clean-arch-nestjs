import { IPlan } from '../entities/plan.entity';

export interface IUpdatePlanRepository {
  execute(updateDTO: IPlan): Promise<IPlan>;
}
