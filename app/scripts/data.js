// Define our data.
// This could also be delivered from an external server/api or from a .json file somewhere
App.Page.FIXTURES = [
	{
		id: 1,
		title: "Index",
		body: 'This is our homepage.'
	},
	{
		id: 2,
		title: "About",
		body: 'Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text\n\nLots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of\n\ntext Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text Lots of text.'
	}
];

App.Post.FIXTURES = [
	{
		id: 1,
		title: "One post",
		body: "One post"
	},
	{
		id: 2,
		title: "Another post",
		body: "This is written in markdown.\n\n##Hello\n\nhello",
		isFeatured: true
	}
];
