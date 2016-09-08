var gulp = require('gulp'),
	gutil = require('gulp-util'),
	compass = require('gulp-compass');

var sassSource = ['components/sass/style.scss'];
var sassFiles = ['components/sass/*.scss'];

gulp.task('compass', function() {
	gulp.src(sassSource)
		.pipe(compass({
			sass: 'components/sass',
			image: 'images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
	gulp.watch(sassFiles, ['compass']);
});

gulp.task('default', ['watch', 'compass']);