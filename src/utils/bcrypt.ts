import * as bcrypt from "bcryptjs";

export const compareHash = (plainText: string, salt: string) => {
  return bcrypt.compareSync(plainText, salt);
};

export const genHash = (plainText: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainText, salt);
};
