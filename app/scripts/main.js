// Make an instance of Ember.Application and assign it to a global variable
App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

// Define the 'Store' which is the ember-data way. The store will be using
// the 'FixtureAdapter' that simulates a real JSON API but works with a local object
App.Store = DS.Store.extend({
	adapter: DS.FixtureAdapter.create({
		simulateRemoteResponse: true,
		latency: 200
	})
});

App.ModalDialogComponentView = Ember.View.extend({
	templateName: 'components/modal-dialog',
});
	// Our Modal component
App.ModalDialogComponent = Ember.Component.extend({
	// templateName: 'components/modal-dialog',
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

// Helper to convert Markdown to HTML
var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});
