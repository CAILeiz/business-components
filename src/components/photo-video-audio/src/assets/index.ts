declare const require: {
  context: (
    path: string,
    deep?: boolean,
    filter?: RegExp
  ) => {
    keys: () => string[];
    (id: string): any;
  };
};

const req = require.context("./", true, /\.(svg|png)$/);

const reg = new RegExp(/.+\/(.+)\.(svg|png)$/);
const config = req.keys().reduce((obj, path) => {
  if (path) {
    const pathName = path.match(reg)[1];
    const dft = req(path);
    obj[pathName] = dft;
  }
  return obj;
}, {});

console.log("config", config);
export default config;
