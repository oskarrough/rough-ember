App.ApplicationController = Ember.Controller.extend({
	siteTitle: 'Rough Ember',
	showNavigation: true,
	actions: {
		toggleNavigation: function(){
			this.toggleProperty('showNavigation');
		},
		nothing: function(){
			// fake event to avoid bubbling from overlay to modal
		}
	}
});

App.PostsController = Ember.ArrayController.extend({
	// Default view mode
	viewMode: 'list',

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
		// Capture the close action from the controller's template
		close: function() {
			console.log('close?!');
			// and send it to the ApplicationRoute
			return this.send('closeModal');
		}
	}
});
