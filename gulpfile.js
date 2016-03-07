'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


/* Build and Minify Styles */

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({browsers: ['last 5 versions']})]))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('minify-css', function () {
    return gulp.src('./css/*.css')
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});


/* Minify JS */

gulp.task('minify-js', function () {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'));
});


/* Copy Files */

gulp.task('fonts', function () {
    return gulp.src('./fonts/*.otf')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('img', function () {
    return gulp.src('./img/*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('layout', function () {
    return gulp.src('skovoroda-bar.html')
        .pipe(rename({basename: 'layout'}))
        .pipe(gulp.dest('./dist/'));
});


/* Distribute Folder */

gulp.task('dist:clear', function () {
    return gulp.src('./dist/*')
        .pipe(clean());
});

gulp.task('dist:publish', function () {
    return runSequence('fonts', 'img', 'layout', 'sass', 'minify-css', 'minify-js');
});

gulp.task('dist', function () {
    return runSequence('dist:clear', 'dist:publish');
});
