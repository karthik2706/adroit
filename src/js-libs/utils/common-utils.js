'use strict';

const sendAjaxRequest = require('utils/send-ajax-request');
const forEach = require('lodash.foreach');
const handlebars = require('handlebars');

/**
 * variable to hold all the requested templates
 */
const ajaxTemplatesObj = window.templatesObj || {};

/**
 * Finds the classname of the current element that starts with the query-string.
 *
 */
export function getClassNameStartsWith(ele, string) {
    const classNameArr = ele.className.split(' ').filter(function(str) {
        return str.indexOf(string) === 0;
    });

    return classNameArr[0] || '';
}

/**
 * Create json objects on the basis of formfields name:value pair
 *
 * @param [formEl] form element's DOM object
 * @return {reqObj object}
 */
export function createRequestObj(formEl) {
    const inputElements = formEl.elements || jQuery(formEl).find(':input');
    const reqObj = {};

    forEach(inputElements, (ele) => {
        if (ele.name !== '') {
            if (ele.type === 'checkbox') {
                reqObj[ele.name] = ele.checked;
            } else if (ele.type === 'radio') {
                if (ele.checked) {
                    reqObj[ele.name] = ele.value;
                }
            } else {
                reqObj[ele.name] = ele.value;
            }
        }
    });
    return reqObj;
}

/**
 * Create String of JSON objects on the basis of formfields name:value pair
 *
 * @param [formEl] form element's DOM object
 * @return {reqObj object}
 */
export function stringifyRequestObj(formEl) {
    const reqObj = createRequestObj(formEl);
    const stringifyObj = JSON.stringify(reqObj);

    return stringifyObj;
}

/**
 * update the query params of any given url
 * @param  {string} uri
 * @param  {string} key
 * @param  {string} value
 * @param {string} separator - for scene7 urls, ? is not allowed. So sending default separator
 * @return {string} udpatedURL
 */
export function updateQueryStringParameter(uri, key, value, separator) {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');

    separator = separator || uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
        return uri + separator + key + '=' + value;
    }
}

/**
 * gets any dynamic HBS templates and registers them as handlebar partials
 * @param {object} options
 *  options = {
 *      templateName, // no need to give .hbs extension
 *      isPartial, // optional - notifies that whether to add it as handlbars partial or not
 *      successCB // optional - used to execute any callback after successfully downloaded the template
 *  }
 */
export function getDynamicTemplate(options) {
    // if the file is already requested, then its response is stored and is sent back to the success-callback
    if (ajaxTemplatesObj.hasOwnProperty(options.templateName)) {
        if (options.isPartial) {
            handlebars.registerPartial(options.templateName, handlebars.compile(ajaxTemplatesObj[options.templateName]));
        }
        if (options.successCB) {
            options.successCB(ajaxTemplatesObj[options.templateName]);
        }
    } else {
        const ajaxObj = {
            url: window.templatePath + options.templateName + '.hbs',
            dataType: 'html',
            error() {
                console.log('Error in loading: ' + window.templatePath + options.templateName);
            }
        };

        ajaxObj.showLoadingIcon = (options.showLoadingIcon === undefined) ? true : options.showLoadingIcon;

        if (options.isPartial) {
            ajaxObj.success = function(resp) {
                handlebars.registerPartial(options.templateName, handlebars.compile(resp));
                // store the response
                ajaxTemplatesObj[options.templateName] = resp;
                if (options.successCB) {
                    options.successCB(resp);
                }
            };
        } else if (options.successCB) {
            ajaxObj.success = function(resp) {
                // store the response
                ajaxTemplatesObj[options.templateName] = resp;
                options.successCB(resp);
            };
        }

        sendAjaxRequest(ajaxObj);
    }
}

/**
 * cookieUtility - Usage:
//    cookieUtility('name', 'value', 5*60*1000) -- write data to cookie named name that lasts for five minutes
//    cookieUtility('name')                     -- read the cookie that was just set, function result will be 'value'
//    cookieUtility('name', '', -1)             -- delete the cookie
 *
 * @param  {string} name  cookie keyName
 * @param  {string} value cookie value
 * @param  {int} ms       timeout
 * @return {string}       cookie value
 */
export function cookieUtility(name, value, ms) {
    if (arguments.length < 2) {
        // read cookie
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const c = cookies[i].replace(/^\s+/, '');
            const nameString = `${name}=`;

            if (c.indexOf(nameString) === 0) {
                return decodeURIComponent(c.substring(name.length + 1).split('+').join(' '));
            }
        }
        return null;
    }

    // write cookie
    const date = new Date();

    date.setTime(date.getTime() + ms);
    const expires = (ms) ? ';expires=' + date.toGMTString() : '';
    const formattedVal = encodeURIComponent(value);

    document.cookie = `${name}=${formattedVal} ${expires};path=/`;
}

/**
 * function to get the query param from url based on the name
 * @param {String} name
 * @param {String} url (optional - default is window url)
 * @return {Boolean}
 */
export function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) {
        return false;
    }
    if (!results[2]) {
        return false;
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
