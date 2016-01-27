/**
 * Create jQuery plugin from a class (function)
 */
"use strict";

var uid = 1;

/**
 * Create a jquery plugin
 */
function createPlugin (classFn, ns) {
    var namespace = ns || ('plugin' + (uid++));
    return function () {
        // Clone arguments
        var args = [],
            i = 0,
            ii = arguments.length;

        for (; i<ii; i++) {
            args[i] = arguments[i];
        }

        // Call plugin
        return callPlugin(this /* elements */, namespace /* data namespace */, classFn /* class */, args /* arguments */);
    };
};

function callPlugin (elements, namespace, classFn, allArgs) {
    var result = elements;
    var fn = null;
    var args = [];
    var i, ii;
    var opts = allArgs[0];
    var options = {};

    if (typeof opts === 'object') {
        options = opts;
    } else if (typeof opts === 'string' && typeof classFn.prototype[opts] === 'function' && opts[0] != '_') {
        fn = classFn.prototype[opts];
        args = allArgs.slice(1);
    }

    elements.each(function () {
        var element = $(this);
        var instance = element.data(namespace);
        var value;
        var instanceOptions;

        if (!instance) {
            // Pass all data attribute values as options too
            instanceOptions = $.extend({}, element.data(), options);

            instance = new classFn(element, instanceOptions);
            element.data(namespace, instance);
        }

        if (fn) {
            value = fn.apply(instance, args);

            if (value !== undefined) {
                result = value;
            }
        }
    });

    return result;
}


module.exports = createPlugin;
