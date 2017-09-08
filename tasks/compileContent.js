const gulp = require('gulp-help')(require('gulp'));
const paths = require('./paths');
const gulpBabel = require('gulp-babel');
const gulpBatchReplace = require('gulp-batch-replace');
const replacements = require(paths.app.strings).replacements;

gulp.task('compileContent', false, () => {
    return gulp.src(paths.app.content)
        .pipe(gulpBatchReplace(replacements))
        .pipe(gulp.dest(paths.build.src))
})
