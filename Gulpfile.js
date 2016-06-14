var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

//Tarea que genera app.css dentro del dir public
gulp.task('styles', function () {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
})

//Copia el contenido de assets y genera automáticamente el directorio public
gulp.task('assets', function () {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'));
})

//Tarea inicial para procesar bundle de Js luego reemplazada
//gulp.task('scripts', function () {
//  browserify('./src/index.js')
//  .transform(babel) //transforma usando Babel para utilizar features ES2015
//  .bundle() //genera archivo
//  .pipe(source('index.js')) //transforma el bundle a algo que entienda Gulp
//  .pipe(rename('app.js'))
//  .pipe(gulp.dest('public')); //destino del archivo
//})

function compile(watch) {
  var bundle = browserify('./src/index.js', {debug: true});

  if (watch) {
    bundle = watchify(bundle);
    bundle.on('update', function () {
      console.log('--> Bundling...');
      rebundle();
    });
  }

  function rebundle() {
    bundle
      .transform(babel, { presets: [ 'es2015' ], plugins: [ 'syntax-async-functions', 'transform-regenerator' ] })
      .bundle()
      .on('error', function (err) { console.log(err); this.emit('end') })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  rebundle();
}

gulp.task('build', function () {
  return compile();
});

gulp.task('watch', function () { return compile(true); });

//Tarea default de Gulp
gulp.task('default', ['styles', 'assets', 'build']);
