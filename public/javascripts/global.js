// Userlist data array for filling in info box
var userListData = [];
// DOM Ready =============================================================
document.addEventListener('DOMContentLoaded', function () {
	// Populate the user table on initial page load
	populateTable();
});
// Functions =============================================================
// Fill table with data
function populateTable() {
	// Empty content string
	var tableContent = '';
	// jQuery AJAX call for JSON
	$.getJSON( '/userlist', function (data) {
		// Stick our user data array into a userlist variable in the global object
	    userListData = data;
		// For each item in our JSON, add a table row and cells to the content string
		for (var i = 0, j = data.length; i < j; i++) {
			tableContent += '<tr>';
			tableContent += '<td>' + data[i].username + '</td>';
			tableContent += '<td>' + data[i].email + '</td>';
			tableContent += '<td><a class="linkdeleteuser" onclick="deleteUser(\'' + data[i]._id + '\')">delete</a></td>';
			tableContent += '</tr>';
		}
		// Inject the whole content string into our existing HTML table
		document.querySelector('#userList table tbody').innerHTML = tableContent;
	});
}

// Add User
function addUser() {
	// Super basic validation - increase errorCount variable if any fields are blank
	var errorCount = 0;
	var inputs = document.querySelectorAll("#addUser input");
	for (var i = 0, j = inputs.length; i < j; i++) {
		if (inputs[i].value === '') {
			errorCount++;
		}
	}
	// Check and make sure errorCount's still at zero
	if(errorCount === 0) {
		// If it is, compile all user info into one object
		var newUser = {
			'username' : document.getElementById('inputUserName').value,
			'email' : document.getElementById('inputUserEmail').value
		};
		// Use AJAX to post the object to our adduser service
		$.ajax({
			type : 'POST',
			data : newUser,
			url : '/adduser',
			dataType : 'JSON'
		}).done(function (response) {
			// Check for successful (blank) response
			if (response.msg === '') {
				// Clear the form inputs
				for (var i = 0, j = inputs.length; i < j; i++) {
					inputs[i].value = '';
				}
				// Update the table
				populateTable();
			}
			else {
				// If something goes wrong, alert the error message that our service returned
				alert('Error: ' + response);
			}
		});
	} else {
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
	}
	return false;
}

// Delete User
function deleteUser(id) {
	// Pop up a confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this user?');
	// Check and make sure the user confirmed
	if (confirmation === true) {
		// If they did, do our delete
		$.ajax({
			type : 'DELETE',
			url : '/deleteuser/' + id
		}).done(function (response) {
			// Check for a successful (blank) response
			if (response.msg === '') {

			} else {
				alert('Error: ' + response.msg);
			}
			// Update the table
			populateTable();
		});
	}
	return false;
}