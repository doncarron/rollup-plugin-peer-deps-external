const { resolve } = require('path');

export default function getDeps(path = resolve(process.cwd(), 'package.json')) {
  try {
    const pkg = require(path);
    return Object.keys(pkg.dependencies);
  } catch (err) {
    return [];
  }
}
