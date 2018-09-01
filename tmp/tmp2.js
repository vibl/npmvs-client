const debounceP = require('debounce-promise');
const _ = require('lodash');

function expensiveOperation(value) {
  return new Promise( (resolve) =>
    setTimeout(() => resolve(value), 100 )
  )
}

const saveCycles = debounceP(expensiveOperation, 100);

[1, 2, 3, 4].forEach(num => {
  return saveCycles('debounceP #' + num).then(value => {
    console.log(value);
  })
})

