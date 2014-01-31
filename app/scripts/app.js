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

// Helper to convert Markdown to HTML
var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});
