export interface IDeleteVehicleRepository {
  execute(id: string): Promise<boolean>;
}
