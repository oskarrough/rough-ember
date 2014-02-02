# Rough Ember

This is part of my quest to master front-end frameworks like Ember and Angular. Hopefully it can serve as a boilerplate for future projects with similar structure.

The code in this repository will be littered with an excessive amounts of comments. Beware.

See http://oskarrough.github.io/rough-ember/ for a more or less working example.

## To-do

- Add a way to define meta <title> (See https://gist.github.com/machty/8413411)
- Find a proper restful server
- Find a way to render for SEO

## Livereload

Remember to active the Livereload browser plugin.

## Structure

### Root level

- `/app` (our application)
- `/dist` (where our build system generates the working application from /app)
- `bower.json` (packages needed by our application)
- `.Gulpfile.js` (our build system)
- `package.json` (packages needed by our build system)
- `README.md` (this file)

### App level

- `bower_components` (components are installed here because our /.bowerrc says so)
- `images`
- `scripts`
- `styles`
- `templates`
- `index.html`

## Getting started

The app will run if you run it directly from /app/index.html - but it wont compile your templates nor compile your Sass etc. This is where a build system comes into play. Two popular systems are grunt and gulp. Here I went with gulp.

You need to install the gulp cli globally first:

`$ npm install -g gulp`

Then you need to install the dependencies this 'rough ember' has:

`$ npm install && bower install`

Now you can use the build system. Read through Gulpfile.js to see what's possible. If you write `$ gulp` it will start a server while watching and compiling your files as necessary.

If things don't look right, try `$ gulp compile` and refresh.
