const fs = require('fs');
const readline = require('readline');
const stringifyObjectLiteral = require('./stringify-object-literal');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

module.exports = (file, transform) => {
  const oldObj = require(file);
  const newObj = transform(oldObj);
  const newObjLiteral = stringifyObjectLiteral(newObj);
  const fileStr = fs.readFileSync(file, {encoding: 'utf8'});
  const newFileStr = fileStr.replace(/module\.exports = \{[\s\S]+};/m, `module.exports = ${newObjLiteral};`);
  console.log(newFileStr);
  rl.question('Write to file? (y/N)', (answer) => {
    switch (answer) {
      case 'y':
        console.log(`Writing to file: ${file}`);
        fs.writeFileSync(file, newFileStr);
        break;
      default:
        console.log(`Ok. NOT writing to file. Bye.`);
    }
    rl.close();
  });
  return newFileStr;
};