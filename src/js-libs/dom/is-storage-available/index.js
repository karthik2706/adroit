/**
 * Checks whether storage type is available or not.
 *
 * @module dom.is-storage-available
 * @version 1.0.0
 * @since Sat June 7 2017
 */
'use strict';

/**
* @function storageAvailable
* @param  {String} type {type of storage}
* @return {boolean} {whether storage type is available or not}
*/
function isStorageAvailable(type) {
    try {
        const storage = window[type];
        const x = '__storage_test__';

        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = isStorageAvailable;
