const
  gulp =          require('gulp'),
  pug =           require('gulp-pug'),
  sass =          require('gulp-sass'),
  autoprefixer  = require('gulp-autoprefixer'),
  browsersync =   require('browser-sync').create(),
  svgSprites =    require("gulp-svg-sprites"),
  clean =         require('gulp-clean');

// Clean folder
function cleanFolder() {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./site"
    },
    port: 8000,
  });
  done();
}

function reload(done) {
  browsersync.reload();
  done();
}

// Compile pug files into HTML
function compilePug() {
  return gulp.src('sources/pug/pages/!(_)*.pug')
    .pipe(pug({
      pretty: true,
      verbose: true,
      self: true,
      emitty: true
    }))
    .pipe(gulp.dest('site/'))
    .pipe(browsersync.stream());
}

// Compile sass files into CSS
function compileSass() {
  return gulp.src([
    `sources/scss/bootstrap/bootstrap.scss`,
    `sources/scss/custom-styles/style.scss`,
    `sources/scss/fonts/fonts.scss`
  ])
    .pipe(sass({
      outputStyle: 'expanded',
      indentType: 'tab',
      indentWidth: 1,
      linefeed: 'cr',
      onError: browsersync.notify
    }))
    .pipe(gulp.dest('site/css'))
    .pipe(autoprefixer(['Chrome >= 45', 'Firefox ESR', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 9', 'Safari >= 9', 'Android >= 4.4', 'Opera >= 30']))
    .pipe(browsersync.stream());
}

// Serve and watch sass/pug files for changes
function watchFiles(done) {
  gulp.watch('sources/scss/**/*.scss', gulp.series(compileSass));
  gulp.watch('site/css/**/*.css', browsersync.reload);
  gulp.watch('sources/pug/**/*.pug', gulp.series(compilePug));
  gulp.watch('site/*.html', browsersync.reload);
  done();
}

// Create svg sprites
let createSprite = () => {
  return gulp
    .src('sources/sprites/**/*.svg')
    .pipe(svgSprites({
      mode: 'symbols',
      common: 'icon-svg',
      padding: 0,
      baseSize: 10,
      preview: false,
      svg: {
        symbols: 'svg/sprite.svg'
      },
      svgPath: "../images/svg/sprite.svg",
      pngPath: "../images/svg/sprite.svg"
    }))
    .pipe(gulp.dest('site/images/'));
};

// Copy project folder and files to dist folder
let copy = () => {
  return gulp 
    .src([
      'site/**/bat/**/*',
      'site/**/css/**/bootstrap.css',
      'site/**/css/**/style.css',
      'site/**/css/**/fonts.css',
      'site/**/fonts/**/*',
      'site/**/images/**/',
      'site/**/js/**/script.js',
      'site/**/js/**/core.min.js',
      'site/**/**/*.html'
    ])
    .pipe(gulp.dest('dist/'))
};

const build = gulp.series(cleanFolder, copy);
const watch = gulp.series(compilePug, watchFiles, browserSync);
const server = gulp.series(watchFiles, browserSync);

exports.clean = cleanFolder;
exports.copy = copy;
exports.server = server;
exports.sass = compileSass;
exports.pug = compilePug;
exports.sprites = createSprite;
exports.build = build;
exports.default = watch;