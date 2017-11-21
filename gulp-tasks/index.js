const sassTask = require('./sass-task');
const builsJSTask = require('./build-js');
const jsTask = require('./js-task');
const minifyTask = require('./minify');
const assembleTask = require('./assemble-task');
const copyImgTask = require('./copy-image-task');
const copyFontTask = require('./copy-fonts-task');
const copyApiTask = require('./copy-api-task');
const copyTemplatesTask = require('./copy-templates-task');
const readTemplatesTask = require('./read-templates-task');

module.exports = {
    sassTask,
    builsJSTask,
    jsTask,
    minifyTask,
    assembleTask,
    copyImgTask,
    copyFontTask,
    copyApiTask,
    copyTemplatesTask,
    readTemplatesTask
};
