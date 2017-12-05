// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const [jshint, concat, rename, uglify, util, connect] = [require('gulp-jshint'), require('gulp-concat'), require('gulp-rename'), require('gulp-uglify'), require('gulp-util'), require('gulp-connect')];

// Include node plugins
const [del, chalk] = [require('del'), require('chalk')];

const [SRC_PATH, APP_PATH, BUILD_PATH] = ['src', 'app', 'build'];
gulp.task('default', function() {
  util.log(chalk.bgCyan(chalk.black("== Welcome to Silk-Generator ==")))
});

gulp.task('start', ['connect', 'watchSRC', 'watchLIB'])

//start the server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//update html
gulp.task('updateHTML', function() {
    util.log(chalk.bgCyan(chalk.black("== Updating Webpage ==")))
  gulp.src(`${SRC_PATH}/*.html`)
    .pipe(gulp.dest(`${APP_PATH}/`, {
      ext: '.html'
    }));
  gulp.src(`${APP_PATH}/*.html`)
    .pipe(connect.reload());

      util.log(chalk.bgCyan(chalk.black("== Finished Update ==")))
});

//watch for changes
gulp.task('watchSRC', function() {
  gulp.watch([`${SRC_PATH}/*.html`], ['updateHTML'])
});

//updates library files
gulp.task('updateLIB', function() {
  util.log(chalk.bgCyan(chalk.black("== Updating Library ==")))
  gulp.src(`${SRC_PATH}/js/lib/*.js`)
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'));
  gulp.src(`${SRC_PATH}/js/lib/*.js`)
    .pipe(concat('silk-lib.js'))
    .pipe(gulp.dest(`${APP_PATH}/src/js/lib`))
      util.log(chalk.bgCyan(chalk.black("== Finished Update ==")))
});

//watch for changes
gulp.task('watchLIB', function() {
  gulp.watch([`${SRC_PATH}/js/lib/*.js`], ['updateLIB'])
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
});
