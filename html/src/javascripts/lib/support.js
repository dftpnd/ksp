/**
 * Check for touch support
 *
 * @returns {boolean} True if touch is supported, otherwise false
 */
function getTouchSupport () {
    return ("undefined" != typeof document.documentElement.ontouchstart);
}

export default {
    getTouchSupport: getTouchSupport
};
