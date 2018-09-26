const pMap = require('./p-map');

export const pAll = (iterable, opts) => pMap(iterable, el => el(), opts);