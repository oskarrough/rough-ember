// Define our routes (the URLs)
App.Router.map(function() {
	this.resource('pages', function() {
		this.resource('page', { path: ':page_slug'});
	});
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id'});
	});
});

App.ApplicationRoute = Ember.Route.extend({
	actions: {
		loading: function(transition, originRoute) {
			console.log('loading');
			// displayLoadingSpinner();

			// Return true to bubble this event to `FooRoute`
			// or `ApplicationRoute`.
			return true;
		},

		openModal: function() {
			console.log('openModal');

			// Start animation in
			$('.Overlay').addClass('is-active');

			// // Close on 'esc'
			// $(document).on('keyup', function(event) {
			// if (event.which === 27) {
			//	return self.closeModal();
			// }
			// });
		},

		closeModal: function() {
			var self = this;
			console.log('closeModal');

			// Start animating out
			$('.Overlay').removeClass('is-active');

			// use one of: transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd
			// events so the handler is only fired once in your browser
			// $('.Modal').one('transitionend', function(event) {
				// Redirect back to /posts before…
				this.transitionTo('posts');
			// });
		}
	}
});

App.IndexRoute = Ember.Route.extend({
	// Render using the first page
	model: function(params) {
		return this.store.find('page', 1);
	},
	afterModel: function(model) {
		// Change the meta title
		var pageTitle = model.get('title');
		var siteTitle = this.controllerFor('Application').get('siteTitle');
		document.title = pageTitle + ' - ' + siteTitle;
	}
});

App.PagesRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('page');
	}
});
App.PageRoute = Ember.Route.extend({
	model: function(params) {
		// return this.store.findQuery({ slug: params.page_slug });
		return App.Page.find({ slug: params.page_slug })
	},
	setupController: function(controller, model) {
		// If the model comes from a link-to helper it will be an object,
		// if it comes from the route it will be an array of one element
		if (Ember.isArray(model)){
			controller.set('model', model.get('firstObject'));
		} else{
			controller.set('model', model);
		}
	},
	// allows us to use slug as the url
	serialize: function(model, params) {
		return { page_slug: model.get('slug')};
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('post');
	},
	afterModel: function() {
		var pageTitle = 'Posts';
		var siteTitle = this.controllerFor('Application').get('siteTitle');
		document.title = pageTitle + ' - ' + siteTitle;
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('post', params.post_id);
	},
	renderTemplate: function() {

		// Don't use the default outlet.
		// Render using the same 'post' template but into the outlet called 'modal' of the application route
		this.render('post', {
			into: 'application',
			outlet: 'modal'
		});

		// Fire this event from app route
		return this.send('openModal');

	},
	afterModel: function(model) {
		var pageTitle = model.get('title');
		var siteTitle = this.controllerFor('Application').get('siteTitle');
		document.title = pageTitle + ' - ' + siteTitle;
	}
});

// App.AboutRoute = Ember.Route.extend({
// 	model: function(params) {
// 		return this.store.find('page', 2);
// 	},
// 	// Use the 'page' template instead of the default 'about'
// 	renderTemplate: function() {
// 		this.render('page');
// 	},
// 	afterModel: function(model) {
// 		var pageTitle = model.get('title');
// 		var siteTitle = this.controllerFor('Application').get('siteTitle');
// 		document.title = pageTitle + ' - ' + siteTitle;
// 	}
// });
