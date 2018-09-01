const _ = require('lodash');

const delay = 100;

let executionCount = 0;

function expensiveFn() {
  executionCount++;
  return executionCount;
}
const debounceFn = _.debounce(expensiveFn, delay, {leading: false, trailing: true});

function main() {
  const res = debounceFn();
  console.log(res);
}
const repeat = (n, fn) => () => {
  for(let i=0; i<n;i++) {
    fn();
  }
};
setInterval(repeat(3, main), 200);
