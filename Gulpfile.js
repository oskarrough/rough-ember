// Before using, we have to require gulp itself
var gulp = require('gulp'),

	// Automatically require all dependencies listed in package.json that start with "gulp-"
	// Example: gulp-minify-css turns into plugins.minifyCss()
	plugins = require('gulp-load-plugins')({ camelize: true }),

	// Require extra (non-gulp) plugins needed for livereload
	connect = require('connect'),
	http = require('http'),
	open = require('open'),
	tinylr = require('tiny-lr'),
	lr = tinylr(),

	config = {
		app: 'app',
		dist: 'dist'
	};

// Lint our scripts with jshint(s)
gulp.task('jshint', function() {
	return gulp.src(config.app + '/scripts/**/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('templates', function(){
	gulp.src(config.app + '/*.html')
		.pipe(gulp.dest(config.dist))
		.pipe(plugins.livereload(lr));

	return gulp.src([config.app + '/templates/**/*.hbs'])
		// convert handlebars to html in a type Ember knows
		.pipe(plugins.emberHandlebars({
			outputType: 'browser'
		}))
		// put them all into this one file
		.pipe(plugins.concat('templates.js'))
		// move it to app/scripts, where the task 'scripts' will watch, move it to dist and do livereload
		.pipe(gulp.dest(config.app + '/scripts/'));
});

// Minify our scripts
gulp.task('scripts', ['templates'], function() {
	return gulp.src(config.app + '/scripts/**/*.js')
		//.pipe(plugins.concat('all.js'))
		//.pipe(plugins.uglify()) // Uglify does minify
		//.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest(config.dist + '/scripts/'))
		.pipe(plugins.livereload(lr));
});

// Copy things not covered by other tasks
gulp.task('copy', function(){
	gulp.src(config.app + '/bower_components/**')
		.pipe(gulp.dest(config.dist + '/bower_components'))
		.pipe(plugins.livereload(lr));
	gulp.src(config.app + '/data/**')
		.pipe(gulp.dest(config.dist + '/data'))
		.pipe(plugins.livereload(lr));
});

// Minify and copy styles
gulp.task('styles', function(){
	// Process sass files
	gulp.src(config.app + '/styles/main.scss')
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer('last 2 versions', '> 5%', 'ios 6'))
		//.pipe(plugins.minifyCss())
		.pipe(gulp.dest(config.dist + '/styles'))
		.pipe(plugins.livereload(lr));
});

// Use gulp's watch method to monitor file changes and then run tasks
gulp.task('watch', function(){
	gulp.watch(config.app + '/*.html', function(){
		gulp.start('templates');
	});
	gulp.watch(config.app + '/templates/**/*', function(){
		gulp.start('ember');
	});
	gulp.watch(config.app + '/scripts/**/*', function(){
		gulp.start('scripts');
	});
	gulp.watch(config.app + '/styles/**/*', function(){
		gulp.start('styles');
	});
	gulp.watch(config.app + '/data/**/*', function(){
		gulp.start('copy');
	});
});

// Clean (delete) our /dist folder
gulp.task('clean', function() {
	return gulp.src([config.dist], {
		read: false // Speed it op by not reading file contents
	}).pipe(plugins.clean());
});

// Compile everything, start a local server and watch for changes to compile
gulp.task('default', ['clean'], function(){
	gulp.start('scripts', 'styles', 'copy', 'watch', 'livereload');
});

gulp.task('livereload', function(){
	// Create a 'tiny livereload' server on a specific port
	lr.listen(35729, function(err){
		if (err) return console.log(err);
	});
	// Communicate with the livereload browser plugin
	var middleware = [
		require('connect-livereload')({ port: 9000 }),
		// Your server's root path.
		connect.static(config.dist),
		// Don't know what this is
		connect.directory(config.app, './')
	];

	var app = connect.apply(null, middleware);
	var server = http.createServer(app);

	server.listen(9000).on('listening', function() {
		console.log('Started a web server on http://localhost:9000');
		open('http://localhost:' + 9000);
	});
});
