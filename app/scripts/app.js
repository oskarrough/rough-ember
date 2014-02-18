Ember.FEATURES["query-params"] = true;

// Bootstrap and start an Ember application with the namespace "App"
App = Ember.Application.create({
	// For debugging let's log our route transitions to the console
	LOG_TRANSITIONS: true,
	LOG_INTERNAL_TRANSITIONS: true
});

// In order to use local data without a real backend, we are using this adapter
App.ApplicationAdapter = DS.FixtureAdapter;
