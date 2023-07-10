export interface IBlockTagUseCase {
  execute(tagId: string): Promise<boolean>;
}
