import React from 'react';

const sleep = (ms) => new Promise(
  (resolve, reject) => setTimeout(resolve, ms)
);

module.exports = {
  sleep,
};