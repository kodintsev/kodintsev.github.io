(function (r) {
  "use strict";
  var gulp = r('gulp'),
    compass = r('gulp-compass'),
    autoprefixer = r('gulp-autoprefixer'),
    cssnano = r('gulp-cssnano'),
    rename = r('gulp-rename'),
    concat = r('gulp-concat'),
    uglify = r('gulp-uglify'),
    uncomment = r('gulp-uncomment'),
    size = r('gulp-size'),
    notify = r('gulp-notify'),
    mainBowerFiles = r('main-bower-files');

  //compass
  gulp.task('compass', function() {
    return gulp.src(['./sass/*.scss', './sass/**/*.scss'])
      .pipe(compass({
        config_file: './config.rb',
        css: '../css',
        sass: './sass'
      }))
      .pipe(gulp.dest('../css'));
  });

  //style.min.css
  gulp.task('style', ['compass'], function() {
    return gulp.src(['./js/vendor/normalize.css/normalize.css', '../css/screen.css'])
      .pipe(concat('style.min.css'))
      .pipe(cssnano({reduceIdents: false, autoprefixer: {browsers: ['last 50 versions','> 5%'], add: true}}))
      .pipe(size({title: 'size of style.min.css'}))
      .pipe(gulp.dest('../css'))
      .pipe(notify("style.min.css complete"));
  });

  //main.min.js
  gulp.task('scriptsMain', function() {
    return gulp.src(['./js/main.js'])
      .pipe(uncomment({removeEmptyLines: true}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('../js'))
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(size({title: 'size of main.min.js'}))
      .pipe(gulp.dest('./js'))
      .pipe(notify("main.min.js complete"));
  });
  //all.min.js
  gulp.task('scriptsAllJs', function() {
    return gulp.src(['./js/vendor/jquery/dist/jquery.min.js', './js/vendor/fancybox/dist/jquery.fancybox.min.js', './js/vendor/bxslider-4/dist/jquery.bxslider.min.js', './js/vendor/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js', './js/vendor/jquery-validation/dist/jquery.validate.min.js', './js/main.min.js'])
      .pipe(uncomment({removeEmptyLines: true}))
      .pipe(concat('all.min.js'))
      .pipe(size({title: 'size of all.min.js'}))
      .pipe(gulp.dest('../js'))
      .pipe(notify("all.min.js complete"));
  });

  //bower
  gulp.task('bowerJS', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
      .pipe(gulp.dest('../js/libs'));
  });
  gulp.task('bowerCss', function() {
    return gulp.src(mainBowerFiles(['**/*.css', '**/*.png', '**/*.gif', '**/*.jpg']))
      .pipe(gulp.dest('../js/libs/css'));
  });

  //libs.min.css
  gulp.task('libsCss', ['bowerCss'], function() {
    return gulp.src(['!../js/libs/css/libs.min.css', '../js/libs/css/*.css'])
      .pipe(concat('libs.min.css'))
      .pipe(cssnano({reduceIdents: false, autoprefixer: {browsers: ['last 50 versions','> 5%'], add: true}}))
      .pipe(size({title: 'size of libs.min.css'}))
      .pipe(gulp.dest('../js/libs/css'))
      .pipe(notify("libs.min.css complete"));
  });

  //watch
  gulp.task('watch', function() {
    gulp.watch(['./sass/*.scss', './sass/**/*.scss'], ['compass', 'style']);
    gulp.watch('./js/main.js', ['scriptsMain']);
    gulp.watch('./js/main.min.js', ['scriptsAllJs']);
  });

  //default
  gulp.task('default', ['compass', 'style', 'scriptsMain', 'scriptsAllJs', 'bowerJS',  'bowerCss', 'libsCss', 'watch']);
}(require));