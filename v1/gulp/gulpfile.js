const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss')
const del = require('delete')

function scripts(cb) {
    gulp.src('../src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../../docs/js'))
    cb();
}

function html(cb) {
    gulp.src('../src/*.html')
        .pipe(gulp.dest('../../docs'))
    cb();
}

function css(cb) {
    gulp.src('../src/css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('../../docs/css'))
    cb();
}

function assets(cb) {
    gulp.src(['../src/assets/*[1-9].svg', '../src/assets/favicon.svg', '../src/assets/icon.png'])
        .pipe(gulp.dest('../../docs/assets'))
    cb();
}

function clean(cb) {
    del(['../../docs'], {force: true}, cb);
}

exports.default = gulp.series(clean, scripts, html, css, assets)
