"use strict";

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @author http://davidwalsh.name/javascript-debounce-function
 */
export default function debounce(func, wait, immediate) {
    var timeout, context, args;

    var later = function () {
        timeout = null;
        if (!immediate) {
            func.apply(context, args);
            context = null;
            args = null;
        }
    };

    var clear = function () {
        timeout = null;
    };

    return function () {
        context = this;
        args = arguments;

        if (immediate === 'before') {
            if (!timeout) {
                func.apply(context, args);
            } else {
                clearTimeout(timeout);
            }
            timeout = setTimeout(clear, wait);
        } else if (immediate === 'leading') {
            if (!timeout) {
                func.apply(context, args);
                timeout = setTimeout(clear, wait);
            }
        } else {
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);

            if (callNow) {
                func.apply(context, args);
                context = null;
                args = null;
            }
        }
    };
}
