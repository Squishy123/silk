// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const [jshint, concat, rename, uglify, util] = [require('gulp-jshint'), require('gulp-concat'), require('gulp-rename'), require('gulp-uglify'), require('gulp-util')];

// Include node plugins
const [del] = [require('del')];

const [SRC_PATH, APP_PATH, BUILD_PATH] = ['src', 'app', 'build'];
gulp.task('default', function() {
  util.log("== Welcome to Silk-Generator ==")
});

gulp.task('start-app', ['default', 'build-library'], function() {
  util.log("== Starting App ==")

});

gulp.task('build-library', function() {
  util.log("== Building Library ==")
  return gulp.src(`${SRC_PATH}/js/lib/*.js`)
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(`${APP_PATH}/src/js/lib/`))
    .on('end', () => {
      util.log("== Finished Building Library ==")
    });
});

gulp.task('build-webpage', function() {
  gulp.src(`${SRC_PATH}/index.html`)
    .pipe(gulp.dest(`${APP_PATH}`))
});

gulp.task('export', function() {
  util.log("== Starting Export ==")
  gulp.src(`${APP_PATH}/src/js/lib/*.js`)
    .pipe(concat('silk-lib.js'))
    .pipe(gulp.dest(`${BUILD_PATH}/src/lib`))
    .on('end', () => {
      util.log("== Finished Export ==")
    });
});

gulp.task('cleanup', function() {
  util.log("== Cleaning up files ==")
  //delete app files
  del(APP_PATH, {
    force: true
  });
  //delete build
  del(BUILD_PATH, {
    force: true
  });
});
