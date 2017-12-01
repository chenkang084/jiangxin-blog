const deepEqual = require("deep-equal");

const a = undefined,
  b = undefined;

const flag = deepEqual(a, b, { strict: true });

console.log(flag);
