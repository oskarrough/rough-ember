// Define our routes (the URLs)
App.Router.map(function() {
	this.route('about');
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
		openModal: function(templateName, modelName) {
			console.log('ApplicationRoute openModal');
			var self = this;
			this.controllerFor(templateName).set('model', modelName);

			// Close on 'esc'
			$(document).on('keyup', function(event) {
				if (event.which === 27) {
					return self.closeModal();
				}
			});

			// Render into the right outlet
			return this.render(templateName, {
				into: 'application',
				outlet: 'modal'
			});

		},
		closeModal: function() {
			console.log('ApplicationRoute closeModal');
			var self = this;

			// Stop listening to 'esc' because we just closed the modal
			$(document).off('keyup');

			// use one of: transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd
			// events so the handler is only fired once in your browser
			$('.Overlay').removeClass('is-active');
			$('.Modal').one("transitionend", function(event) {

				// Redirect back to /posts before…
				self.transitionTo('posts');

				// …we remove the model from the DOM
				return self.disconnectOutlet({
					outlet: 'modal',
					parentView: 'application'
				});
			});
		}
	}
});

App.IndexRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('page', 1);
	},
	afterModel: function(model) {
		var pageTitle = model.get('title');
		var siteTitle = this.controllerFor('Application').get('siteTitle');
		document.title = pageTitle + ' - ' + siteTitle;
	}
});

App.AboutRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('page', 2);
	},
	// Use the 'page' template instead of the default 'about'
	renderTemplate: function() {
		this.render('page');
	},
	afterModel: function(model) {
		var pageTitle = model.get('title');
		var siteTitle = this.controllerFor('Application').get('siteTitle');
		document.title = pageTitle + ' - ' + siteTitle;
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		// return this.store.find('post', 1); // no network request
		// return App.Post.find();
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

	// (part duplicate of the openModel() in ApplicationRoute)
	renderTemplate: function() {
		var self = this;

		// Close on 'esc' (also duplicate code)
		$(document).on('keyup', function(event) {
			if (event.which === 27) {
				return self.send('closeModal');
			}
		});

		// Render using the modal outlet of the application tpl
		this.render('post', {
			into: 'application',
			outlet: 'modal'
		});
	},
	afterModel: function(model) {
		var pageTitle = model.get('title');
		var siteTitle = this.controllerFor('Application').get('siteTitle');
		document.title = pageTitle + ' - ' + siteTitle;
	}
});
