// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const [jshint, concat, rename, uglify, util, connect, babel] = [require('gulp-jshint'), require('gulp-concat'), require('gulp-rename'), require('gulp-uglify'), require('gulp-util'), require('gulp-connect'), require('gulp-babel')];

// Include node plugins
const [del, chalk] = [require('del'), require('chalk')];

// Directory Paths
const [SRC_PATH, APP_PATH, BUILD_PATH] = ['src', 'app', 'build'];

gulp.task('default', function() {
  util.log(chalk.bgCyan(chalk.black("== Welcome to Silk-Reactor ==")))
  util.log(chalk.bgCyan(chalk.black("Run npm start or gulp start: to start building")))
  util.log(chalk.bgCyan(chalk.black("Run gulp remove:dist to delete the app directory")))
});

gulp.task('start', ['build:dist', 'connect:server', 'watch:(source:html)', 'watch:library', 'watch:app'])

gulp.task('build:dist', ['update:html', 'build:library', 'build:app'])

//start the server
gulp.task('connect:server', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//watch for changes in index.html
gulp.task('watch:(source:html)', function() {
  gulp.watch([`${SRC_PATH}/*.html`], ['update:html'])
});

//update html
gulp.task('update:html', function() {
  util.log(chalk.bgCyan(chalk.black("== Updating Webpage ==")))
  gulp.src(`${SRC_PATH}/*.html`)
    .pipe(gulp.dest(`${APP_PATH}/`, {
      ext: '.html'
    }));
  gulp.src(`${APP_PATH}/*.html`)
    .pipe(connect.reload());

  util.log(chalk.bgCyan(chalk.black("== Finished Update ==")))
});

//watch changes for js app files
gulp.task('watch:app', function() {
  gulp.watch([`${SRC_PATH}/js/*.js`], ['clean:app', 'build:app'])
});

gulp.task('build:app', function() {
  //Build SRC
  let SRCOrder = require(`./${SRC_PATH}/js/buildOrder.json`)["SRC-Order"];
  for (let i = 0; i < SRCOrder.length; i++) {
    SRCOrder[i] = `${SRC_PATH}/js/${SRCOrder[i]}`;
  }

  console.log(SRCOrder);

  gulp.src(SRCOrder)
    .pipe(concat('app.min.js'))
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel())
    .pipe(gulp.dest(`${APP_PATH}/js`));

  gulp.src(`${APP_PATH}/app.min.js`)
    .pipe(connect.reload());
});

//delete libjs
gulp.task('clean:app', function() {
  del(`${APP_PATH}/js/app.min.js`, {
    force: true
  });
});

//watch for changes
gulp.task('watch:library', function() {
  gulp.watch([`${SRC_PATH}/js/lib/*.js`], ['clean:library', 'build:library'])
});

gulp.task('build:library', ['clean:library'], function() {
  util.log(chalk.bgCyan(chalk.black("== Starting Build ==")))
  let libraryBuildOrder = require(`./${SRC_PATH}/js/buildOrder.json`)["Library-Order"];
  for (let i = 0; i < libraryBuildOrder.length; i++) {
    libraryBuildOrder[i] = `${SRC_PATH}/js/lib/${libraryBuildOrder[i]}`;
  }

  console.log(libraryBuildOrder);

  //Add library
  gulp.src(libraryBuildOrder)
    .pipe(concat('silk.min.js'))
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel())
    .pipe(gulp.dest(`${APP_PATH}/js`));

  gulp.src(`${APP_PATH}/silk.min.js`)
    .pipe(connect.reload());
});

//delete libjs
gulp.task('clean:library', function() {
  del(`${APP_PATH}/js/silk.min.js`, {
    force: true
  });
});

gulp.task('remove:dist', function() {
  util.log(chalk.bgCyan(chalk.black("== Cleaning Up ==")))
  //delete app files
  del(APP_PATH, {
    force: true
  });
});
