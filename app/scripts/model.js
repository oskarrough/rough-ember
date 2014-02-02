// Define our 'page' model
App.Page = DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),
	slug: DS.attr('string')
});

// Define our 'post' model
App.Post = DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),
	isFeatured: DS.attr('boolean')
});
