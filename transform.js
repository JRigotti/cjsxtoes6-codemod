const path = require('path');
const fs = require('fs');

const coffeeTransform = require('coffee-react-transform');
const { convert: decaf } = require('decaffeinate');
const classes = require('./node_modules/react-codemod/transforms/class.js');

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

    const res = fs.writeFile(newFilePath, source, 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    });
};
