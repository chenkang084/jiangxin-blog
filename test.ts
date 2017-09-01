import * as bcrypt from "bcryptjs";

// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("a", salt);

const p = bcrypt.compareSync("a", "$2a$10$kObKQG.2AV/6eW4FfOq04uZqQWjLRgPY9Z8NlPnwpD6LnQLgjX436"); // true


// console.log(hash);
console.log(p);
// console.log(salt);
