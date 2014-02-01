// Make an instance of Ember.Application and assign it to a global variable
App = Ember.Application.create({
	// Log route transitions for debugging
	LOG_TRANSITIONS: true
});

// The 'Store' manages the data our app will use. We use ember-data to do this.
// The store uses an 'adapter' to know how to handle different data formats
// In our case we will be using so called fixture data which is really just local json
App.Store = DS.Store.extend({
	adapter: DS.FixtureAdapter.create({
		simulateRemoteResponse: true,
		latency: 200
	})
});
