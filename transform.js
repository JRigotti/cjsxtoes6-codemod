const path = require('path');
const fs = require('fs');

const coffeeTransform = require('coffee-react-transform');

module.exports = (fileInfo, api, options) => {
    const newFilePath = path.format({
        ext: '.jsx',
        dir: path.dirname(fileInfo.path),
        name: path.basename(fileInfo.path, path.extname(fileInfo.path))
    });

    let source = coffeeTransform(fileInfo.source);

    const res = fs.writeFile(newFilePath, source, 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    });
};
