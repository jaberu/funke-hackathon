const gulp = require('gulp-help')(require('gulp'));
const paths = require('./paths');
const del = require('del');

gulp.task('clean', false, (cb) => {
    const files = [].concat(paths.build.basePath, './dist')
    return del(files, cb)
})
