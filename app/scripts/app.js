// Bootstrap and start an Ember application with the namespace "App"
App = Ember.Application.create({

	// For debugging let's log our route transitions to the console
	LOG_TRANSITIONS: true
});

// The 'Store' manages the data our app will use. We use ember-data to do this.
// The store uses an 'adapter' to know how to handle different data formats
// In our case we will be using so called fixture data which is really just local json
App.Store = DS.Store.extend({
	revision: 13,
	adapter: DS.FixtureAdapter
});
