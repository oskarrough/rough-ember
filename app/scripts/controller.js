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
		viewAsGrid: function() {
			this.set('viewMode', 'grid');
		},
		viewAsList: function() {
			this.set('viewMode', 'list');
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

App.ModalController = Ember.ObjectController.extend({
	actions: {
		// Capture the close action from the modal
		close: function() {
			// and send it to the ApplicationRoute
			return this.send('closeModal');
		}
	}
});
