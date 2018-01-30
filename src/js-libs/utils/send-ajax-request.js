'use strict';

// dependencies
const xss = require('xss');
const forEach = require('lodash.foreach');

/**
 * success handler for the ajax request
 * @param  {object} response
 * @param  {function} callBack
 */
function successCallback(response, options) {
    const callBack = options.success || '';

    // do generic success handling

    // call the callback
    if (typeof callBack === 'function') {
        callBack(response);
    }
}

/**
 * error handler for the ajax request
 * @param  {object} errorObj
 * @param  {function} callBack
 */
function errorCallback(errorObj, callBack) {
    // do generic error handling

    // call the callback
    if (typeof callBack === 'function') {
        callBack(errorObj);
    }
}

/**
 * Generic method to send ajax requests
 * @param  {object} options
 */
function sendAjaxRequest(options) {
    if (!options.hasOwnProperty('url')) {
        return;
    }

    // default values
    const ajaxObj = {
        method: options.method || 'GET',
        url: options.url,
        contentType: (options.method === 'POST' && options.contentType === undefined) ? 'application/json; charset=utf-8' : (options.contentType || 'application/json; charset=utf-8'),
        dataType: options.dataType || 'json',
        beforeSend: options.beforeSend || function() {
            // do something
        },
        success(response) {
            if(!options.isHBS) {
                response = filterDataXss(response);
            }
            successCallback(response, options);
        },
        error(errorObj) {
            errorCallback(errorObj, options.error || '');
        }
    };

    if (options.hasOwnProperty('data')) {
        ajaxObj.data = filterDataXss(options.data);
    }
    if (options.hasOwnProperty('noContentType')) {
        delete ajaxObj.contentType;
    }
    if (options.hasOwnProperty('noDataType')) {
        delete ajaxObj.dataType;
    }

    // send ajax request
    const xhr = jQuery.ajax(ajaxObj);

    return xhr;
}

/**
 * [filterDataXss description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function filterDataXss(data) {
    forEach(data, function(value){
        value = xss(value);
    });
    return data;
}

module.exports = sendAjaxRequest;
