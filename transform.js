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
    try {
        source = coffeeTransform(fileInfo.source);
    } catch (e) {
        throw new Error('CJSX to Coffee Transform error: ', e.message);
    }
    // convert from coffee to js
    try {
        source = decaf(source).code;
    } catch (e) {
        throw new Error('Decaffeinate error: ', e.message);
    }
    // use class properties
    try {
        let nSource = classes({ ...fileInfo, source }, api, options);
        source = nSource || source;
    } catch (e) {
        throw new Error('React classes error: ', e.message);
    }
    // add jsx tags
    try {
        source = toJSX({ ...fileInfo, source }, api, options);
    } catch (e) {
        throw new Error('Convert to JSX error: ', e.message);
    }
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
