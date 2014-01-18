// Make an instance of Ember.Application and assign it to a global variable.
App = Ember.Application.create({});

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
		openModal: function(modalName, model) {
			// console.log('ApplicationRoute.actions.openModal');
			this.controllerFor(modalName).set('model', model);
			return this.render(modalName, {
				into: 'application',
				outlet: 'modal'
			});
		},
		closeModal: function() {
			// console.log('ApplicationRoute.actions.closeModal');

			return this.disconnectOutlet({
				outlet: 'modal',
				parentView: 'application'
			});
		}
	}
});

App.ModalController = Ember.ObjectController.extend({
	actions: {
		// Capture the close action from the modal
		// and send up to the ApplicationRoute to handle
		close: function() {
			// console.log('ModalController.actions.close');
			var self = this;

			// use one of: transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd
			// events so the handler is only fired once in your browser
			$('.Overlay').removeClass('is-active');
			$('.Modal').one("transitionend", function(event) {
				// console.log('transition end');

				// pass the action on to the route
				return self.send('closeModal');
			});
		}
	}
});

App.ModalDialogComponent = Ember.Component.extend({
	actions: {
		close: function() {
			// console.log('ModalDialogComponent.actions.close');

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
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		//return this.store.find('post', params.id);
		return App.posts.findBy('id', params.post_id)
	}
});

// Markdown helper
var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});
