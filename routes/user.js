/*
 * GET userlist page.
 */

exports.userlist = function(db) {
	return function(req, res) {
		db.collection('userlist').find().toArray(function (err, items) {
		res.json(items);
		});
	};
};