var gulp = require('gulp');
var bless = require('gulp-bless');
var mqRemove = require("gulp-mq-remove");
var compass = require('gulp-compass');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var todo = require('gulp-todo');
var fs = require('fs');
var path = require('path');
var template = require('lodash.template');
var through = require('through2');
var directoryMap = require("gulp-directory-map");

gulp.task('cleandist', function() {
    return gulp.src('.dist', {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});
// Concatenate & Minify JS
gulp.task('headerjs', function() {
    return gulp.src(['js/header/vendor/*.js', 'js/header/custom/*.js'])
        .pipe(concat('header.dev.js'))
        .pipe(gulp.dest('js/header'))
});

// Concatenate & Minify JS
gulp.task('footerjs', function() {
    return gulp.src(['js/footer/vendor/*.js', 'js/footer/custom/*.js'])
        .pipe(concat('footer.dev.js'))
        .pipe(gulp.dest('js/footer'))
});
gulp.task('styles', function() {
    gulp.src('scss/*.scss')
        .pipe(sass({
            sass: 'scss',
            fonts: 'fonts',
            debug: true,
            style: 'expanded',
            comments: true,
            sourceComments: true,
            sourcemap: false
        })).on('error', gutil.log)
        //  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('css'))
        //.pipe(gulp.dest('app/assets/temp'))

    .pipe(notify({
        message: 'Styles task complete'
    }));


});


gulp.task('watch', function() {
    gulp.watch('js/header/**/*.js', ['headerjs']);
    gulp.watch('js/footer/**/*.js', ['footerjs']);
    gulp.watch('scss/**/*.scss', ['styles']);
});





gulp.task('default', ['styles', 'headerjs', 'footerjs', 'watch']);
