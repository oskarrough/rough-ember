// Make an instance of Ember.Application and assign it to a global variable
App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

// Define the 'Store' which is the ember-data way. The store will be using
// the 'FixtureAdapter' that simulates a real JSON API but works with a local object
App.Store = DS.Store.extend({
	adapter: DS.FixtureAdapter.create({
		latency: 200
	})
});

// Define our routes (the URLs)
App.Router.map(function() {
	this.route('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id'});
	});
});

App.LoadingRoute = Ember.Route.extend({});

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
	}
});

App.AboutRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('page', 2);
	},
	// Use the 'page' template instead of the default 'about'
	renderTemplate: function() {
		this.render('page');
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		// return this.store.find('post', 1); // no network request
		// return App.Post.find();
		return this.store.find('post');
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
	}
});

// We can set global vars using this controller
App.ApplicationController = Ember.Controller.extend({
	siteTitle: "Oskar's project",
	showNavigation: true,
	actions: {
		toggleNavigation: function(){
			console.log('hej');
			this.toggleProperty('showNavigation');
		}
	}
});

App.PostsController = Ember.ArrayController.extend({

	// Default view mode
	viewMode: 'grid',

	// true if we're viewing the grid mode
	viewingGrid: Ember.computed.equal('viewMode', 'grid'),

	// true if we're viewing the list mode
	viewingList: Ember.computed.equal('viewMode', 'list'),

	actions: {

		// Toggle view mode
		viewMode: function() {
			if (this.get('viewingGrid')) {
				this.set('viewMode', 'list');
			} else {
				this.set('viewMode', 'grid');
			}
		}
	}
});

App.PostController = Ember.ObjectController.extend({
	actions: {
		// Capture the close action from the modal
		close: function() {
			// and send it to the ApplicationRoute
			return this.send('closeModal');
		}
	}
});

// Define our 'page' model
App.Page = DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),
});

// Define our 'post' model
App.Post = DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),
	isFeatured: DS.attr('boolean')
});


// Our Modal component
App.ModalDialogComponent = Ember.Component.extend({
	actions: {
		close: function() {
			console.log('ModalDialogComponent.actions.close');
			// pass the action on the controller
			return this.sendAction();
		}
	},
	// Hook for the 'rendered state'
	didInsertElement: function() {
		// Run our function 'next' which we need for our CSS transition to work
		// it needs it's class later
		Ember.run.next(this, this.animateModalOpen);
	},
	// Hook for a 'later rendered state'
	animateModalOpen: function() {
		this.$('.Overlay').addClass('is-active');
	}
});

App.ModalController = Ember.ObjectController.extend({
	actions: {
		// Capture the close action from the modal
		close: function() {
			// and send it to the ApplicationRoute
			return this.send('closeModal');
		}
	}
});

// Helper to convert Markdown to HTML
var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});
