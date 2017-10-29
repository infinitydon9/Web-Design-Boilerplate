var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var minify = require('gulp-minify');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './scss/*.scss', './vendor/bootstrap-extend.scss'])
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("./js"))
        .pipe(browserSync.stream());
});

// Compress the js file and convert them in minified ones
gulp.task('compress', function() {
    gulp.src('./amd/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
    .pipe(gulp.dest('./js'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './scss/*.scss'], ['sass']);
    gulp.watch(['./amd/*.js'], ['compress']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);