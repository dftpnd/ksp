var sass = require('gulp-sass').compiler;

exports['sin($deg)'] = function (deg) {
    return new sass.types.Number(
        Math.sin(deg.getValue() * (Math.PI / 180))
    );
}

exports['cos($deg)'] = function (deg) {
    return new sass.types.Number(
        Math.cos(deg.getValue() * (Math.PI / 180))
    );
}
