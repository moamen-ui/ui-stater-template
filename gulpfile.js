const   gulp            = require('gulp'),
        sass            = require('gulp-sass'),
        imagemin        = require('gulp-imagemin'),
        concat          = require('gulp-concat'),
        uglify          = require('gulp-uglify'),
        autoprefixer    = require('gulp-autoprefixer'),
        browserSync     = require('browser-sync').create();

/*

gulp.task => task name
gulp.src => points to files that will use
pipe => what will happend with source files
gulp.dest => ponts to putput folder
gulp.watch => watch files for changes

gulp.task('task-name', function() {
    gulp.src('path/to/source/files')
    .pipe(varName())
    .pipe(gulp.dest('path/to/output/folder'))
});

*/

// gulp sass
gulp.task('sass', function() {
    gulp.src(['src/scss/style.scss', 'node_modules/bootstrap/scss/bootstrap.scss' ])
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream())
});

// gulp js
gulp.task('js', () => {
    gulp.src(['node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'src/js/app.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream())
});

//gulp imagemin
gulp.task('imagemin', () => {
    gulp.src('src/src-img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images'))
});

//gulp serve
gulp.task('serve', () => {
    browserSync.init({
        server: './'
    });
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/app.js', ['js']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// gulp
gulp.task('default', ['sass','js','serve']);