const sassTask = require('./sass-task');
const jsTask = require('./js-task');
const assembleTask = require('./assemble-task');
const copyImgTask = require('./copy-image-task');
const copyFontTask = require('./copy-fonts-task');
const copyApiTask = require('./copy-api-task');
const copyTemplatesTask = require('./copy-templates-task');

module.exports = {
    sassTask,
    jsTask,
    assembleTask,
    copyImgTask,
    copyFontTask,
    copyApiTask,
    copyTemplatesTask
};