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
	//adapter: DS.FixtureAdapter
	adapter: DS.FixtureAdapter.extend({
		queryFixtures: function(fixtures, query, type) {
			return fixtures;
		}
	})
});

// DS.FixtureAdapter.reopen({
// 	queryFixtures: function(records, query, type) {
// 		return records.filter(function(record) {
// 			for(var key in query) {
// 				if (!query.hasOwnProperty(key)) { continue; }
// 				var value = query[key];
// 				if (record[key] !== value) { return false; }
// 			}
// 			return true;
// 		});
// 	}
// });
