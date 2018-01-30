import * as bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
export const compareHash = (plainText: string, salt: string) => {
  return bcrypt.compareSync(plainText, salt);
};

export const genHash = (plainText: string): string => {
  return bcrypt.hashSync(plainText, salt);
};
