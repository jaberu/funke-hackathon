const gulp = require('gulp-help')(require('gulp'));
const paths = require('./paths');
const gulpZip = require('gulp-zip');

gulp.task('zip', false, () => {
    return gulp.src(paths.build.zip)
        .pipe(gulpZip('build.zip'))
        .pipe(gulp.dest(paths.build.basePath))
})
