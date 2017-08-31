import * as bcrypt from "bcryptjs";

export const salt = bcrypt.genSaltSync(10);

export const compareHash = (plainText: string) => {
  return bcrypt.compareSync(plainText, salt);
};

export const genHash = (plainText: string): string => {
  return bcrypt.hashSync(plainText, salt);
};
