const gulp = require('gulp-help')(require('gulp'));
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

runSequence.use(gulp);
requireDir('./tasks', { recursive: true });
