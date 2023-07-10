export class GenerateRandomAdapter {
  generateRandom(size: number): string {
    let randomPassword = '';
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i++) {
      randomPassword += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
    }
    return randomPassword;
  }
}
