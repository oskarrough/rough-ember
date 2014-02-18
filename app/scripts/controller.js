App.ApplicationController = Ember.Controller.extend({
	title: 'Rough Ember', // this is available in application.hbs
	showNavigation: true, // Whether to show the navigation or not
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
			// and send it to the ApplicationRoute
			return this.send('closeModal');
		}
	}
});

App.IndexController = Ember.ObjectController.extend({
	showAnchor: (function() {
		var $elem, $scrollTo;
		console.log($elem);
		// $elem = $(this.anchorLocation);
		// return $scrollTo = $('body').scrollTop($elem.offset().top);
	}).observes('anchorLocation')
});
