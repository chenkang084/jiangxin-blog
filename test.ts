import * as bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("a", salt);

const p = bcrypt.compareSync("a", hash); // true


console.log(hash);
console.log(p);
console.log(salt);
