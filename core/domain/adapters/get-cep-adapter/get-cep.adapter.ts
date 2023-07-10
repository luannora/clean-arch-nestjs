export interface IGetCepAdapter {
  getCep(zipCode: string): Promise<any>;
}
