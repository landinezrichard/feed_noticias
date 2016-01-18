/*
* Dependencias
*/
var gulp    = require('gulp'),
  webserver = require('gulp-webserver'),  
  uglify    = require('gulp-uglify'),
  stylus    = require('gulp-stylus'),
  nib       = require('nib'),
  nano      = require('gulp-cssnano'),
  jade      = require('gulp-jade'),
  browserify= require('browserify'),
  jadeify   = require('jadeify'),
  babelify  = require('babelify'),
  buffer    = require('vinyl-buffer'),
  source    = require('vinyl-source-stream'),  
  imageop   = require('gulp-image-optimization'),
  gutil     = require('gulp-util'),
  groupQuerys= require('gulp-group-css-media-queries'),
  smoosher  = require('gulp-smoosher'),
  rename    = require('gulp-rename');

var os = require('os');  

/*
* Rutas de los archivos 
*/ 

var paths = {
  css:{
    main  : 'dev/stylus/estilos.styl',
    watch : 'dev/**/*.styl',
    dest  : 'public/css/'
  },
  html:{
    main  : 'dev/index.jade',
    watch : 'dev/**/*.jade',
    dest  : 'public',
    inline: 'public/index.html'
  },
  js:{
    main  : 'dev/app.js',
    watch : 'dev/**/*.js',
    dest  : 'public/js/'
  },
  images:{
    watch : ['dev/assets/**/*.png','dev/assets/**/*.jpg','dev/assets/**/*.gif','dev/assets/**/*.jpeg'],
    dest  : 'public/' //se guardan en public/img/
  },
  fonts:{
    watch : ['dev/assets/**/*.eot','dev/assets/**/*.svg','dev/assets/**/*.ttf','dev/assets/**/*.woff'],
    dest  : 'public/'//se guardan en public/fonts/
  }
};

/*
* Run server
*/
gulp.task('server', function(){  
  gulp.src('./public')
  .pipe(webserver({
    host:'0.0.0.0',
    port: '8081',
    livereload: true
  }))

  var ip = getIpAddress();
  console.log("Server running on:"+ip);
});

/*
* Tarea build-css
*/

gulp.task('build-css', function(){
	gulp.src(paths.css.main)
  .pipe(stylus({
    use: nib(),
    'include css': true
  }))
  .on('error', gutil.log)
  .pipe(groupQuerys())
  .pipe(nano())
  .on('error', gutil.log)
  .pipe(gulp.dest(paths.css.dest))
});

/*
* Tarea build-html
*/
gulp.task('build-html', function() {
  gulp.src(paths.html.main)
  .pipe(jade({
      pretty: true
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest(paths.html.dest))
});

/*
* Tarea build-js
*/
gulp.task('build-js', function() {
  return browserify({
    entries: paths.js.main, //punto de entrada js
    debug: true, 
    transform:[["babelify",{ "presets": ['es2015'] }], jadeify] //transformaciones
  })
  .bundle()
  .on('error', gutil.log)
  .pipe(source('app.js'))//archivo destino
  .pipe(buffer())
  .pipe(uglify())//minificamos js
  .on('error', gutil.log)
  .pipe(gulp.dest(paths.js.dest))//en donde va a estar el archivo destino
});

/*
* Tarea Minificar y Optimizar imagenes
*/

gulp.task('image-min', function(){
  gulp.src(paths.images.watch)
  .pipe(imageop({
    optimizationLevel: 7,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(paths.images.dest))
});

/*
* Tarea Copiar fuentes
*/

gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts.watch)
    .pipe(gulp.dest(paths.fonts.dest));
});

/*
* Tarea incrustar "embebed" el CSS y JS
*/

gulp.task('inline', function(){
  gulp.src(paths.html.inline)
  .pipe(smoosher())
  .pipe(rename({
    suffix : '-min',
    extname: '.html' 
  }))
  .pipe(gulp.dest(paths.html.dest));
});


/*
* Tarea watch
*/

gulp.task('watch', function(){
  gulp.watch(paths.css.watch, ['build-css']);
  gulp.watch(paths.html.watch, ['build-html']);
  gulp.watch(paths.js.watch, ['build-js']);
  gulp.watch(paths.images.watch, ['image-min']);
});

/*
* build all
*/

gulp.task('build', ['build-css','build-html','build-js']);

/*
* Preparar assets (imagenes, fonts)
*/
gulp.task('assets',['image-min','copy-fonts']);

/*
* Tarea por defecto
*/

gulp.task('default', ['server','watch','build']);


/*
* Para saber la ip
*/

// Local ip address that we're trying to calculate
var address;

// Provides a few basic operating-system related utility functions (built-in)

var ifaces = os.networkInterfaces();

function getIpAddress(){  
  for (var dev in ifaces) {

    var iface = ifaces[dev].filter(function(details) {
      return details.family === 'IPv4' && details.internal === false;
    });

    if(iface.length > 0) address = iface[0].address;
  }  
  return address;
}