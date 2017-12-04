// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const [jshint, concat, rename, uglify, util] = [require('gulp-jshint'), require('gulp-concat'), require('gulp-rename'), require('gulp-uglify'), require('gulp-util')];

// Include node plugins
const [del,chalk] = [require('del'), require('chalk')];

const [SRC_PATH, APP_PATH, BUILD_PATH] = ['src', 'app', 'build'];
gulp.task('default', function() {
  util.log(chalk.bgCyan(chalk.black("== Welcome to Silk-Generator ==")))
});

gulp.task('start-app', ['default', 'build-library'], function() {
  util.log(chalk.bgCyan(chalk.black("== Starting App ==")))

});

gulp.task('build-library', function() {
util.log(chalk.bgCyan(chalk.black("== Building Library ==")))
  return gulp.src(`${SRC_PATH}/js/lib/*.js`)
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(`${APP_PATH}/src/js/lib/`))
    .on('end', () => {
util.log(chalk.bgCyan(chalk.black("== Finished Build ==")))
    });
});

gulp.task('build-webpage', function() {
  gulp.src(`${SRC_PATH}/index.html`)
    .pipe(gulp.dest(`${APP_PATH}`))
});

gulp.task('export', function() {
util.log(chalk.bgCyan(chalk.black("== Starting Export ==")))
  gulp.src(`${APP_PATH}/src/js/lib/*.js`)
    .pipe(concat('silk-lib.js'))
    .pipe(gulp.dest(`${BUILD_PATH}/src/lib`))
    .on('end', () => {
util.log(chalk.bgCyan(chalk.black("== Finished Export ==")))
    });
});

gulp.task('cleanup', function() {
util.log(chalk.bgCyan(chalk.black("== Cleaning Up ==")))
  //delete app files
  del(APP_PATH, {
    force: true
  });
  //delete build
  del(BUILD_PATH, {
    force: true
  });
});
