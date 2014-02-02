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

// I want to open the server in my browser automatically
plugins.util.env.open = true;

// Clean (delete) our /dist folder
gulp.task('clean', function() {
	return gulp.src([config.dist], {
		read: false // Speed it op by not reading file contents
	}).pipe(plugins.clean());
});

// Lint our scripts with jshint(s)
gulp.task('jshint', function() {
	return gulp.src([config.app + '/scripts/**/*.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

// Mo
gulp.task('html', function() {
	return gulp.src(config.app + '/*.html')
		// .pipe(plugins.watch())
		.pipe(gulp.dest(config.dist))
		.pipe(plugins.livereload(lr));
});

gulp.task('templates', function() {
	return gulp.src([config.app + '/templates/**/*.hbs'])
		// .pipe(plugins.watch())
		// convert handlebars to html in a type Ember knows
		.pipe(plugins.emberHandlebars({ outputType: 'browser' }))
		// put them all into this one file
		.pipe(plugins.concat('templates.js'))
		.pipe(gulp.dest(config.dist + '/scripts/'))
		.pipe(plugins.livereload(lr));
});

// Minify our scripts
gulp.task('scripts', function() {
	return gulp.src(config.app + '/scripts/**/*.js')
		// .pipe(plugins.watch())
		//.pipe(plugins.concat('all.js'))
		//.pipe(plugins.uglify()) // Uglify does minify
		//.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest(config.dist + '/scripts/'))
		.pipe(plugins.livereload(lr));
});

// Minify and copy styles
gulp.task('styles', function() {
	// Process sass files
	return gulp.src(config.app + '/styles/main.scss')
		// .pipe(plugins.watch())
		.pipe(plugins.sass())
		.pipe(plugins.autoprefixer('last 2 versions', '> 5%', 'ios 6'))
		//.pipe(plugins.minifyCss())
		.pipe(gulp.dest(config.dist + '/styles'))
		.pipe(plugins.livereload(lr));
});

// Copy things not covered by other tasks
gulp.task('copy', function() {
	gulp.src(config.app + '/bower_components/**')
		.pipe(gulp.dest(config.dist + '/bower_components'))
		.pipe(plugins.livereload(lr));
	gulp.src(config.app + '/data/**')
		.pipe(gulp.dest(config.dist + '/data'))
		.pipe(plugins.livereload(lr));
});

// First clean, then build
gulp.task('build', ['clean'], function() {
	gulp.start('html', 'templates', 'scripts', 'styles', 'copy');
});

// @todo what is this exactly?
gulp.task('listen', function(next) {
	lr.listen(35729, function(err) {
		if (err) return console.error(err);
		next();
	});
});

//Use gulp's watch method to monitor file changes and then run tasks
gulp.task('watch', function() {
	gulp.watch(config.app + '/*.html', ['html']);
	gulp.watch(config.app + '/templates/**/*', ['templates']);
	gulp.watch(config.app + '/scripts/**/*', ['scripts']);
	gulp.watch(config.app + '/styles/**/*', ['styles']);
	gulp.watch(config.app + '/data/**/*', ['copy']);
});


// This default task will build our app and start a server for developing
gulp.task('default', ['build'], function() {
	gulp.start('server');
});

gulp.task('server', ['listen', 'watch'], function(callback) {
	var devApp, devServer, devAddress, devHost, url, log=plugins.util.log, colors=plugins.util.colors;

	devApp = connect()
		.use(connect.logger('dev'))
		.use(connect.static('dist'));

	// change port and hostname to something static if you prefer
	devServer = http.createServer(devApp).listen(9000 /*, hostname*/);

	devServer.on('error', function(error) {
		log(colors.underline(colors.red('ERROR'))+' Unable to start server!');
		callback(error); // we couldn't start the server, so report it and quit gulp
	});

	devServer.on('listening', function() {
		devAddress = devServer.address();
		devHost = devAddress.address === '0.0.0.0' ? 'localhost' : devAddress.address;
		url = 'http://' + devHost + ':' + devAddress.port + '/index.html';

		log('');
		log('Started dev server at '+colors.magenta(url));
		if (plugins.util.env.open) {
			log('Opening dev server URL in browser');
			open(url);
		} else {
			log(colors.gray('(Run with --open to automatically open URL on startup)'));
		}
		log('');
		callback(); // we're done with this task for now
	});
});


