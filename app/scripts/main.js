// Make an instance of Ember.Application and assign it to a global variable.
App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

// Use sample data. THE DS.FixtureAdapater simulates a real json api.
//App.ApplicationAdapter = DS.FixtureAdapter;

// Define our routes (the URLs)
App.Router.map(function() {
	this.route('about');

	this.resource('posts', function() {
		this.resource('post', { path: ':post_id'});
	});
});

// Use HTML5 history for urls (e.g. no # in the URL)
// App.Router.reopen({
// 	location: 'history'
// });

// We can set global vars using this controller
App.ApplicationController = Ember.Controller.extend({
	siteTitle: "Oskar's project"
});

App.ApplicationRoute = Ember.Route.extend({
	actions: {
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

				// Before you remove the model,
				// also redirect back to /posts
				self.transitionTo('posts');

				return self.disconnectOutlet({
					outlet: 'modal',
					parentView: 'application'
				});
			});
		}
	}

	// scroll to top on route change
	// , currentPathChanged: function() {
	// 	window.scrollTo(0, 0);
	// }.observes('currentPath')
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		//return this.store.find('post', params.id);
		return App.posts.findBy('id', params.post_id)
	},

	// Render using the modal outlet of application
	// (part duplicate of the openModel() in ApplicationRoute)
	renderTemplate: function() {
		var self = this;

		// Close on 'esc' (also duplicate code)
		$(document).on('keyup', function(event) {
			if (event.which === 27) {
				return self.send('closeModal');
			}
		});

		this.render('post', {
			into: 'application',
			outlet: 'modal'
		});
	}
});


App.PostController = Ember.ObjectController.extend({
	actions: {
		// Capture the close action from the modal
		// and send up to the ApplicationRoute to handle
		close: function() {
			console.log('PostController.actions.close');

			// pass the action on to ApplicationRoute
			return this.send('closeModal');
		}
	}
});


App.ModalController = Ember.ObjectController.extend({
	actions: {
		// Capture the close action from the modal
		// and send up to the ApplicationRoute to handle
		close: function() {
			console.log('ModalController.actions.close');

			// pass the action on to ApplicationRoute
			return this.send('closeModal');
		}
	}
});


App.ModalDialogComponent = Ember.Component.extend({
	actions: {
		close: function() {
			console.log('ModalDialogComponent.actions.close');
			// pass the action on the controller
			return this.sendAction();
		}
	},
	didInsertElement: function() {
		// console.log('didInsertElement')
		// here your view is in rendered state
		// so we schedule a function to run one step later, which we need for CSS transitions
		Ember.run.next(this, this.animateModalOpen);
	},
	animateModalOpen: function() {
		// here your child views is in the rendered state
		// console.log('animateModalOpen')
		this.$('.Overlay').addClass('is-active');
	}
});


// We can customize what happens on different routes like this
App.IndexRoute = Ember.Route.extend({
	setupController: function(controller) {
		// Set the IndexController's `title`
		// it will be available as {{title}} in the template
		controller.set('title', "My index page");
	}

	// Redirect to another route on load
	// ,redirect: function() {
	//   this.transitionTo('photos');
	// }
});

// Customize a route like this
App.AboutRoute = Ember.Route.extend({

	// Use the 'page' template instead of the default 'about'
	renderTemplate: function() {
		this.render('page');
	},

	// Define the model for the template
	model: function() {
		return App.pages
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		//return this.store.find('posts');
		return App.posts;
	},
});

// Markdown helper
var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});
