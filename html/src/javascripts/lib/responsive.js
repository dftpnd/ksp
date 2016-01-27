/*
 * Utility to detect browser size and change based on same queries as
 * in responsive.less
 */

// Responsive breakpoints
var xl_min = 1600;

var lg_min = 980;
var lg_max = 1599;

var md_min = 668;
var md_max = 979;

var sm_min = 480;
var sm_max = 668;

var xs_max = 479;

// Other points
var lgl_min = 1280;
var lgl_max = (lgl_min - 1);


// Media query rules
var rules = {
    'xs':        '(max-width: ' + sm_max + 'px) and (orientation: portrait)',
    'sm':        '(orientation: landscape) and (max-width: ' + md_max + 'px) and (max-height: 415px)',
    'sm-down':   '(orientation: landscape) and (max-width: ' + md_max + 'px) and (max-height: 415px), (max-width: ' + sm_max + 'px)',
    'md-up':     '(min-width: ' + md_min + 'px) and (min-height: 416px)',
    'md-down':   '(max-width: ' + md_max + 'px)',
    'lg-down':   '(max-width: ' + lg_max + 'px)',
    'lgl-down':  '(max-width: ' + lgl_max + 'px)',
    'lgl-up':    '(min-width: ' + lgl_min + 'px)',
    'lg-lgl':    '(min-width: ' + lg_min + 'px) and (max-width: ' + lgl_max + 'px)',
    'lgl-xl':    '(min-width: ' + lg_min + 'px) and (max-width: ' + (xl_min - 1) + 'px)',
    'xl':        '(min-width: ' + xl_min + 'px)',
    'portrait':  '(orientation: portrait)'
};

// Media queries
var queries = {};


/**
 * Returns query from size name
 *
 * @param {string} size Size name
 * @returns {?object} Media query object
 * @protected
 */
function getQuery(size) {
    var query = queries[size];

    if (!query) {
        if (rules[size]) {
            query = queries[size] = matchMedia(rules[size]);
        } else {
            return null;
        }
    }

    return query;
}

/**
 * Add media query change listener
 *
 * @param {string} size Size name
 * @param {function} listener Callback function
 */
function on (size, listener) {
    if (size in rules) {
        var query = getQuery(size);

        // @TODO This won't work for IE9
        query.addListener(listener);
    }
}

/**
 * Add listener for event when media query matches
 *
 * @param {string} size Size name
 * @param {function} listener Callback function
 */
function enter (size, listener) {
    on(size, function (mq) {
        if (mq.matches) {
            listener.call(this, mq);
        }
    });

    var query = getQuery(size);
    if (query && query.matches) {
        listener.call(query, query);
    }
}

/**
 * Add listener for event when media query doesn't match anymore
 *
 * @param {string} size Size name
 * @param {function} listener Callback function
 */
function leave (size, listener) {
    on(size, function (mq) {
        if (!mq.matches) {
            listener.call(this, mq);
        }
    });

    var query = getQuery(size);
    if (query && !query.matches) {
        listener.call(query, query);
    }
}

/**
 * Checks if media query with given name matches
 *
 * @param {string} size Size name
 * @returns {boolean} True if media query matches, otherwise false
 */
function matches (size) {
    return (size in rules ? getQuery(size).matches : matchMedia(size).matches);
}


export default { on, enter, leave, matches };
