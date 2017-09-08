const gulp = require('gulp-help')(require('gulp'));
const runSequence = require('run-sequence');

gulp.task('build', false, (cb) => {
    return runSequence(
        ['clean'],
        ['compileScripts'],
        ['compileContent'],
        ['node-mods'],
        ['zip'],
        cb
    )
})
