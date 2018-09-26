const {transform} = require('./vibl-fp');

const res = transform({'a.b.c': x => x + 1}, {a:{b:{c:7}}});

console.log(res);