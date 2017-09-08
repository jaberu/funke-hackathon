const gulp = require('gulp-help')(require('gulp'));
const paths = require('./paths');
const gulpBabel = require('gulp-babel');

gulp.task('compileScripts', false, () => {
    return gulp.src(paths.app.scripts)
        .pipe(gulpBabel())
        .pipe(gulp.dest(paths.build.src))
})
