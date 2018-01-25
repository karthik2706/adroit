'use strict';

const handlebars = require('handlebars');
const helper = require('handlebars-helper-repeat');

handlebars.registerHelper('repeat', helper);

/**
 * Block helper that renders the block if **both** of the given values
 * are truthy. If an inverse block is specified it will be rendered
 * when falsy.
 *
 * @param {any} `a`
 * @param {any} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String}
 * @block
 * @api public
 */

handlebars.registerHelper('and', function (a, b, options) {
    if (a && b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Render a block when a comparison of the first and third
 * arguments returns true. The second argument is
 * the [arithemetic operator][operators] to use. You may also
 * optionally specify an inverse block to render when falsy.
 *
 * @param `a`
 * @param `operator` The operator to use. Operators must be enclosed in quotes: `">"`, `"="`, `"<="`, and so on.
 * @param `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or if specified the inverse block is rendered if falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('compare', function (a, operator, b, options) {
    /*eslint eqeqeq: 0*/

    if (arguments.length < 4) {
        throw new Error('handlebars Helper {{compare}} expects 4 arguments');
    }

    var result;
    switch (operator) {
    case '==':
        result = a == b;
        break;
    case '===':
        result = a === b;
        break;
    case '!=':
        result = a != b;
        break;
    case '!==':
        result = a !== b;
        break;
    case '<':
        result = a < b;
        break;
    case '>':
        result = a > b;
        break;
    case '<=':
        result = a <= b;
        break;
    case '>=':
        result = a >= b;
        break;
    case 'typeof':
        result = typeof a === b;
        break;
    default:
        {
            throw new Error('helper {{compare}}: invalid operator: `' + operator + '`');
        }
    }

    if (result === false) {
        return options.inverse(this);
    }
    return options.fn(this);
});

/**
 * Block helper that renders a block if `a` is **greater than** `b`.
 *
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the `compare=""` hash argument for the
 * second value.
 *
 * @name .gt
 * @param {String} `a`
 * @param {String} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('gt', function (a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
    }
    if (a > b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if `a` is **greater than or
 * equal to** `b`.
 *
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the `compare=""` hash argument for the
 * second value.
 *
 * @name .gte
 * @param {String} `a`
 * @param {String} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('gte', function (a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
    }
    if (a >= b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if `a` is **equal to** `b`.
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the `compare=""` hash argument for the
 * second value.
 *
 * @name .eq
 * @param {String} `a`
 * @param {String} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('eq', function (a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
    }
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if `a` is **equal to** `b`.
 * If an inverse block is specified it will be rendered when falsy.
 *
 * @name .is
 * @param {any} `a`
 * @param {any} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String}
 * @block
 * @api public
 */

handlebars.registerHelper('is', function (a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
    }
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if `a` is **not equal to** `b`.
 * If an inverse block is specified it will be rendered when falsy.
 *
 * @name .isnt
 * @param {String} `a`
 * @param {String} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String}
 * @block
 * @api public
 */

handlebars.registerHelper('isnt', function (a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
    }
    if (a !== b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if `a` is **less than** `b`.
 *
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the `compare=""` hash argument for the
 * second value.
 *
 * @name .lt
 * @param {Object} `context`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('lt', function (a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
    }
    if (a < b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if `a` is **less than or
 * equal to** `b`.
 *
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the `compare=""` hash argument for the
 * second value.
 *
 * @name .lte
 * @param {Sring} `a`
 * @param {Sring} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('lte', function (a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
    }
    if (a <= b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if **neither of** the given values
 * are truthy. If an inverse block is specified it will be rendered
 * when falsy.
 *
 * @name .neither
 * @param {any} `a`
 * @param {any} `b`
 * @param `options` Handlebars options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('neither', function (a, b, options) {
    if (!a && !b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

/**
 * Block helper that renders a block if **any of** the given values
 * is truthy. If an inverse block is specified it will be rendered
 * when falsy.
 *
 * ```handlebars
 * {{#or a b c}}
 *   If any value is true this will be rendered.
 * {{/or}}
 * ```
 *
 * @name .or
 * @param {...any} `arguments` Variable number of arguments
 * @param {Object} `options` Handlebars options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('or', function ( /* any, any, ..., options */ ) {
    var len = arguments.length - 1;
    var options = arguments[len];

    for (var i = 0; i < len; i++) {
        if (arguments[i]) {
            return options.fn(this);
        }
    }

    return options.inverse(this);
});

/**
 * Block helper that always renders the inverse block **unless `a` is
 * is equal to `b`**.
 *
 * @name .unlessEq
 * @param {String} `a`
 * @param {String} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Inverse block by default, or block if falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('unlessEq', function (context, options) {
    if (context === options.hash.compare) {
        return options.inverse(this);
    }
    return options.fn(this);
});

/**
 * Block helper that always renders the inverse block **unless `a` is
 * is greater than `b`**.
 *
 * @name .unlessGt
 * @param {Object} `context`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Inverse block by default, or block if falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('unlessGt', function (context, options) {
    if (context > options.hash.compare) {
        return options.inverse(this);
    }
    return options.fn(this);
});

/**
 * Block helper that always renders the inverse block **unless `a` is
 * is less than `b`**.
 *
 * @name .unlessLt
 * @param {Object} `context`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('unlessLt', function (context, options) {
    if (context < options.hash.compare) {
        return options.inverse(this);
    }
    return options.fn(this);
});

/**
 * Block helper that always renders the inverse block **unless `a` is
 * is greater than or equal to `b`**.
 *
 * @name .unlessGteq
 * @param {Object} `context`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('unlessGteq', function (context, options) {
    if (context >= options.hash.compare) {
        return options.inverse(this);
    }
    return options.fn(this);
});

/**
 * Block helper that always renders the inverse block **unless `a` is
 * is less than or equal to `b`**.
 *
 * @name .unlessLteq
 * @param {Object} `context`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

handlebars.registerHelper('unlessLteq', function (context, options) {
    if (context <= options.hash.compare) {
        return options.inverse(this);
    }
    return options.fn(this);
});


/**
 * Return true if `@index` is an even number.
 *
 * ```handlebars
 * {{ifEven @index}}
 * ```
 *
 * Contributed by Michael Sheedy <http://github.com/sheedy>
 * @source: Stack Overflow Answer <http://bit.ly/1tAgtpO>
 * @param  {Object} `context`
 * @param  {Object} `options`
 * @return {Boolean}
 */
handlebars.ifEven = function(conditional, options) {
    if ((conditional % 2) == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};