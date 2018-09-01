const debounceP = require('debounce-promise');
const _ = require('lodash');

const now = Date.now;

let start = now();
let request = 0;
let resultCount = 0;

function sleep(delay) {
  return new Promise( (resolve) => setTimeout(() => resolve(), delay ))
}
async function expensivePromise(...args) {
  resultCount++;
  args.push(resultCount);
  await sleep(options.expensiveDuration);
  return args;
}
const options = {
  debounceDelay: 300,
  expensiveDuration: 200,
  requestInterval: 100,
  batchInterval: 800,
  maxDelay: 150,
};
let config = {
  l: {
    title: "With Lodash",
    debounceFn: _.debounce(expensivePromise, options.debounceDelay)
  },
  leading: {
    title: "With Lodash {leading: true, trailing: false}",
    debounceFn: _.debounce(expensivePromise, options.debounceDelay, {leading: true, trailing: false})
  },
  maxDelay: {
    title: `With Lodash {leading: true, trailing: false, maxDelay: ${options.maxDelay}`,
    debounceFn: _.debounce(expensivePromise, options.debounceDelay, {leading: true, trailing: false, maxDelay: options.maxDelay})
  },

  p: {
    title: "With debounce-promise",
    debounceFn: debounceP(expensivePromise, options.debounceDelay),
  }
};
const choice = config.l;
console.log(options, choice.title);

const debounceLogRequest = async (originalRequest, time) => {
  const res = await choice.debounceFn(originalRequest, time);
  res.push(originalRequest);
  return res;
};
const timestamp = () => (now() - start).toString().padStart(5, '0');

async function main() {
  request++;
  console.log(timestamp(), "REQUEST", request);
  const [returnedRequest, requestedTime, resultCount, originalRequest] = await debounceLogRequest(request, now());;
  const delayed = now() - requestedTime;
  console.log(
    timestamp(),
    '   Result count:', resultCount,
    '   Original request:', originalRequest,
    '   Returned request:', returnedRequest,
    '   Delayed:', delayed
  );
}
const batch = async (n, fn) => {
  let delay;
  for(let i=1; i<20;i++) {
    fn();
    if( i % n === 0 ) {
      delay =  options.batchInterval;
      console.log('----------------------------------');
    } else {
      delay = options.requestInterval;
    }

    await sleep(delay);
  }
};
batch(3, main);

