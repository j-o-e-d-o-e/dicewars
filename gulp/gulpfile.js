const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss')

function scripts(cb) {
    gulp.src('../v1/src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../docs/js'))
    cb();
}

function html(cb) {
    gulp.src('../v1/src/*.html')
        .pipe(gulp.dest('../docs'))
    cb();
}

function css(cb) {
    gulp.src('../v1/src/css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('../docs/css'))
    cb();
}
function assets(cb) {
    gulp.src(['../v1/src/assets/*[1-9].svg', '../v1/src/assets/favicon.svg', '../v1/src/assets/icon.png'])
        .pipe(gulp.dest('../docs/assets'))
    cb();
}

exports.default = gulp.series(scripts, html, css, assets)
