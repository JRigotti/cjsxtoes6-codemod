const path = require('path');
const fs = require('fs');

const coffeeTransform = require('coffee-react-transform');
const { convert: decaf } = require('decaffeinate');
const classes = require('./node_modules/react-codemod/transforms/class.js');
const toJSX = require('./node_modules/react-codemod/transforms/create-element-to-jsx.js');
const exports = require('./node_modules/5to6-codemod/transforms/exports.js');
const cjs = require('./node_modules/5to6-codemod/transforms/cjs.js');

module.exports = (fileInfo, api, options) => {
    const newFilePath = path.format({
        ext: '.jsx',
        dir: path.dirname(fileInfo.path),
        name: path.basename(fileInfo.path, path.extname(fileInfo.path))
    });

    let source = fileInfo.source;

    // convert from cjsx to coffee
    source = coffeeTransform(fileInfo.source);
    // convert from coffee to js
    source = decaf(source).code;
    // use class properties
    source = classes({ ...fileInfo, source }, api, options);
    // add jsx tags
    source = toJSX({ ...fileInfo, source }, api, options);
    // exports to import style
    source = exports({ ...fileInfo, source }, api, options);
    // use import instead of require
    source = cjs({ ...fileInfo, source }, api, options);

    const res = fs.writeFile(newFilePath, source, 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    });
};
