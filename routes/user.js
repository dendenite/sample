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

/*
 * POST to adduser.
 */

exports.adduser = function(db) {
	return function(req, res) {
		db.collection('userlist').insert(req.body, function(err, result) {
			res.send(
				(err === null) ? {
					msg : ''
				} : {
					msg : err
				}
			);
		});
	};
};

/*
 * DELETE to deleteuser.
 */

exports.deleteuser = function(db) {
	return function(req, res) {
		db.collection('userlist').removeById(req.params.id, function(err, result) {
			res.send(
				(result === 1) ? {
					msg : ''
				} : {
					msg :'error: ' + err
				}
			);
		});
	};
};