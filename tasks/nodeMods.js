const gulp = require('gulp-help')(require('gulp'));
const paths = require('./paths');
const gulpInstall = require('gulp-install');

gulp.task('node-mods', false, () => {
    return gulp.src('package.json')
        .pipe(gulp.dest(paths.build.src))
        .pipe(gulpInstall({production: true}))
})
