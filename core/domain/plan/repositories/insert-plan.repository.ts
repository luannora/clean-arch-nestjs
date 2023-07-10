import { IPlan } from '../entities/plan.entity';

export interface IInsertPlanRepository {
  execute(insertDTO: IPlan): Promise<IPlan>;
}
