"use strict";

const gulp = require('gulp'),
    babel = require('gulp-babel'),
    nodemon = require('gulp-nodemon'),
    sequence = require('run-sequence');

gulp.task('compile', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['compile']);
});

gulp.task('start', () => {
    nodemon({
        watch: 'dist',
        script: 'dist/index.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('default', (callback) => {
    sequence(['compile', 'watch'], 'start', callback);
});