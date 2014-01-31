# Rough Ember

This is part of my quest to master front-end frameworks like Ember and Angular. Hopefully it can serve as a boilerplate for future projects with similar structure.

The code in this repository will be littered with an excessive amounts of comments. Beware.

See http://oskarrough.github.io/rough-ember/ for a more or less working example.

## To-do

- Add a way to define meta <title> (See https://gist.github.com/machty/8413411)
- Refactor main.js
- Use ember-app-kit or similar to split the scripts into seperate files
- Find a proper restful server
- Find a way to render for SEO

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

### Script and Ember structure
