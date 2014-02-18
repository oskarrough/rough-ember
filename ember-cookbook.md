# Ember Cookbook

Useful recipies for Ember.js.

## Animated if statement using Ember components

http://www.youtube.com/watch?v=aFZ-b3pEK_Y
http://emberjs.jsbin.com/ucanam/3578/edit

## Changing meta <title>

Here's a very simple method to do it:

App.PostsRoute = Ember.Route.extend({
    afterModel: function() {
        var pageTitle = 'Posts';
        var siteTitle = this.controllerFor('Application').get('siteTitle');
        document.title = pageTitle + ' - ' + siteTitle;
    }
});

As of this writing they are working on the spec. See https://gist.github.com/machty/45fad734d1a86af6feca

## Using Firebase as backend

- https://github.com/rlivsey/fireplace
- https://www.firebase.com/blog/2013-12-16-emberfire-guest-blog.html

## How to animate between routes and states

- https://gist.github.com/denisnazarov/7563981
- http://discuss.emberjs.com/t/asynchronous-actions/3481

## How to query your database

https://gist.github.com/machty/8167051

## Measure how fast your views are

https://github.com/eviltrout/ember-renderspeed
