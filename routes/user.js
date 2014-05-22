/*
 * GET userlist page.
 */

exports.userlist = function(client) {
	return function (req, res) {
		var query = client.query("SELECT * FROM users", function (err, result) {
			if (err) {
				res.send({msg : err});
			} else {
				res.json(result.rows);
			}
		});
	};
};

/*
 * POST to adduser.
 */

exports.adduser = function(client) {
	return function (req, res) {
		client.query("INSERT INTO users(username, email) values('" + req.body.username + "', '" + req.body.email + "')", function (err, result) {
			res.send({ msg : (err) ? err : '' });
		});
	};
};

/*
 * DELETE to deleteuser.
 */

exports.deleteuser = function(client) {
	return function (req, res) {
		client.query("DELETE FROM users WHERE _id = " + req.params.id, function (err, result) {
			res.send({ msg : (err) ? err : '' });
		});
	};
};