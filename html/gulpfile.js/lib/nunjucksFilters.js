module.exports = [];

module.exports.push(['leadingZero', function (num, len) {
    len = len || 2;
    return ('0' + num).slice(-len);
}]);
