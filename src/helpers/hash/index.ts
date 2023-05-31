import * as bcrypt from 'bcrypt';

export default class Hash {
  private static readonly saltRounds: number = Number(process.env.SALT_ROUNDS);

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  static async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
