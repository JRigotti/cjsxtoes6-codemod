const path = require('path');
const fs = require('fs');

module.exports = (fileInfo, api, options) => {
    const newFilePath = path.format({
        ext: '.jsx',
        dir: path.dirname(fileInfo.path),
        name: path.basename(fileInfo.path, path.extname(fileInfo.path))
    });

    const res = fs.writeFile(newFilePath, 'opa', 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    });
};
