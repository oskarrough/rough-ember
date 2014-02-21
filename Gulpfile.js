// Before using, we have to require gulp itself
var gulp = require('gulp');

// Automatically require all dependencies listed in package.json that start with "gulp-"
// Example: gulp-minify-css turns into plugins.minifyCss()
var plugins = require('gulp-load-plugins')();

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
    	.pipe(plugins.clean());
});

// Lint our scripts with jshint(s)
gulp.task('jshint', function() {
	return gulp.src(['app/scripts/**/*.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

// HTML
gulp.task('html', function() {
	return gulp.src('app/*.html')
		.pipe(plugins.useref()) // useref finds and replaces HTML build blocks
		.pipe(gulp.dest('dist'));
});

// Handlebars templates
gulp.task('templates', function() {
	return gulp.src(['app/templates/**/*.hbs'])
		// .pipe(plugins.handlebars())
		// .pipe(plugins.declare({
		// 	namespace: 'App.TEMPLATES' // convert to a type Ember knows
		// }))
		.pipe(plugins.emberHandlebars({
			outputType: 'browser'
		}))
		.pipe(plugins.concat('templates.js'))// put them all into this one file
		.pipe(gulp.dest('dist/scripts'));
});

// Styles
gulp.task('styles', function() {
	return gulp.src('app/styles/main.scss')
		.pipe(plugins.sass())
		// .pipe(plugins.rubySass({
		// 	style: 'expanded',
		// 	loadPath: ['app/bower_components']
		// }))
		.pipe(plugins.autoprefixer('last 2 versions'))
		.pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('app/scripts/**/*.js')
		//.pipe(plugins.uglify()) // Uglify does minify
		//.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/scripts'));
});

// Copy things not covered by other tasks
gulp.task('copy', function() {
	gulp.src('app/bower_components/**')
		.pipe(gulp.dest('dist/bower_components'));
	gulp.src('app/data/**')
		.pipe(gulp.dest('dist/data'));
});

// Bundle
gulp.task('bundle', ['styles', 'scripts'], plugins.bundle('./app/*.html', {
    appDir: 'app',
    buildDir: 'dist',
    minify: false
}));

// Build
gulp.task('build', ['html', 'templates', 'bundle']);

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('build');
});

// Connect
gulp.task('connect', plugins.connect.server({
    // root: __dirname + '/app',
    root: ['app', 'dist'],
    port: 9000,
    livereload: true
}));

// Watch
gulp.task('watch', ['connect'], function () {

    // Watch for changes in `app` folder and refresh the browser
    gulp.watch([
        'app/*.html',
        'app/templates/**/*.css',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ], plugins.connect.reload);

    // Watch the same files and compile
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/templates/**/*', ['templates']);
    gulp.watch('app/styles/**/*', ['styles']);
    gulp.watch('app/scripts/**/*', ['scripts']);
    gulp.watch('app/data/**/*', ['copy']);
});
