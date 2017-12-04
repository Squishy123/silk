// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const [jshint, concat, rename, uglify, util] = [require('gulp-jshint'), require('gulp-concat'), require('gulp-rename'), require('gulp-uglify'), require('gulp-util')];

// Include node plugins
const [del,colors] = [require('del'), require('colors')];

const [SRC_PATH, APP_PATH, BUILD_PATH] = ['src', 'app', 'build'];
gulp.task('default', function() {
  util.log("== Welcome to Silk-Generator ==".green)
});

gulp.task('start-app', ['default', 'build-library'], function() {
  util.log("== Starting App ==".green)

});

gulp.task('build-library', function() {
  util.log("== Building Library ==".green)
  return gulp.src(`${SRC_PATH}/js/lib/*.js`)
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(`${APP_PATH}/src/js/lib/`))
    .on('end', () => {
      util.log("== Finished Building Library ==".green)
    });
});

gulp.task('build-webpage', function() {
  gulp.src(`${SRC_PATH}/index.html`)
    .pipe(gulp.dest(`${APP_PATH}`))
});

gulp.task('export', function() {
  util.log("== Starting Export ==".green)
  gulp.src(`${APP_PATH}/src/js/lib/*.js`)
    .pipe(concat('silk-lib.js'))
    .pipe(gulp.dest(`${BUILD_PATH}/src/lib`))
    .on('end', () => {
      util.log("== Finished Export ==".green)
    });
});

gulp.task('cleanup', function() {
  util.log("== Cleaning up files ==".green)
  //delete app files
  del(APP_PATH, {
    force: true
  });
  //delete build
  del(BUILD_PATH, {
    force: true
  });
});
