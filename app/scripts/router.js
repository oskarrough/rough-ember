// Define our routes (the URLs)
App.Router.map(function() {
	this.resource('home');
	this.resource('work');
	// this.resource('about');
	this.resource('pages', function() {
		this.resource('page', { path: ':page_slug'});
	});
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id'});
	});
});

App.ApplicationRoute = Ember.Route.extend({
	actions: {
		// loading: function(transition, originRoute) {
		// 	console.log('loading');
		// 	// displayLoadingSpinner();
		// 	// Return true to bubble this event to `FooRoute`
		// 	// or `ApplicationRoute`.
		// 	return true;
		// },
		openModal: function() {
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
	beforeModel: function(params) {
		this.transitionTo('home');
	}
});

App.HomeRoute = Ember.Route.extend({
	model: function() {
		return Ember.RSVP.hash({
			home: this.store.find('page', 1),
			work: this.store.find('page', 2),
			about: this.store.find('page', 3)
		});
	}
});

App.WorkRoute = Ember.Route.extend({
	beforeModel: function(params) {
		this.transitionTo('home');
		// scroll to work
	}
});

App.AboutRoute = Ember.Route.extend({
	beforeModel: function(params) {
		this.transitionTo('home');
		// scroll to about
	}
});

App.ContactRoute = Ember.Route.extend({
	beforeModel: function(params) {
		this.transitionTo('home');
		// scroll to contact
	}
});

App.PagesRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('page'); // find all pages
	}
});

App.PageRoute = Ember.Route.extend({
	model: function(params) {
		return this.modelFor('pages').findBy('slug', params.page_slug); // find by a property
	},
	// allows us to use slug as the url
	serialize: function(model, params) {
		return { page_slug: model.get('slug')};
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('post'); // find all posts
	}
});

App.PostRoute = Ember.Route.extend({
	// ember creates this code for us
	// model: function(params) {
	// 	return this.store.find('post', params.post_id);
	// },

	// Don't use the default outlet
	renderTemplate: function() {
		// Render using
		this.render('post', { // model tpl
			into: 'application', // tpl
			outlet: 'modal' // outlet name
		});

		// Fire this event from app route
		return this.send('openModal');
	}
});
