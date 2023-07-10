export interface IActiveTagUseCase {
  execute(tagId: string, vehicleId: string): Promise<boolean>;
}
